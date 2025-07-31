import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert, AppState, ImageBackground,
  Modal,
  Pressable, ScrollView, StyleSheet,
  Text, TouchableOpacity, View
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getCuestionario, getTemarioById } from '../../api/api';
import dataAmbientes from '../../data/dataAmbientes';
import { useAudio } from '../../utils/AudioContext';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import PopUps from './PopUps';

export default function TemarioBloque(props) {
  const [seleccionado, setSeleccionado] = useState(props.seleccionado);
  const [seleccionadoEtiquetas, setSeleccionadoEtiquetas] = useState([]);
  const [indexBloque, setIndexBloque] = useState(null);
  const [imgPath, setImgPath] = useState('');
  const [popupArray, setPopupArray] = useState([]);
  const [popupId, setPopupId] = useState('');
  const [tokenAsync, setTokenAsync] = useState(null);
  const [tamaño, setTamaño] = useState(0)
  const [cuestionario, setCuestionario] = useState([])
  const [contadorEtiquetas, setContadorEtiquetas] = useState(0)
  const [etiquetas, setEtiquetas] = useState(0)
  const [bloquesSeleccionados, setBloquesSeleccionados] = useState(new Array())
  const [etiquetasSeleccionadas, setEtiquetasSeleccionadas] = useState(new Array())
  const [secciones, setSecciones] = useState(props.secciones)
  const [marcarEtiqueta, setMarcarEtiqueta] = useState(new Array())
  const refScrollView = useRef(null);
  const [marcarSecciones, setMarcarSecciones] = useState(new Array(props.portadas.length).fill(false));
  const [idMarcados, setIdMarcados] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [popSelected, setPopSelected] = useState({})
  const { setForegroundVolume, isMuted, toggleMute } = useAudio();

  const appState = React.useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = React.useState(appState.current);

  React.useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
        setForegroundVolume(0.1);
      } else {
        console.log('App is inactive')
        setForegroundVolume(0);
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      // console.log("AppState", appState.current);
    });

    return () => {
      if(subscription) subscription.remove();
    };
  }, []);

  React.useEffect(() => {
    AsyncStorage.getItem('token').then((token) => {
   
      setIndexBloque(props.index)
      setTokenAsync(token);
      NetInfo.fetch().then((state) => {
        if (state.isConnected == true) {
          getTemarioById(token, props.bloqueId).then((response) => {
            setImgPath(response.imagen);
            setPopupArray(response.opciones);
            let auxMarcarEtiquetas = new Array(response.opciones.length).fill(false)
            for (let i = 0; i < response.opciones.length; i++) {
              for (let j = 0; j < etiquetasSeleccionadas.length; j++) {
                if (response.opciones[i].id == etiquetasSeleccionadas[j]) {
                  auxMarcarEtiquetas.splice(i, 1, true)            
                }
              }
            }
            setMarcarEtiqueta(auxMarcarEtiquetas)

            let auxBloquesSeleccionados = bloquesSeleccionados.slice()
            let index = auxBloquesSeleccionados.indexOf(response.contenido)
            if (index == -1) {
              auxBloquesSeleccionados.push(response.contenido)
              setBloquesSeleccionados(auxBloquesSeleccionados)
              let auxContadorEtiquetas = contadorEtiquetas + response.opciones.length
              setContadorEtiquetas(auxContadorEtiquetas)
            }
          });
          getCuestionarios(token);
        } else {
          conexion();
        }
      });
    });
  }, [props]);

  React.useEffect(() => {
  }, [seleccionado]);

  const temarioPorId = (index) => {
    // let auxMarcarSecciones = marcarSecciones.slice()
    // auxMarcarSecciones.splice(index,1, true)
    // setMarcarSecciones(auxMarcarSecciones)

    NetInfo.fetch().then((state) => {
      if (state.isConnected == true) {
        getTemarioById(tokenAsync, props.portadas[index].temario).then(
          (response) => {
            setImgPath(response.imagen);
            setPopupArray(response.opciones);
            let auxMarcarEtiquetas = new Array(response.opciones.length).fill(false)
            for (let i = 0; i < response.opciones.length; i++) {        
              for (let j = 0; j < etiquetasSeleccionadas.length; j++) {
                if (response.opciones[i].id == etiquetasSeleccionadas[j]) {                 
                  auxMarcarEtiquetas.splice(i, 1, true)                
                }
              }
            }        
            setMarcarEtiqueta(auxMarcarEtiquetas)
            let auxBloquesSeleccionados = bloquesSeleccionados.slice()
            let index = auxBloquesSeleccionados.indexOf(response.contenido)
            if (index == -1) {
              auxBloquesSeleccionados.push(response.contenido)
              setBloquesSeleccionados(auxBloquesSeleccionados)
              let auxContadorEtiquetas = contadorEtiquetas + response.opciones.length
              setContadorEtiquetas(auxContadorEtiquetas)
            }   
          },
        );
      } else {
        conexion();
      }
    });
  };

  let getCuestionarios = (token) => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected == true) {
        // AsyncStorage.getItem('token').then((token) => {
        getCuestionario(token, props.ambiente, props.paso).then((response) => {
          if (response == 'error de conexion') {
            conexion();
          } else {
            setCuestionario(response)
            setTamaño(response.length)
          }
        });
        // });
      } else {
        conexion();
      }
    });
  };

  let conexion = () => {
    Alert.alert(
      'Error de conexión',
      'No tienes conexión a internet. Puede que algunas opciones no se carguen correctamente. Intenta más tarde.',
      [
        {
          text: 'Cerrar',
          style: 'cancel',
        },
      ],
    );
  };

  useEffect(() => {
    // Lock to landscape orientation
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    
    // Cleanup function to restore default orientation when component unmounts
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
    <SafeAreaWrapper backgroundColor="#ffffff">
      <ImageBackground
        style={styles.background}
        source={require('../../assets/fondo-modal-agricultores-azul.png')}>
        <View style={styles.modal}>
          <View style={styles.contenedorNumero}>
            <View style={styles.numero}>
              <Text
                style={{
                  fontFamily: 'Roboto-Bold',
                  fontSize: wp('6%'),
                  color: '#f5f5f0',
                }}>
                {/* {props.paso} */}
                {props.paso}
              </Text>
            </View>

          </View>
          <Text style={styles.textoAdvertencia}>Mira todas las etiquetas de todas las secciones para poder continuar. DESPLÁZATE HACIA ABAJO para ver toda la etiqueta. </Text>
          <View style={styles.bloqueContenido}>
            <Text style={styles.titulo}>{props.titulo}</Text>

            <ScrollView
              ref={refScrollView}
              style={{ width: hp('70%'), height: hp('30%') }}
              persistentScrollbar={true}>
              <View style={{ width: hp('70%'), height: hp('100%') }}>
                {popupArray.map((item, index, array) => {

                  return (
                    <Pressable
                      key={index}
                      style={                
                        [
                          styles.etiqueta,
                          {
                            // backgroundColor: pressed ? '#00983a' : '#fff',
                            backgroundColor: marcarEtiqueta[index] ? '#00983a' : '#fff',
                            top: `${item.top}%`,
                            left: `${item.left}%`,
                          },
                        ]
                      }

                      onPress={() => {

                        let auxEtiquetasSelecionadas = etiquetasSeleccionadas.slice()
                        let auxMarcarEtiqueta = marcarEtiqueta.slice()
                        for (let i = 0; i < popupArray.length; i++) {

                          if (item.id == popupArray[i].id) {
                            auxMarcarEtiqueta.splice(i, 1, true)
                            setMarcarEtiqueta(auxMarcarEtiqueta)

                          }

                        }
                        let auxIdMarcados = idMarcados.slice()
                        let indexaux = auxIdMarcados.indexOf(item.id)
                        if (indexaux == -1) {
                          auxIdMarcados.push(item.id)
                          setIdMarcados(auxIdMarcados)
                          let contador = 1
                          for (let i = 0; i < popupArray.length; i++) {

                            for (let j = 0; j < idMarcados.length; j++) {
                              if (popupArray[i].id == idMarcados[j]) {
                                contador = contador + 1
                                if (contador == popupArray.length) {                              
                                  let auxMarcarSecciones = marcarSecciones.slice()
                                  auxMarcarSecciones.splice(indexBloque, 1, true)
                                  setMarcarSecciones(auxMarcarSecciones)
                                }
                              }

                            }

                          }

                        }




                        let index = auxEtiquetasSelecionadas.indexOf(item.id)
                        if (index == -1) {
                          auxEtiquetasSelecionadas.push(item.id)
                          setEtiquetasSeleccionadas(auxEtiquetasSelecionadas)
                        }
                        setEtiquetasSeleccionadas(auxEtiquetasSelecionadas)
                        // props.navigation.navigate('Popups', {
                        //   popupId: item.temario,
                        //   numeroPopup: item.cuerpo,
                        // })
                        setModalVisible(true)
                        setPopSelected({
                          popupId: item.temario,
                          numeroPopup: item.cuerpo,
                        })
                      }
                      }



                    >
                      {/* {({ pressed }) => ( */}
                      <Text
                        style={{
                          // color: pressed ? '#fff' : '#20397e',
                          color: marcarEtiqueta[index] ? '#fff' : '#20397e',
                          fontSize: wp('5%'),
                          lineHeight: wp('5%'),
                        }}>
                        {item.cuerpo}
                      </Text>
                      {/* )} */}
                    </Pressable>
                  );
                })}

                {/* <Image
                  source={imgPath ? {uri: imgPath} : null}
                  style={{flex: 1, resizeMode: 'contain'}}></Image> */}
                <Image
                  source={imgPath ? { uri: imgPath } : null}
                  style={{ flex: 1 }}
                  contentFit="contain"
                />
              </View>
            </ScrollView>

            <View style={{ flexDirection: 'row' }}>
              <ScrollView
                horizontal={true}
                persistentScrollbar={true}
              // style={{ width: '70%' }}
              >
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  {props.portadas.map((item, index) => {

                    if (seleccionado.cuerpo != item.cuerpo) {
                      return (
                        <TouchableOpacity
                          style={{ marginTop: wp('1') }}
                          key={index}
                          onPress={() => {                     
                            setIndexBloque(index)
        
                            let auxSecciones = secciones.slice()
                            let index2 = secciones.indexOf(item.cuerpo)
                            if (index2 == -1) {
                              auxSecciones.push(item.cuerpo)
                              setSecciones(auxSecciones)
                            }
                            temarioPorId(index);
                            setSeleccionado(item);                         
                            if(refScrollView.current){
                              refScrollView.current.scrollTo({ y: 0, animated: false, }) 
                            }
                          }}>
                          {marcarSecciones[index] ?
                            <LinearGradient
                              style={styles.button}
                              colors={['#00983a', '#00983a']}
                              start={{ x: 0.5, y: 0.3 }}>
                              <Text style={styles.buttonText}>{item.cuerpo}</Text>
                            </LinearGradient> : <LinearGradient
                              style={styles.button}
                              colors={['#20397e', '#030b4b']}
                              start={{ x: 0.5, y: 0.3 }}>
                              <Text style={styles.buttonText}>{item.cuerpo}</Text>
                            </LinearGradient>}
                        </TouchableOpacity>
                      );
                    }
                  })}
                </View>
              </ScrollView>

              <View style={{ flexDirection: 'row', marginRight: wp('3%') }}>
                <TouchableOpacity
                  onPress={() => {
                    if (props.contadorItems <= 0) {
                      props.navigation.push(
                        dataAmbientes[parseInt(props.ambiente) - 1]
                          .screenAmbiente,
                      );
                    } else {
                      props.setContadorItems(props.contadorItems - 1);
                    }
                  }}>
                  <LinearGradient
                    colors={['#1ad17c', '#19ce79', '#099941']}
                    start={{ x: 0.3, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    locations={[0, 0.7, 1]}
                    style={[styles.regresarButton]}>
                    <Text style={styles.regresarText}>
                      <AntDesign name="left" size={wp('3%')} color="#f5f5f0" />{' '}
                      Regresar
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if(props.contadorItems == props.temarioLength - 1){
                      setForegroundVolume(0.0);
                      props.navigation.navigate('Cuestionario', {
                        cuestionario: [
                          cuestionario,
                          tamaño,
                          props.paso,
                          props.ambiente,
                        ],
                      })
                    }
                    else {
                      props.setContadorItems(props.contadorItems + 1);
                    }
                  }}
                >
                  <LinearGradient
                    colors={['#1ad17c', '#19ce79', '#099941']}
                    start={{ x: 0.3, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    locations={[0, 0.7, 1]}

                    style={[
                      styles.regresarButton

                    ]}>
                    <Text style={styles.regresarText}>
                      {props.contadorItems == props.temarioLength - 1
                        ? 'Realizar Test'
                        : 'Continuar'}
                      <AntDesign name="right" size={wp('3%')} color="#f5f5f0" />{' '}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <Modal
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
          animationType="fade" 
        >
          <PopUps props={{...props, popupId: popSelected.popupId, numeroPopup: popSelected.numeroPopup, onClose: () => setModalVisible(false)}} />
        </Modal>
      </ImageBackground>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'flex-end',
  },
  modal: {
    height: '95%',
    width: '90%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomWidth: 0,
    borderColor: '#00983a',
    backgroundColor: '#fff',
    borderWidth: wp('1%'),
    elevation: 10,
    flexDirection: 'row',
    paddingVertical: wp('5%'),
  },
  contenedorNumero: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '10%',
  },
  numero: {
    backgroundColor: '#fa4616',
    borderRadius: 300,
    alignItems: 'center',
    paddingHorizontal: wp('2.3%'),
    marginTop: hp('0.8%'),
  },
  button: {
    padding: wp('2.5%'),
    borderRadius: 50,
    marginHorizontal: wp('2%'),
    marginVertical: hp('1.5%'),
    alignItems: 'center',
  },
  buttonGreen: {
    width: hp('25%'),
    padding: wp('3%'),
    borderRadius: 50,
    marginHorizontal: wp('2%'),
    marginVertical: hp('1.5%'),
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: wp('3%'),
    fontFamily: 'Roboto-Regular',
    color: '#f5f5f0',
    marginHorizontal: wp('5%'),
    alignSelf: 'center',
  },

  titulo: {
    fontFamily: 'Roboto-Bold',
    color: '#00983a',
    fontSize: wp('6%'),
    marginBottom: hp('2%'),
  },

  contenido: {
    fontFamily: 'Roboto-Regular',
    color: '#6d6d6d',
    fontSize: wp('5%'),
    lineHeight: hp('4%'),
  },

  bloqueContenido: {
    width: '90%',
  },

  horizontalLine: {
    backgroundColor: '#bac5b9',
    height: hp('0.2%'),
    width: '95%',
    marginVertical: hp('1%'),
  },
  containerBloque: {
    width: hp('25%'),
    height: wp('25%'),
    backgroundColor: 'blue',
    borderRadius: wp('5%'),
    alignItems: 'center',
    marginTop: wp('10%'),
    marginRight: hp('1%'),
  },
  containerImagen: {
    width: hp('10%'),
    height: hp('10%'),
    backgroundColor: 'white',
    position: 'absolute',
    top: wp('-10%'),
    borderRadius: wp('100%'),
    borderWidth: wp('0.5%'),
    borderColor: 'blue',
    elevation: 10,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    height: '100%',
    width: '100%',
  },
  image: {
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  etiqueta: {
    position: 'absolute',
    width: wp('7%'),
    height: wp('7%'),
    borderColor: '#00983a',
    borderWidth: 2,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    zIndex: 10,
  },
  regresarButton: {
    borderRadius: 25,
    // padding: 5,
    padding: wp('1.5%'),
    marginTop: hp('1.5%'),
    alignSelf: 'flex-start',
    marginHorizontal: wp('2%'),
  },

  regresarText: {
    // marginHorizontal: 5,
    marginHorizontal: wp('2%'),
    color: '#f5f5f0',
    fontFamily: 'Roboto-Regular',
    fontSize: wp('3.5%'),
  },
  textoAdvertencia: {
    fontSize: wp('3.5%'),
    position: 'absolute',
    width: hp('80%'),
    fontFamily: 'Roboto-Regular',
    left: hp('8%'),
    top: wp('4%')
  }
});
