import React, { memo, useEffect, useState } from 'react';
import {
  Alert,
  AppState,
  BackHandler,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import * as ScreenOrientation from 'expo-screen-orientation';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import data from '../../data/dataAgricultores';
// import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import { LinearGradient } from 'expo-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleIcons from 'react-native-vector-icons/SimpleLineIcons';
import { getTemario, validarPasosTodosAmbientes } from '../../api/api';
import { useAudio } from '../../utils/AudioContext';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import Loading from '../screens/Loading';

// export default function

const AbejasHome = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isEnabledZoom, setIsEnabledZoom] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [iconName, setIconName] = useState('up');
  const falseArray = new Array(7).fill(false);
  const [isComplete, setIsComplete] = useState(falseArray);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);

  const { 
    isMuted, 
    loadBackgroundSound, 
    stopBackgroundSound, 
    toggleMute 
  } = useAudio();
  
  const appState = React.useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

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
      // console.log("AppState", appState.current);
    });

    return () => {
      if(subscription) subscription.remove();
    };
  }, []);
  
  React.useEffect(() => {
    // Configurar audio con el contexto
    const setupAudio = async () => {
      try {
        console.log('Starting audio setup...');
        const audioFile = require('../../assets/audio/abejas.mp3');
        console.log('Audio file path:', audioFile);
        await loadBackgroundSound(audioFile, true);
        console.log('Audio setup completed successfully');
      } catch (error) {
        console.log('Error loading sound:', error);
      }
    };

    setupAudio();

    // Cleanup function
    return () => {
      console.log('Cleaning up audio...');
      stopBackgroundSound();
    };
  }, []);

  props.navigation.addListener('beforeRemove', (e) => {
    stopBackgroundSound();
  });

  const backAction = async () => {
    await stopBackgroundSound();
    props.navigation.navigate('MyDrawer');
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );

  React.useEffect(() => {
    return () => backHandler.remove();
  }, []);

  React.useEffect(() => {
    NetInfo.fetch().then((state) => {
      AsyncStorage.getItem('token').then((value) => {
        setToken(value);
        if (state.isConnected == true) {
          validarPasosTodosAmbientes(value).then((response) => {
            if (response == 'error de conexion') {
              conexion();
            } else {
              const pasosAmbiente1 = response.filter(
                (obj) => obj.ambiente == 2,
              );
              const auxIsComplete = isComplete.slice();
              for (let i = 0; i < pasosAmbiente1.length; i++) {
                for (let j = 0; j < isComplete.length; j++) {
                  if (pasosAmbiente1[i].paso == j + 1) {
                    auxIsComplete.splice(j, 1, pasosAmbiente1[i].pasado);
                    setIsComplete(auxIsComplete);
                  }
                }
                i == pasosAmbiente1.length - 1 ? setIsLoading(false) : null;
              }
            }
          });
        } else {
          conexion();
        }
      });
    });
  }, []);

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

  const getTemarios = (paso) => {
    AsyncStorage.getItem('ambiente').then((ambiente) => {
      NetInfo.fetch().then((state) => {
        if (state.isConnected == true) {
          getTemario(token, ambiente, paso).then((response) => {
            if (response == 'error de conexion') {
              conexion();
            } else {
              stopBackgroundSound();
              props.navigation.navigate('Temario', {
                response: response,
                paso: paso,
                ambiente: ambiente,
              });
            }
          });
        } else {
          conexion();
        }
      });
    });
  };

  React.useEffect(() => {
    setIsEnabledZoom(false);
    setTimeout(() => {
      setIsEnabledZoom(true);
    }, 100);
  }, [zoom]);

  const functionThatChangesZoom = React.useCallback((newZoomValue) => {
    setZoom(newZoomValue);
  }, []);

  useEffect(() => {
    // Lock to landscape orientation
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    
    // Cleanup function to restore default orientation when component unmounts
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaWrapper backgroundColor="#ffffff">
      <View style={{flex: 1, position: 'relative'}}>
        <ReactNativeZoomableView
          maxZoom={1.5}
          minZoom={1}
          zoomStep={0.2}
          initialZoom={zoom}
          bindToBorders={true}
          zoomEnabled={isEnabledZoom}
          style={{flex: 1}}
        >

        <ScrollView
          horizontal={true}
          persistentScrollbar={true}
          style={{flex: 1}}>
          <ImageBackground
            // source={require('../../assets/ambiente-fondo-agricultores.png')}
            source={require('../../assets/abejas.png')}
            // source={null}
            imageStyle={{flex: 1, resizeMode: 'stretch'}}
            style={{
              width: hp('105%'),
              height: wp('100%'),
          }}>
            <TouchableOpacity
              onPress={() => {
                getTemarios(1);
              }}
              style={{
                top: '70%',
                left: '25%',
                position: 'absolute',
                alignItems: 'center',
              }}>
                
                <Image
                  source={require('../../assets/01abejasmin.gif')}
                  style={{
                    width: wp('32%'),
                    height: wp('30%'),
                  }}
                />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                left: '18%',
                top: '34%',
                position: 'absolute',
              }}
              onPress={() => {
                isComplete[0]
                  ? getTemarios(2)
                  : Alert.alert(
                      'Temática incompleta',
                      'Aprueba el test del paso anterior para continuar',
                      [
                        {
                          text: 'Cerrar',
                          style: 'cancel',
                        },
                      ],
                    );
            }}>
              <Image
                source={require('../../assets/02abejasmin.gif')}
                style={{
                  width: wp('15%'),
                  height: wp('15%'),
                }}
              />
              
              <Image
                source={require('../../assets/02abejasmin.gif')}
                style={{
                  width: wp('12%'),
                  height: wp('12%'),
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                top: '70%',
                left: '60%',
                position: 'absolute',
              }}
              onPress={() => {
                isComplete[1]
                  ? getTemarios(3)
                  : Alert.alert(
                      'Temática incompleta',
                      'Aprueba el test del paso anterior para continuar',
                      [
                        {
                          text: 'Cerrar',
                          style: 'cancel',
                        },
                      ],
                    );
              }}>  
                <Image
                  source={require('../../assets/03abejasmin.gif')}
                  style={{
                    width: wp('35%'),
                    height: wp('22%'),
                  }}
                />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                top: '45%',
                left: '78%',
                position: 'absolute',
              }}
              onPress={() => {
                isComplete[2]
                  ? getTemarios(4)
                  : Alert.alert(
                      'Temática incompleta',
                      'Aprueba el test del paso anterior para continuar',
                      [
                        {
                          text: 'Cerrar',
                          style: 'cancel',
                        },
                      ],
                    );
              }}>
              <Image
                source={require('../../assets/04abejas.png')}
                style={{
                  width: wp('40%'),
                  height: wp('40%'),
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                top: '40%',
                left: '40%',
                position: 'absolute',
              }}
              onPress={() => {
                isComplete[3]
                  ? getTemarios(5)
                  : Alert.alert(
                      'Temática incompleta',
                      'Aprueba el test del paso anterior para continuar',
                      [
                        {
                          text: 'Cerrar',
                          style: 'cancel',
                        },
                      ],
                    );
              }}>
                <Image
                source={require('../../assets/05abejasmin.gif')}
                style={{
                  width: wp('30%'),
                  height: wp('35%'),
                }}
              />

            </TouchableOpacity>

            <TouchableOpacity
              style={{
                top: '32%',
                left: '57%',
                position: 'absolute',
              }}
              onPress={() => {
                isComplete[4]
                  ? getTemarios(6)
                  : Alert.alert(
                      'Temática incompleta',
                      'Aprueba el test del paso anterior para continuar',
                      [
                        {
                          text: 'Cerrar',
                          style: 'cancel',
                        },
                      ],
                    );
              }}>
              <Image
                source={require('../../assets/06abejas.png')}
                style={{
                  width: wp('15%'),
                  height: wp('20%'),
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                top: '30%',
                left: '68%',
                position: 'absolute',
              }}
              onPress={() => {
                isComplete[5]
                  ? getTemarios(7)
                  : Alert.alert(
                      'Temática incompleta',
                      'Aprueba el test del paso anterior para continuar',
                      [
                        {
                          text: 'Cerrar',
                          style: 'cancel',
                        },
                      ],
                    );
              }}>
              <Image
                source={require('../../assets/07abejas.png')}
                style={{
                  width: wp('20%'),
                  height: wp('15%'),
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                getTemarios(1);
              }}
              activeOpacity={0.6}
              style={{
                position: 'absolute',
                width: wp('9%'),
                height: wp('10%'),
                top: '65%',
                left: '30%',
                alignItems: 'center',
              }}>
              <Image
                source={
                  isComplete[0] ? data[0].imgPathCompleto : data[0].imgPath
                }
                style={{
                  flex: 1,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                isComplete[0]
                  ? getTemarios(2)
                  : Alert.alert(
                      'Temática incompleta',
                      'Aprueba el test del paso anterior para continuar',
                      [
                        {
                          text: 'Cerrar',
                          style: 'cancel',
                        },
                      ],
                    );
              }}
              activeOpacity={0.6}
              style={{
                position: 'absolute',
                width: wp('9%'),
                height: wp('10%'),
                top: '30%',
                left: '20%',
                alignItems: 'center',
              }}>
              <Image
                source={
                  isComplete[1] ? data[0].imgPathCompleto : data[1].imgPath
                }
                style={{flex: 1, resizeMode: 'contain'}}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                isComplete[1]
                  ? getTemarios(3)
                  : Alert.alert(
                      'Temática incompleta',
                      'Aprueba el test del paso anterior para continuar',
                      [
                        {
                          text: 'Cerrar',
                          style: 'cancel',
                        },
                      ],
                    );
                // getTemarios(3);
              }}
              style={{
                position: 'absolute',
                width: wp('9%'),
                height: wp('10%'),
                top: '59%',
                left: '67%',
                alignItems: 'center',
              }}>
              <Image
                source={
                  isComplete[2] ? data[0].imgPathCompleto : data[2].imgPath
                }
                style={{flex: 1, resizeMode: 'contain'}}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                isComplete[2]
                  ? getTemarios(4)
                  : Alert.alert(
                      'Temática incompleto',
                      'Aprueba el test del paso anterior para continuar',
                      [
                        {
                          text: 'Cerrar',
                          style: 'cancel',
                        },
                      ],
                    );
              }}
              style={{
                position: 'absolute',
                width: wp('9%'),
                height: wp('10%'),
                top: '43%',
                left: '83%',
                alignItems: 'center',
              }}>
              <Image
                source={
                  isComplete[3] ? data[0].imgPathCompleto : data[3].imgPath
                }
                style={{flex: 1, resizeMode: 'contain'}}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                isComplete[3]
                  ? getTemarios(5)
                  : Alert.alert(
                      'Temática incompleto',
                      'Aprueba el test del paso anterior para continuar',
                      [
                        {
                          text: 'Cerrar',
                          style: 'cancel',
                        },
                      ],
                    );
              }}
              style={{
                position: 'absolute',
                width: wp('9%'),
                height: wp('10%'),
                top: '42%',
                left: '40%',
                alignItems: 'center',
              }}>
              <Image
                source={
                  isComplete[4] ? data[0].imgPathCompleto : data[4].imgPath
                }
                style={{flex: 1, resizeMode: 'contain'}}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                isComplete[4]
                  ? getTemarios(6)
                  : Alert.alert(
                      'Temática incompleto',
                      'Aprueba el test del paso anterior para continuar',
                      [
                        {
                          text: 'Cerrar',
                          style: 'cancel',
                        },
                      ],
                    );
              }}
              style={{
                position: 'absolute',
                width: wp('9%'),
                height: wp('10%'),
                top: '35%',
                left: '55%',
                alignItems: 'center',
              }}>
              <Image
                source={
                  isComplete[5] ? data[0].imgPathCompleto : data[5].imgPath
                }
                style={{
                  flex: 1,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                isComplete[5]
                  ? getTemarios(7)
                  : Alert.alert(
                      'Temática incompleto',
                      'Aprueba el test del paso anterior para continuar',
                      [
                        {
                          text: 'Cerrar',
                          style: 'cancel',
                        },
                      ],
                    );
              }}
              style={{
                position: 'absolute',
                width: wp('9%'),
                height: wp('10%'),
                top: '30%',
                left: '80%',
                alignItems: 'center',
              }}>
              <Image
                source={
                  isComplete[6] ? data[0].imgPathCompleto : data[6].imgPath
                }
                style={{
                  flex: 1,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </ImageBackground>
        </ScrollView>
      </ReactNativeZoomableView>
      {/* </View> */}

        <View
          style={{
            // flexDirection: 'column-reverse',
            width: hp('100%'),
            height: hp('15%'),
            position: 'absolute',
            backgroundColor: 'transparent',
            top: 0,
          }}>
          {/* MENÚ COLAPSABLE */}
          <LinearGradient
            style={[
              styles.background1,
              {opacity: isCollapsed ? 0.85 : 0, top: 0},
            ]}
            colors={['#2d71b0', '#20397e']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>
            <View style={styles.header}>
              <View style={{height: wp('12%'), width: wp('35%')}}>
                <ImageBackground
                  style={styles.logo}
                  source={require('../../assets/logoHorizontal.png')}
                />
              </View>

              <Text
                style={{
                  // marginVertical: '5%',
                  marginVertical: hp('5%'),
                  fontFamily: 'Roboto-Regular',
                  // fontSize: 20,
                  fontSize: wp('5.5%'),
                  color: '#f5f5f0',
                  // marginRight: '20%',
                }}>
                Abejas
              </Text>

              <TouchableOpacity
                disabled={!isCollapsed}
                onPress={async () => {
                  await stopBackgroundSound();
                  props.navigation.navigate('MyDrawer',{screen:'Menú Principal',params:{screen:'Ambientes'}})
                }}              
                style={{
                  height: hp('15%'),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Oxygen-Bold',
                    // fontSize: 18,
                    fontSize: wp('5%'),
                    color: '#f5f5f0',
                  }}>
                  Temáticas
                  <AntDesign name="left" size={wp('5%')} color="#f5f5f0" />
                </Text>
                          </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* BOTON ZOOM */}
        <View
          style={{
            marginTop: hp('5%'),
            alignSelf: 'flex-end',
            paddingHorizontal: wp('5%'),
            position: 'absolute',
            alignItems: 'center',
            top: 0,
            right: 0,
          }}>
          {!isCollapsed ? (
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity
            onPress={async () => {  
              toggleMute();
            }}
            activeOpacity={0.3}
            style={{
              backgroundColor: '#fa4616',
              padding: wp('1.5%'),
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
              marginHorizontal:wp('2%')
            }}>
            
              <SimpleIcons
                name= {isMuted? "volume-2":"volume-off"}
                size={wp('4.5%')}
                color="#f5f5f0"
              />
            
          </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                functionThatChangesZoom(Math.round((zoom + 0.1) * 10) / 10);
                if (zoom == 1.5) {
                  setZoom(1);
                }
              }}
              activeOpacity={0.3}
              style={{
                backgroundColor: '#fa4616',
                padding: wp('1%'),
                borderWidth: 2,
                borderColor: '#f5f5f0',
                borderRadius: 40,
                justifyContent: 'center',
                alignContent: 'center',
                elevation: 7,
                zIndex: 7,
                shadowColor: '#d6d6d6d',
                shadowOpacity: 0.3,
                shadowColor: 'black',
              }}>
              <Text
                style={{
                  color: '#f5f5f0',
                  fontFamily: 'Roboto-Regular',
                  fontSize: wp('4.5%'),
                  alignSelf: 'center',
                  paddingHorizontal: wp('2%'),
                }}>
                <SimpleIcons
                  name="magnifier-add"
                  size={wp('4.5%')}
                  color="#f5f5f0"
                />
                {'  '}Zoom
              </Text>
            </TouchableOpacity>
            </View>
          ) : null}
        </View>

        {/* BOTON MENÚ COLAPSABLE */}
        <TouchableOpacity
          onPress={() => {
            setIsCollapsed(prev => !prev)
            // if (!isCollapsed) {
            //   setIconName('up');
            // } else {
            //   setIconName('down');
            // }
          }}
          style={styles.collapseButton}>
          <LinearGradient
            style={{
              paddingHorizontal: wp('5%'),
              paddingVertical: wp('1%'),
            }}
            colors={['#f7b500', '#fcdb00']}
            start={{x: 0.5, y: 0.2}}
            end={{x: 0.5, y: 0.9}}>
            <AntDesign name={isCollapsed ? 'up' : 'down'} size={wp('4%')} color="#f5f5f0" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  background1: {
    flex: 1,
    elevation: 10,
    zIndex: 1,
    borderBottomLeftRadius: wp('5%'),
    borderBottomRightRadius: wp('5%'),
    overflow: 'hidden',
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },

  header: {
    marginHorizontal: wp('6%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  logo: {
    flex: 1,
    resizeMode: 'contain',
  },

  collapseButton: {
    alignSelf: 'center',
    position: 'absolute',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    overflow: 'hidden',
    zIndex: 2,
  },
});

export default memo(AbejasHome);