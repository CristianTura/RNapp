import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  AppState,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import SimpleIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useAudio } from '../../utils/AudioContext';
import BannerPreguntas from '../components/BannerPreguntas';
import CustomAvatar from '../components/CustomAvatar';
import SafeAreaWrapper from '../components/SafeAreaWrapper';


// const arrayRespuestasLocales = new Array();

export default function PreguntaUnica(props) {
  const abc = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z'];
  const [arrayRespuestasLocales, setArrayRespuestasLocales] = useState([]); 
  const [arrayRespuestasGlobales, setArrayRespuestasGlobales] = useState({});
  const { width } = useWindowDimensions();

  const {
    orden,
    pregunta,
    setPregunta,
    tamaño,
    contenido,
    opciones,
    idPregunta,
    idAmbiente,
    nombreAmbiente,
  } = props;

  const { 
    isMuted, 
    loadForegroundSound, 
    playForegroundSound, 
    stopForegroundSound, 
    setForegroundVolume,
    toggleMute
  } = useAudio();


  const [opcion, setOpcion] = useState(null);
  const contador = 0;
  let textoBoton = 'Siguiente pregunta';
  // const preguntas = new Array(opciones);
  const [preguntas, setPreguntas] = useState([]);

  if (pregunta == tamaño - 1) {
    textoBoton = 'Verificar Respuestas';
  }

  const respuesta = {
    id_pregunta: idPregunta,
    opciones: arrayRespuestasLocales,
    orden: orden,
  };
// console.log('PreguntaUnica', respuesta, opciones, pregunta, tamaño)
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    setPreguntas(opciones);
  }, [opciones])

  React.useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
      } else {
        console.log('App is inactive')
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      if(subscription) subscription.remove();
    };
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
      } else {
        console.log('App is inactive')
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      if(subscription) subscription.remove();
    };
  }, []);

  useEffect(() => {
    // Configurar sonido de primer plano
    // const setupForegroundSound = async () => {
    //   try {
    //     await loadForegroundSound(require('../../assets/audio/click.mp3'), false);
    //   } catch (error) {
    //     console.log('Error loading foreground sound:', error);
    //   }
    // };

    // setupForegroundSound();

    // Cleanup function
    return () => {
      stopForegroundSound();
    };
  }, []);

  let seleccionarRespuesta = (item, index) => {
    let idRespuesta = {
      id: item.id,
    };
    let indice = arrayRespuestasLocales.indexOf(idRespuesta);
    // console.log('arrayRespuestasLocales', arrayRespuestasLocales, 'idRespuesta', idRespuesta, 'indice', indice)
    if (indice == -1 && arrayRespuestasLocales.length == 0) {
      setArrayRespuestasLocales([...arrayRespuestasLocales, idRespuesta]);
      setOpcion(index);
    } else if (indice == -1 && arrayRespuestasLocales.length == 1) {
      setArrayRespuestasLocales([idRespuesta]);
      setOpcion(index);
    } else {
      setArrayRespuestasLocales(arrayRespuestasLocales.splice(indice, 1));
      setOpcion(index);
    }
  };

  let continuar = () => {
    console.log('continuar', respuesta)
    if (respuesta.opciones.length > 0) {
      AsyncStorage.getItem('respuestas').then((respuestaStorage) => {
        // return
        const arrayRespuestasGlobalesTemp = JSON.parse(respuestaStorage);
        arrayRespuestasGlobalesTemp.preguntasContestadas.push(respuesta);
        setArrayRespuestasGlobales(arrayRespuestasGlobalesTemp);
        AsyncStorage.setItem(
          'respuestas',
          JSON.stringify(arrayRespuestasGlobalesTemp),
        );
        continuarPregunta();
      });
    } else {
      Alert.alert(
        'Error de validación',
        'Por favor selecciona una respuesta para poder continuar',
        [
          {
            text: 'Cerrar',
            // onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ],  
      );
    }
  };

  let continuarPregunta = () => {
    console.log('continuarPregunta', pregunta, 'tamaño', tamaño)
    if (pregunta < tamaño) {
      let contador = pregunta + 1;
      setArrayRespuestasLocales([]);
      setPregunta(contador);
    } else {
      setArrayRespuestasLocales([]);
      console.log('continuarPregunta', pregunta, 'tamaño', tamaño)
      setPregunta(5000);
    }
  };

  useEffect(() => {
    setArrayRespuestasLocales([]);
  }, [props]);

  const htmlSource = useMemo(
    () => ({ html: contenido }),
    [contenido]
  );

  const tagsStyles = useMemo(
    () => ({
      p: styles.pregunta,
      span: styles.pregunta,
      h1: styles.pregunta,
      h2: styles.pregunta,
      h3: styles.pregunta,
      h4: styles.pregunta,
      h5: styles.pregunta,
      h6: styles.pregunta,
      '': styles.pregunta,
    }),
    []
  );

  useEffect(() => {
    // Lock to portrait orientation
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    
    // Cleanup function to restore default orientation when component unmounts
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
    <SafeAreaWrapper backgroundColor="#ffffff">
      <View style={styles.container}>
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
                  toggleMute();
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
                Seleccione la respuesta correcta.
              </Text>
            </View>

            <ScrollView
              style={styles.recuadroPregunta}
              persistentScrollbar={true}>
              <View style={{padding: wp('3%')}}>
                <RenderHtml
                  contentWidth={width}
                  style={styles.pregunta}
                  containerStyle={styles.pregunta}
                  source={htmlSource}
                  tagsStyles={tagsStyles}
                />
                {/* style={styles.pregunta} */}
                {/* <Text style={styles.pregunta}>{contenido}</Text> */}
                {preguntas?.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: hp('1.5%'),
                      }}>
                      <CustomAvatar
                        size={wp('6%')}
                        title={abc[index]}
                        titleStyle={{
                          color: opcion == index ? '#f5f5f0' : '#00983a',
                          fontSize: wp('4%'),
                        }}
                        rounded
                        overlayContainerStyle={{
                          backgroundColor: opcion == index ? '#00983a' : '#fff',
                        }}
                        onPress={() => {
                          seleccionarRespuesta(item, index);
                        }}
                        borderColor={'transparent'}
                        borderWidth={0}
                      />
                      <TouchableOpacity
                        onPress={() => {
                          seleccionarRespuesta(item, index);
                        }}>
                        <Text style={styles.opcion}>{item.cuerpo}</Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>

          <View style={{width: '30%'}}>
            <View
              style={{width: wp('41%'), height: wp('62%'), marginTop: hp('6%')}}>
               
              <ImageBackground
                style={{flex: 1, resizeMode: 'center'}}
                source={require('../../assets/tobias-preguntas.png')}
              />
              <LinearGradient
                style={styles.button}
                colors={['#20397e', '#030b4b']}
                start={{x: 0.5, y: 0.3}}>
                <TouchableOpacity onPress={() => continuar()}>
                  <Text style={styles.buttonText}>Continuar</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </View>
      </View>
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
  },

  button: {
    borderRadius: 10,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: wp('3.5%'),
    fontFamily: 'Roboto-Regular',
    paddingVertical: hp('1.5%'),
  },

  recuadroPregunta: {
    backgroundColor: '#f5f5f0',
    borderRadius: 15,
    marginLeft: wp('6%'),
    marginRight: wp('1.5%'),
    marginBottom: wp('42%'),
    height: '50%'
  },

  pregunta: {
    fontFamily: 'Roboto-Bold',
    color: '#00983a',
    fontSize: wp('4%'),
    marginBottom: hp('1%'),
  },

  opcion: {
    fontFamily: 'Roboto-Regular',
    color: '#6d6d6d',
    fontSize: wp('3.5%'),
    marginLeft: wp('2%'),
    paddingHorizontal:wp('4%'),
  },
});
