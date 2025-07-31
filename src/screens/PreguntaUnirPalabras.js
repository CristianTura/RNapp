import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Alert,
  AppState,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import BannerPreguntas from '../components/BannerPreguntas';
import CustomAvatar from '../components/CustomAvatar';
// this.arrayRespuestasLocales = new Array();
// this.arrayRespuestasGlobales = Object;
import SimpleIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useAudio } from '../../utils/AudioContext';
import { PageContext } from '../../utils/PageContext';

export default function PreguntasUnirPalabras(props) {
  const { setForegroundVolume } = useAudio();
  
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
  const [seleccionPalabras1, setSeleccionPalabras1] = React.useState([]);
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [arrayRespuestasLocales, setArrayRespuestasLocales] = useState([]); 
  const [arrayRespuestasGlobales, setArrayRespuestasGlobales] = useState({});
  const [isMuted, toggleMute] = useContext(PageContext);
// console.log('preguntas PreguntasUnirPalabras')
  const scrollViewRef = useRef(null);
  let contador = 0;
  const [preguntas, setPreguntas] = useState([]);
  let textoBoton = 'Siguiente pregunta';
  if (pregunta == tamaño - 1) {
    textoBoton = 'Verificar Respuestas';
  }

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
    setArrayRespuestasLocales([]);
    setSeleccionPalabras1([])
  }, [props]);

  const respuesta = {
    id_pregunta: idPregunta,
    opciones: arrayRespuestasLocales,
    orden: orden
  };

  let seleccionarRespuesta = (item, index) => {
    if (!seleccionPalabras1.includes(item.cuerpo)) {
      const aux = seleccionPalabras1.slice();
      aux.push(item.cuerpo);
      setArrayRespuestasLocales([...arrayRespuestasLocales, {id: item.id}]);
      setSeleccionPalabras1(aux);
    } else {
      const aux = seleccionPalabras1.slice();
      const index = aux.indexOf(item.cuerpo);
      aux.splice(index, 1);

      let indice = -1;
      for (var i = 0; i < arrayRespuestasLocales.length; i++) {
        if (arrayRespuestasLocales[i].id == item.id) {
          indice = i;
        }
      }

      if (indice == -1) {
        setArrayRespuestasLocales([...arrayRespuestasLocales, {id: item.id}]);
      } else {
        setArrayRespuestasLocales(arrayRespuestasLocales.splice(indice, 1));
      }
      setSeleccionPalabras1(aux);
    }
  };

  let continuar = () => {
    if (respuesta.opciones.length > 0) {
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
    } else if (respuesta.opciones.length <= 0) {
      Alert.alert(
        'Error de validación',
        'Por favor selecciona una respuesta para poder continuar',
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
        setTimeout(
          () => {
            if (scrollViewRef.current) {
              scrollViewRef.current.scrollTo({x: 0, y: 0, animated: false});
            }
          },
          100,
        );
        contador = pregunta + 1;
        setArrayRespuestasLocales([]);
        setPregunta(contador);
      } else {
        setArrayRespuestasLocales([]);
        setPregunta(5000);
      } 
  };

  const palabras1 = opciones;
  const palabras2 = [
    'Palabra1',
    'Palabra2',
    'Palabra3',
    'Palabra4',
    'Palabra5',
  ];

  useEffect(() => {
    // Lock to landscape orientation
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    
    // Cleanup function to restore default orientation when component unmounts
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
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
                  setForegroundVolume(0);
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
                top:-wp('4%'),
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
            <Text style={styles.enunciado}>{props.contenido}</Text>
          </View>

          <ScrollView
            style={styles.recuadroPregunta}
            persistentScrollbar={true}>
            <ScrollView
              ref={scrollViewRef}
              style={{marginBottom: hp('2%')}}
              persistentScrollbar={true}
              nestedScrollEnabled={true}
              horizontal={true}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: wp('3%'),
                  marginBottom: hp('2%'),
                  // flex: 1,
                }}>
                <CustomAvatar
                  title="1"
                  titleStyle={{
                    color: '#00983a',
                    fontSize: wp('4%'),
                    fontWeight: 'bold',
                  }}
                  rounded
                  overlayContainerStyle={{
                    backgroundColor: '#fff',
                    flex: 1,
                    top: -2,
                    left: -2,
                  }}
                  size={wp('6%')}
                  borderColor="transparent"
                />
                {palabras1.map((item, index) => {
                  return (
                    <View key={index}>
                      <Pressable
                        style={({pressed}) => [
                          {
                            width:wp('60%'),                          
                            maxHeight: wp('25%'),
                            borderRadius: 10,
                            marginHorizontal: wp('1.5%'),
                            borderWidth: wp('0.5%'),
                            padding: wp('1%'),
                            borderColor: '#979797',
                            backgroundColor: pressed
                              ? '#00983a'
                              : 'transparent',
                          },
                        ]}
                        onPress={() => {
                          seleccionarRespuesta(item, index);
                        }}>
                        {({pressed}) => (
                          <Text
                            style={{color: pressed ? '#f5f5f0' : '#6d6d6d'}}>
                            {item.cuerpo}
                          </Text>
                        )}
                      </Pressable>
                    </View>
                  );
                })}
              </View>
            </ScrollView>

            <View
              style={{
                borderRadius: 10,
                margin: wp('1.5%'),
                borderWidth: wp('0.5%'),
                padding: wp('1%'),
                borderColor: '#979797',
                marginTop: hp('2%'),
                minHeight: hp('5%'),
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}>
              <ScrollView>
                {seleccionPalabras1.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        borderRadius: 10,
                        marginHorizontal: wp('1.5%'),
                        borderWidth: wp('0.5%'),
                        padding: wp('1%'),
                        borderColor: '#979797',
                        backgroundColor: '#00983a',
                      }}>
                      <Text style={{color: '#f5f5f0'}}>{item}</Text>
                    </View>
                  );
                })}
              </ScrollView>
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
                <Text style={styles.buttonText}>{textoBoton}</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </View>
    </SafeAreaView>
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
    padding: wp('3%'),
    marginLeft: wp('6%'),
    marginRight: wp('1.5%'),
    height:wp('48%'),
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
  },
});
