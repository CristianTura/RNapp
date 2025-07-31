import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert, AppState, ImageBackground, ScrollView, StyleSheet,
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
  const [tamaño, setTamaño] = useState(0);
  const [cuestionario, setCuestionario] = useState([]);

  const appState = React.useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = React.useState(appState.current);
  const { width } = useWindowDimensions();

  const { setForegroundVolume, isMuted, toggleMute } = useAudio();

  const refScrollView = useRef(null);

  useEffect(() => {
    // Lock to landscape orientation
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    
    // Cleanup function to restore default orientation when component unmounts
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  React.useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
        setForegroundVolume(0); 
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
                setCuestionario(response);
                setTamaño(response.length);
              }
            },
          );
        });
      } else {
        conexion();
      }
    });
  };

  useEffect(() => {
    // Lock to landscape orientation
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    
    // Cleanup function to restore default orientation when component unmounts
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);
// console.log('props temario vertical', props)
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
              }}
              activeOpacity={0.3}
              style={{
                backgroundColor: '#fa4616',
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
                marginTop:wp('5%')
              }}>
              <SimpleIcons
                name={isMuted ? 'volume-2' : 'volume-off'}
                size={wp('4.5%')}
                color="#f5f5f0"
              />
            </TouchableOpacity>
        </View>
        <View style={styles.bloqueContenido}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.titulo}>{props.titulo}</Text>
            
          </View>

          <View style={{width: '95%', maxHeight: '30%'}}>
            <ScrollView
              ref={refScrollView}
              persistentScrollbar={true}>
              {props.contenido.length > 0 ? (
                <RenderHtml
                  contentWidth={width}
                  source={{html: props.contenido}}
                  tagsStyles={{
                    p: {
                      fontSize: wp('4%'),
                      textAlign: 'justify',
                      marginRight: wp('4%'),
                    },
                    span: {
                      fontSize: wp('4%'),
                      textAlign: 'justify',
                      marginRight: wp('4%'),
                    },
                  }}
                />
              ) : null}
            </ScrollView>
          </View>

          <View style={styles.horizontalLine} />

          <View
            style={{
              width: '95%',
              minHeight: '31%',
              borderRadius: wp('5%'),
              overflow: 'hidden',
            }}>
            <Image
              style={{flex: 1, borderRadius: wp('5%')}}
              source={{uri: props.imagenUri}}
              contentFit="contain"
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
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
                      dataAmbientes[parseInt(props.ambiente) - 1]
                        .screenAmbiente,
                    );
                  } else {
                    props.setContadorItems(props.contadorItems - 1);
                  }
                }}>
                <LinearGradient
                  colors={['#1ad17c', '#19ce79', '#099941']}
                  start={{x: 0.3, y: 0.5}}
                  end={{x: 1, y: 0.5}}
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
                  props.setContadorItems(props.contadorItems + 1);
                }}>
                <LinearGradient
                  colors={['#1ad17c', '#19ce79', '#099941']}
                  start={{x: 0.3, y: 0.5}}
                  end={{x: 1, y: 0.5}}
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

            {props.contadorItems == props.temarioLength - 1 ? (
              <TouchableOpacity
                onPress={() => {
                  setForegroundVolume(0.0);
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
                  end={{x: 0.5, y: 0.3}}>
                  <Text style={styles.buttonText}>Realizar Test</Text>
                </LinearGradient>
              </TouchableOpacity>
            ) : null}
          </View>
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
    paddingBottom: hp('5%'),
  },

  bloqueNum: {
    width: '10%',
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
    width: '50%',
  },

  bloqueDer: {
    width: wp('50%'),
    alignItems: 'center',
  },

  regresarButton: {
    borderRadius: 35,
    padding: wp('1.5%'),
    marginTop: hp('1.5%'),
    alignSelf: 'flex-start',
    marginHorizontal: wp('2%'),
  },

  regresarText: {
    marginHorizontal: wp('2%'),
    color: '#f5f5f0',
    fontFamily: 'Roboto-Regular',
    fontSize: wp('3.5%'),
  },

  button: {
    padding: wp('2.5%'),
    borderRadius: 50,
    marginHorizontal: wp('2%'),
    marginVertical: hp('1.5%'),
    alignItems: 'center',
  },

  buttonText: {
    fontSize: wp('4%'),
    fontFamily: 'Roboto-Regular',
    color: '#f5f5f0',
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

  bloqueContenido: {
    width: '90%',
    justifyContent: 'space-evenly',
  },

  horizontalLine: {
    backgroundColor: '#bac5b9',
    height: hp('0.2%'),
    width: '95%',
    marginVertical: hp('1%'),
  },
});
