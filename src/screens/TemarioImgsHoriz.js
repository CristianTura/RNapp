import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert, AppState, ImageBackground, Pressable, ScrollView, StyleSheet,
  Text, TouchableOpacity, useWindowDimensions, View
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleIcons from 'react-native-vector-icons/SimpleLineIcons';
import { getCuestionario } from '../../api/api';
import dataAmbientes from '../../data/dataAmbientes';
import { useAudio } from '../../utils/AudioContext';
import SafeAreaWrapper from '../components/SafeAreaWrapper';

export default function Temario(props) {
  const { setForegroundVolume, isMuted, toggleMute } = useAudio();
  const [tamaño, setTamaño] = useState(0)
  const [cuestionario, setCuestionario] = useState([])
  const [imgIndex, setImgIndex] = useState(0);
  
  const falsoArray = new Array(props.frases.length).fill(false);
  const valorInicial = falsoArray.slice();
  valorInicial.splice(0, 1, true);
  const [frasesSeleccionadas, setFrasesSeleccionadas] = useState(valorInicial);
  const [frasesSeleccion, setFrasesSeleccion] = useState(new Array());


// console.log(props, imgIndex)
  const refScrollView = useRef(null);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const { width } = useWindowDimensions();

  useEffect(() => {
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

  useEffect(() => {
    if (isMuted || appState.current.match(/inactive|background/)){
      setForegroundVolume(0.0);
    } else {
      setForegroundVolume(0.1);
    }
    let auxFrasesSeleccion = frasesSeleccion.slice()
    let index = auxFrasesSeleccion.indexOf(props.frases[0])
    if (index == -1) {
      auxFrasesSeleccion.push(props.frases[0])
      setFrasesSeleccion(auxFrasesSeleccion)
    }
    getCuestionarios();
    props.navigation.addListener('focus', () => {
      AsyncStorage.setItem(
        'respuestas',
        JSON.stringify({
          id_ambiente: props.ambiente,
          paso: props.paso,
          preguntasContestadas: [],
        }),
      );
    });
  }, [props]);

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

  let getCuestionarios = () => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected == true) {
        AsyncStorage.getItem('token').then((token) => {
          getCuestionario(token, props.ambiente, props.paso).then(
            (response) => {
              if (response == 'error de conexion') {
                conexion();
              } else {
                setCuestionario(response)
                setTamaño(response.length)
              }
            },
          );
        });
      } else {
        conexion();
      }
    });
  };

  const htmlSource = useMemo(
    () => ({ html: props.contenido.length > 0 ? props.contenido : '<p></p>' }),
    [props.contenido]
  );

  const tagsStyles = useMemo(
    () => ({
      p: {
        fontSize: wp('4%'),
        textAlign:'justify',
        marginRight:wp('4%'),
      },
      span: {
        fontSize: wp('4%'),
        textAlign:'justify',
        marginRight:wp('4%'),
      },
    }),
    []
  );

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
        <View style={styles.bloqueNum}>
          <View style={styles.num}>
            <Text
              style={{
                fontFamily: 'Roboto-Bold',
                fontSize: wp('6%'),
                color: '#f5f5f0',
              }}>
              {props.paso}
            </Text>
          </View>
          <TouchableOpacity
              onPress={() => {
                toggleMute(!isMuted);
                if (isMuted) {
                  setForegroundVolume(0.1);
                } else {
                  setForegroundVolume(0.0);
                }
              }}
              activeOpacity={0.3}
              style={{
                backgroundColor: '#fa4616',
                // padding: 3,
                padding: wp('3%'),
                marginTop:wp('5%'),
                borderWidth: 2,
                borderColor: '#f5f5f0',
                borderRadius: wp('10%'),
                justifyContent: 'center',
                alignContent: 'center',
                elevation: 7,
                zIndex: 7,
                shadowColor: '#d6d6d6d',
                shadowOpacity: 0.3,
                shadowColor: 'black',
                marginHorizontal: wp('2%'),
              }}>
              <SimpleIcons
                name={isMuted ? 'volume-2' : 'volume-off'}
                size={wp('4.5%')}
                color="#f5f5f0"
              />
            </TouchableOpacity>
        </View>

        <View style={styles.bloqueIzq}>
        {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}> */}
            <Text style={styles.titulo}>{props.titulo}</Text>
            
          {/* </View> */}
          {/* <View style={{maxHeight: wp('15%')}}>
            <ScrollView persistentScrollbar={true}>
              
            </ScrollView>
          </View> */}

          <ScrollView
            ref={refScrollView}
            persistentScrollbar={true}
            style={{width: '95%'}}>
              
            <RenderHtml
              contentWidth={width}
              source={htmlSource}
              tagsStyles={tagsStyles}
            />
            <View style={styles.horizontalLine} />
            {props.frases.map((frase, index) => {
              return (
                <Pressable
                  key={index}
                  style={({ pressed }) => [
                    {
                      borderRadius: wp('2%'),
                      backgroundColor: frasesSeleccionadas[index]
                        ? '#f5f5f0'
                        : 'transparent',
                      marginHorizontal: wp('2%'),
                      marginVertical: hp('1%'),
                    },
                  ]}
                  children={({ pressed }) => {
                    return (
                      <View
                        style={{
                          flexDirection: 'row',
                          paddingVertical: hp('0.5%'),
                          paddingHorizontal: wp('2.5%'),
                        }}>
                        <Text style={{ color: '#00983a', fontSize: wp('3%') }}>
                          {'\u2B24'}{' '}
                        </Text>

                        <Text
                          style={{
                            color: frasesSeleccionadas[index]
                              ? '#20397e'
                              : '#6d6d6d',
                            fontFamily: 'Roboto-Regular',
                            fontSize: wp('4%'),
                            paddingHorizontal: wp('2%'),
                            textAlign:'justify',
                            marginRight:wp('4%')
                          }}>
                          {frase}
                        </Text>
                      </View>
                    );
                  }}
                  onPress={() => {
                    // let auxFrasesSeleccion = frasesSeleccion.slice()
                    // let index = auxFrasesSeleccion.indexOf(props.frases[0])
                    // if(index == -1){
                    //   auxFrasesSeleccion.push(props.frases[0])
                    //   setFrasesSeleccion(auxFrasesSeleccion)
                    // }

                    const aux = frasesSeleccionadas.slice();
                    aux.splice(index, 1, true);
                    setImgIndex(index);
                    setFrasesSeleccionadas(aux);
                    let auxFrasesSeleccion = frasesSeleccion.slice()
                    let index2 = auxFrasesSeleccion.indexOf(frase)
                    if (index2 == -1) {
                      auxFrasesSeleccion.push(frase)
                      setFrasesSeleccion(auxFrasesSeleccion)                    
                    }

                  }}></Pressable>
              );
            })}
          </ScrollView>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              onPress={() => {
                setFrasesSeleccion(new Array())             
                setTimeout(
                  () => {
                    if(refScrollView.current){
                      refScrollView.current.scrollTo({x: 0, y: 0, animated: false})
                    }
                  },
                  100,
                );

                if (props.contadorItems <= 0) {
                  setForegroundVolume(0.0);
                  props.navigation.push(
                    dataAmbientes[parseInt(props.ambiente) - 1].screenAmbiente,
                  ); //GENERALIZAR PARA TODOS LOS AMBIENTES
                  setFrasesSeleccionadas(valorInicial);
                  setImgIndex(0);
                } else {
                  props.setContadorItems(props.contadorItems - 1);
                  setFrasesSeleccionadas(valorInicial);
                  setImgIndex(0);
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
              disabled={
                props.contadorItems == props.temarioLength - 1 ? true : false
              }
              onPress={() => {
                setTimeout(
                  () => {
                    if(refScrollView.current){
                      refScrollView.current.scrollTo({x: 0, y: 0, animated: false})
                    }
                  },
                  100,
                );
                //if (frasesSeleccion.length == props.frases.length) {
                  refScrollView.current.scrollTo({ x: 0, y: 0 });
                  props.setContadorItems(props.contadorItems + 1);
                  setFrasesSeleccionadas(valorInicial);
                  setImgIndex(0);
                  setFrasesSeleccion(new Array())
                  
                /* }
                else {
                  return(
                    Alert.alert(
                      'Revisa todo el contenido',
                      'Revisa el contenido de todos los botones para continuar.',
                      [
                        {
                          text: 'Cerrar',
                          style: 'cancel',
                        },
                      ],
                    )
                  );
                } */
              
              }}>
              <LinearGradient
                colors={['#1ad17c', '#19ce79', '#099941']}
                /* colors={
                  frasesSeleccion.length == props.frases.length ?
                    ['#1ad17c', '#19ce79', '#099941'] :
                    ['#979797', '#979797', '#979797']

                } */
                start={{ x: 0.3, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                locations={[0, 0.7, 1]}
                style={[
                  styles.regresarButton,
                  {
                    opacity:
                      props.contadorItems == props.temarioLength - 1 ? 0 : 1,
                  },
                ]}>
                <Text style={styles.regresarText}>
                  Continuar{' '}
                  <AntDesign name="right" size={wp('3%')} color="#f5f5f0" />{' '}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bloqueDer}>
          <View
            style={{
              width: '85%',
              height: '60%',
              // alignItems: 'center',
              borderRadius: wp('5%'),
              overflow: 'hidden',
            }}>
            {/* <Image
              style={{flex: 1, resizeMode: 'contain'}}
              source={{uri: props.imagenes[imgIndex]}}
            /> */}
            <Image
              style={{flex: 1, borderRadius: wp('5%')}}
              source={{
                uri: props.imagenes[imgIndex],
              }}
              contentFit="contain"
            />
          </View>

          {props.contadorItems == props.temarioLength - 1 ?
            (
              <TouchableOpacity
                onPress={() => {
                    setForegroundVolume(0.0);
                    setFrasesSeleccionadas(valorInicial);
                    setImgIndex(0);
                    props.setContadorItems(0);
                    props.navigation.navigate('Cuestionario', {
                      cuestionario: [
                        cuestionario,
                        tamaño,
                        props.paso,
                        props.ambiente,
                      ],
                    });
                }}
              >
                <LinearGradient
                  style={styles.button}
                  colors={['#1ad17c', '#099941']}
                  end={{ x: 0.5, y: 0.3 }}>
                  <Text style={styles.buttonText}>Realizar Test</Text>
                </LinearGradient>
              </TouchableOpacity>
            ) : null}
        </View>
      </View>
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
    // marginHorizontal: wp('1%'),
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

  bloqueNum: {
    // width: wp('15%'),
    // width: '10%',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  num: {
    backgroundColor: '#fa4616',
    borderRadius: 300,
    alignItems: 'center',
    paddingHorizontal: wp('2.3%'),
    marginTop: hp('0.8%'),
  },

  bloqueIzq: {
    // width: '50%',
    flex: 4,
  },

  bloqueDer: {
    // width: wp('50%'),.
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },

  regresarButton: {
    borderRadius: 25,
    // padding: 5,
    padding: wp('1.5%'),
    marginTop: hp('1.5%'),
    alignSelf: 'flex-start',
  },

  regresarText: {
    // marginHorizontal: 5,
    marginHorizontal: wp('2%'),
    color: '#f5f5f0',
    fontFamily: 'Roboto-Regular',
    fontSize: wp('3.5%'),
  },

  button: {
    // padding: 10,
    padding: wp('3%'),
    borderRadius: 50,
    // marginHorizontal: 10,
    marginHorizontal: wp('1%'),
    // marginVertical: 10,
    marginVertical: hp('3%'),
    alignItems: 'center',
  },

  buttonText: {
    // fontSize: 18,
    fontSize: wp('5%'),
    fontFamily: 'Roboto-Regular',
    color: '#f5f5f0',
    // marginHorizontal: 10,
    marginHorizontal: wp('5%'),
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

  horizontalLine: {
    backgroundColor: '#bac5b9',
    height: hp('0.2%'),
    width: '95%',
    marginVertical: hp('1%'),
  },
  texto: {
    fontFamily: 'Roboto-Bold',
    // lineHeight: hp('5%'),
    color: '#6d6d6d',
    fontSize: wp('3.5%'),
    marginBottom:hp('1%')
  },
});
