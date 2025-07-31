import { LinearGradient } from 'expo-linear-gradient';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  AppState,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import BannerPreguntas from '../components/BannerPreguntas';
// import {CheckBox} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RenderHtml from 'react-native-render-html';
import SimpleIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useAudio } from '../../utils/AudioContext';
import CircularCheckbox from '../components/CircularCheckbox';
import SafeAreaWrapper from '../components/SafeAreaWrapper';

// this.arrayRespuestasLocales = new Array();
// this.arrayRespuestasGlobales = new Object();
// this.CheckBoxSeleccionados = 0;

export default function PreguntaVF(props) {
  const { setForegroundVolume, isMuted, toggleMute } = useAudio();
  
  const {
    orden,
    pregunta,
    setPregunta,
    tamaño,
    contenido,
    opciones,
    idPregunta,
    toggleCheckBox,
    idAmbiente,
    nombreAmbiente,
  } = props;
  const [pregunta1, setPregunta1] = React.useState(toggleCheckBox);
  const [arrayRespuestasLocales, setArrayRespuestasLocales] = useState([]); 
  const [arrayRespuestasGlobales, setArrayRespuestasGlobales] = useState({});
  const [checkBoxSeleccionados, setCheckBoxSeleccionados] = useState({});
  const [preguntas, setPreguntas] = useState([]);
  
  let contador = 0;
  const [arrayChecbox, setArrayChecbox] = useState([]);
  
  let textoBoton = 'Siguiente pregunta';
  // console.log('preguntas PreguntaVF')

  if (pregunta == tamaño - 1) {
    textoBoton = 'Verificar Respuestas';
  }

  const respuesta = {
    id_pregunta: idPregunta,
    opciones: arrayRespuestasLocales,
    orden: orden
  };

  const appState = React.useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = React.useState(appState.current);

  useEffect(() => {
    setPreguntas(opciones);
  }, [opciones])

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
    });

    return () => {
      if(subscription) subscription.remove();
    };
  }, []);

  useEffect(() => {
    if(global.whoosh2){
      if (isMuted || appState.current.match(/inactive|background/)){
        setForegroundVolume(0);
      } else {
        setForegroundVolume(0.1);
      }
}
    setArrayRespuestasLocales([]);
    setCheckBoxSeleccionados({});
  }, [props]);

  // let seleccionarRespuesta = (item, index, falsoverdadero) => {
  //   console.log('auxPregunta1', item, index, pregunta1)
  //   let auxPregunta1 = pregunta1.slice();
  //   if (falsoverdadero == true) {
  //     // if (auxPregunta1 && auxPregunta1[index]) {
  //       auxPregunta1[index].verdadero = true;
  //       auxPregunta1[index].falso = false;
  //     // }
  //     let indice = -1;
  //     for (var i = 0; i < arrayRespuestasLocales.length; i++) {
  //       if (arrayRespuestasLocales[i].id == item.id) {
  //         indice = i;
  //       }
  //     }

  //     if (indice == -1) {
  //       setCheckBoxSeleccionados(checkBoxSeleccionados + 1);
  //       setArrayRespuestasLocales([...arrayRespuestasLocales, {
  //         id: item.id,
  //         correcta: falsoverdadero,
  //       }]);
  //     } else {
  //       // this.arrayRespuestasLocales.splice(indice, 1);
  //       // this.arrayRespuestasLocales.push({
  //       //   id: item.id,
  //       //   correcta: falsoverdadero,
  //       // });

  //       const arrayRespuestasLocalesTemp = arrayRespuestasLocales.splice(indice, 1);
  //       setArrayRespuestasLocales([...arrayRespuestasLocalesTemp, {
  //         id: item.id,
  //         correcta: falsoverdadero,
  //       }]);

  //     }
  //   } else if (falsoverdadero == false) {
  //     if (auxPregunta1 && auxPregunta1[index]) {
  //       auxPregunta1[index].falso = true;
  //       auxPregunta1[index].verdadero = false;
  //     }
  //     let indice = -1;
  //     for (var i = 0; i < arrayRespuestasLocales.length; i++) {
  //       if (arrayRespuestasLocales[i].id == item.id) {
  //         indice = i;
  //       }
  //     }

  //     if (indice == -1) {
  //       setCheckBoxSeleccionados(checkBoxSeleccionados + 1);
  //       setArrayRespuestasLocales([...arrayRespuestasLocales, {
  //         id: item.id,
  //         correcta: falsoverdadero,
  //       }]);
  //     } else {
  //       const arrayRespuestasLocalesTemp = arrayRespuestasLocales.splice(indice, 1);
  //       setArrayRespuestasLocales([...arrayRespuestasLocalesTemp, {
  //         id: item.id,
  //         correcta: falsoverdadero,
  //       }]);
  //     }
  //   }
  //   // console.log('auxPregunta1', auxPregunta1)
  //   setPregunta1(auxPregunta1);
  // };

  let seleccionarRespuesta = (item, index, falsoverdadero) => {
    setArrayRespuestasLocales([...arrayRespuestasLocales, {id: item.id, correcta: falsoverdadero}]);
    setCheckBoxSeleccionados({...checkBoxSeleccionados, [item.id]: falsoverdadero === true ? 'V' : 'F'});
  }

  let continuar = () => {
    if (Object.keys(checkBoxSeleccionados).length >= preguntas.length) {
      AsyncStorage.getItem('respuestas').then((respuestaStorage) => {
        const arrayRespuestasGlobalesTemp = JSON.parse(respuestaStorage);
        arrayRespuestasGlobalesTemp.preguntasContestadas.push(respuesta);
        setArrayRespuestasGlobales(arrayRespuestasGlobalesTemp);
        AsyncStorage.setItem(
          'respuestas',
          JSON.stringify(arrayRespuestasGlobalesTemp),
        );
        continuarPregunta();
      });
    } else if (Object.keys(checkBoxSeleccionados).length != preguntas.length) {
      Alert.alert(
        'Error de validación',
        'Por favor responda todas las preguntas para poder continuar',
        [
          {
            text: 'Cerrar',
            style: 'cancel',
          },
        ],
      );
    }
  };

  let continuarPregunta = () => {
      if (pregunta < tamaño) {
        let contador = pregunta + 1;
        setPregunta(contador);
      } else {
        setPregunta(5000);
      }

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
    // <View style={styles.container}>
    <SafeAreaWrapper backgroundColor="#ffffff">
      <SafeAreaView>
        <BannerPreguntas
          ambiente={nombreAmbiente}
          idAmbiente={idAmbiente}
          navigation={props.navigation}
        />

        <View style={{flexDirection: 'row'}}>
          <View style={{width: '70%'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: hp('3%'),
              }}>
              <View style={styles.horizontalLine} />
            </View>

            <View style={[styles.subtitulo,{flexDirection:'row',justifyContent:'space-between'}]}>
              <Text style={styles.subtituloText}>Test</Text>
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
                  position:'absolute',
                  left:wp('110%')
                }}>
                <SimpleIcons
                  name={isMuted ? 'volume-2' : 'volume-off'}
                  size={wp('4.5%')}
                  color="#f5f5f0"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.subtitulo}>
              <Text style={styles.enunciado}>
                Marque verdadero (V) o falso (F) según corresponda.
              </Text>
            </View>
            <View style={styles.recuadroPregunta}>
              <ScrollView style={{flex: 1}} persistentScrollbar={true}>
                {/* TABLA */}
                <View style={{marginBottom: hp('5%')}}>
                  {/* PRIMERA FILA */}
                  <View style={{flexDirection: 'row'}}>
                    {/* COL 1 */}
                    <View
                      style={[
                        styles.col1,
                        {
                          borderTopLeftRadius: 15,
                          borderTopRightRadius: 15,
                          marginRight: wp('3%'),
                          borderBottomColor: 'transparent',
                        },
                      ]}>
                      <Text style={[styles.pregunta, {marginLeft: wp('3%')}]}>
                        Preguntas
                      </Text>
                    </View>
                    {/* COL 2 */}
                    <View
                      style={[
                        styles.col2,
                        {
                          borderTopLeftRadius: 10,
                          borderRightWidth: 0,
                          borderBottomWidth: 0,
                        },
                      ]}>
                      <Text style={styles.pregunta}>V</Text>
                    </View>
                    {/* COL 3 */}
                    <View
                      style={[
                        styles.col3,
                        {borderTopRightRadius: 10, borderBottomWidth: 0},
                      ]}>
                      <Text style={styles.pregunta}>F</Text>
                    </View>
                  </View>

                  {preguntas?.map((item, index) => {
                    return (
                      <View key={index} style={{flexDirection: 'row'}}>
                        {/* COL 1  */}
                        <View
                          style={[
                            styles.col1,
                            {
                              flexDirection: 'row',
                              marginRight: wp('3%'),
                              borderBottomWidth:
                                index == preguntas.length - 1 ? wp('0.5%') : 0,
                              borderBottomLeftRadius:
                                index == preguntas.length - 1 ? 15 : 0,
                              borderBottomRightRadius:
                                index == preguntas.length - 1 ? 15 : 0,
                            },
                          ]}>
                          <Text style={{color: '#00983a', fontSize: wp('3%')}}>
                            {'\u2B24'}{' '}
                          </Text>
                          {/* <Text style={styles.opcion}>{item.cuerpo}</Text> */}
                          <RenderHtml
                            contentWidth={wp('100%')}
                            source={{html: item.cuerpo}}
                            containerStyle={styles.opcion}
                            tagsStyles={{
                              p: styles.opcion,
                              span: styles.opcion,
                            }}
                          />
                        </View>
                        {/* COL 2 */}
                        {/* <TouchableOpacity> */}
                        <TouchableOpacity
                          onPress={() => seleccionarRespuesta(item, index, true)}
                          style={[
                            styles.col2,
                            {
                              borderRightWidth: 0,
                              borderBottomWidth:
                                index == preguntas.length - 1 ? wp('0.5%') : 0,
                              borderBottomLeftRadius:
                                index == preguntas.length - 1 ? 15 : 0,
                            },
                          ]}>
                          {/* <CheckBox
                            value={checkBoxSeleccionados?.[item.id] === 'V'}
                            onChange={() => seleccionarRespuesta(item, index, true)}
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: 8,
                              padding: 0,
                              margin: 0,
                              marginRight: 10,
                              borderColor: 'gray',
                            }}
                            tintColors={{ true: '#4CAF50', false: '#BDBDBD' }}
                            boxType='circle'
                          /> */}
                          <CircularCheckbox
                            checked={checkBoxSeleccionados?.[item.id] === 'V'}
                            onPress={() => seleccionarRespuesta(item, index, true)}
                          />
                          {/* <CheckBox
                            uncheckedIcon={
                              <MaterialIcon
                                name="circle-outline"
                                size={wp('4.5%')}
                                color="#00983a"
                              />
                            }
                            checkedIcon={
                              <MaterialIcon
                                name="circle-slice-8"
                                size={wp('4.5%')}
                                color="#00983a"
                              />
                            }
                            checked={pregunta1[index].verdadero}
                            onPress={() =>
                              seleccionarRespuesta(item, index, true)
                            }
                            containerStyle={{
                              margin: 0,
                              padding: 0,
                            }}
                          /> */}
                          {/* </View> */}
                        </TouchableOpacity>
                        {/* COL 3 */}
                        <TouchableOpacity
                          onPress={() => seleccionarRespuesta(item, index, false)}
                          style={[
                            styles.col3,
                            {
                              borderBottomWidth:
                                index == preguntas.length - 1 ? wp('0.5%') : 0,
                              borderBottomRightRadius:
                                index == preguntas.length - 1 ? 15 : 0,
                            },
                          ]}>
                            {/* <CheckBox
                              value={checkBoxSeleccionados?.[item.id] === 'F'}
                              onChange={() => seleccionarRespuesta(item, index, false)}
                              style={{
                                width: 24,
                                height: 24,
                                borderRadius: 8,
                                padding: 0,
                                margin: 0,
                                marginRight: 10,
                                borderColor: 'gray',
                              }}
                              tintColors={{ true: '#4CAF50', false: '#BDBDBD' }}
                              boxType='circle'
                            /> */}
                            <CircularCheckbox
                              checked={checkBoxSeleccionados?.[item.id] === 'F'}
                              onPress={() => seleccionarRespuesta(item, index, false)}
                            />
                          {/* <CheckBox
                            uncheckedIcon={
                              <MaterialIcon
                                name="circle-outline"
                                size={wp('4.5%')}
                                color="#00983a"
                              />
                            }
                            checkedIcon={
                              <MaterialIcon
                                name="circle-slice-8"
                                size={wp('4.5%')}
                                color="#00983a"
                              />
                            }
                            checked={pregunta1[index].falso}
                            onPress={() =>
                              seleccionarRespuesta(item, index, false)
                            }
                            containerStyle={{
                              margin: 0,
                              padding: 0,
                            }}
                          /> */}
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          </View>

          <View style={{width: '30%'}}>
            <View
              style={{width: wp('41%'), height: wp('62%'), marginTop: hp('4%')}}>
              <ImageBackground
                style={{flex: 1, resizeMode: 'center'}}
                source={require('../../assets/tobias-preguntas.png')}
              />
              <LinearGradient
                style={styles.button}
                colors={['#20397e', '#030b4b']}
                start={{x: 0.5, y: 0.3}}>
                <TouchableOpacity onPress={() => continuar()}>
                  <Text style={styles.buttonText}>{textoBoton}</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },

  horizontalLine: {
    flex: 1,
    height: hp('1%'),
    backgroundColor: '#20397e',
    marginLeft: wp('6%'),
    marginRight: '85%',
  },

  subtituloText: {
    fontFamily: 'Roboto-Light',
    fontSize: wp('6%'),
    color: '#00983a',
  },

  subtitulo: {
    marginLeft: wp('6%'),
    marginTop: hp('0.5%'),
  },

  enunciado: {
    fontFamily: 'Roboto-Regular',
    fontSize: wp('4.5%'),
    color: '#7c7d7d',
    marginBottom: hp('1%'),
  },

  button: {
    borderRadius: 10,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontFamily: 'Roboto-Regular',
    paddingVertical: hp('1.5%'),
  },

  recuadroPregunta: {
    backgroundColor: '#f5f5f0',
    borderRadius: 10,
    padding: wp('3%'),
    marginLeft: wp('6%'),
    marginRight: wp('1.5%'),
    marginBottom: hp('33%'),
    height: Platform.OS == 'android' ? '38%' : '38%',
    // height: '40%'
  },

  pregunta: {
    fontFamily: 'Roboto-Bold',
    color: '#00983a',
    fontSize: wp('4.5%'),
    // marginBottom: hp('1%'),
  },

  opcion: {
    fontFamily: 'Roboto-Regular',
    color: '#6d6d6d',
    fontSize: wp('4.5%'),
    marginHorizontal: wp('2%'),
  },

  recuadroIzq: {
    width: '75%',
    borderWidth: wp('0.5%'),
    borderColor: '#bac5b9',
    borderRadius: 15,
    marginRight: wp('2%'),
    padding: wp('2%'),
  },

  recuadroDer: {
    width: '20%',
    borderWidth: wp('0.5%'),
    borderColor: '#bac5b9',
    borderRadius: 15,
    // padding: wp('1%'),
    alignItems: 'center',
  },

  col1: {
    width: '70%',
    borderWidth: wp('0.5%'),
    borderColor: '#bac5b9',
    padding: wp('2%'),
  },

  col2: {
    width: '11%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: wp('0.5%'),
    borderColor: '#bac5b9',
  },

  col3: {
    width: '11%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: wp('0.5%'),
    borderColor: '#bac5b9',
  },
});
