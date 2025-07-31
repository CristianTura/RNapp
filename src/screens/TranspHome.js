import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { LinearGradient } from 'expo-linear-gradient';
import * as ScreenOrientation from 'expo-screen-orientation';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  AppState,
  Image,
  ImageBackground,
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
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleIcons from 'react-native-vector-icons/SimpleLineIcons';
import { getTemario, validarPasosTodosAmbientes } from '../../api/api';
import data from '../../data/dataAgricultores';
import { useAudio } from '../../utils/AudioContext';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import Loading from '../screens/Loading';


const TranspHome = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isEnabledZoom, setIsEnabledZoom] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [iconName, setIconName] = useState('up');
  const falseArray = new Array(9).fill(false);
  const [isComplete, setIsComplete] = useState(falseArray);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);
  
  const { 
    isMuted, 
    loadBackgroundSound, 
    stopBackgroundSound, 
    toggleMute 
  } = useAudio();

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

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
    const loadAudio = async () => {
      try {
        await loadBackgroundSound(require('../../assets/audio/transportadores.mp3'), true);
      } catch (error) {
        console.log('Failed to load the sound', error);
      }
    };

    loadAudio();

    return () => {
      stopBackgroundSound();
    };
  }, []);
    useEffect(() => {
      NetInfo.fetch().then((state) => {
        AsyncStorage.getItem('token').then((value) => {
          setToken(value);
          if (state.isConnected == true) {
            validarPasosTodosAmbientes(value).then((response) => {
              if (response == 'error de conexion') {
                conexion();
              } else {
                const pasosAmbiente1 = response.filter(
                  (obj) => obj.ambiente == 5,
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

  useEffect(() => {
    setIsEnabledZoom(false);
    setTimeout(() => {
      setIsEnabledZoom(true);
    }, 100);
  }, [zoom]);


  const functionThatChangesZoom = useCallback((newZoomValue) => {
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
            source={require('../../assets/transporte.png')}
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
                top: '39%',
                left: '67%',
                position: 'absolute',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/07-2transp.png')}
                style={{
                  width: wp('16%'),
                  height: wp('16%'),
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                left: '71%',
                top: '77%',
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
                source={require('../../assets/02transpmin.gif')}
                style={{
                  width: wp('25%'),
                  height: wp('25%'),
                }}
              />
            
              
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                top: '65%',
                left: '80%',
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
                source={require('../../assets/04transp.png')}
                style={{
                  width: wp('30%'),
                  height: wp('30%'),
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                top: '55%',
                left: '50%',
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
                source={require('../../assets/05transpmin.gif')}
                style={{
                  width: wp('25%'),
                  height: wp('25%'),
                }}
              />
            
              
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                top: '-13%',
                left: '20%',
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
                source={require('../../assets/06transp.png')}
                style={{
                  width: wp('40%'),
                  height: wp('40%'),
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                top: '47%',
                left: '28%',
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
                source={require('../../assets/07transpmin.gif')}
                style={{
                  width: wp('35%'),
                  height: wp('35%'),
                }}
              />
            
              
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                top: '7%',
                left: '57%',
                position: 'absolute',
                paddingHorizontal: wp('5%'),
                paddingLeft: wp('8%'),
              }}
              onPress={() => {
                isComplete[6]
                  ? getTemarios(8)
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
                source={require('../../assets/08-2transp.png')}
                style={{
                  width: wp('15%'),
                  height: wp('15%'),
                }}
              />
            
              <Image
              source={require('../../assets/08-1transpmin.gif')}
              style={{
                width: wp('18%'),
                height: wp('20%'),
                marginTop: -wp('12%'),
                marginLeft: -wp('13%'),
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

                top: '28%',
                left: '60%',
                width: '15%',
                height: '19%',
                alignItems: 'center',
              }}>
              <Image
                source={
                  isComplete[0] ? data[0].imgPathCompleto : data[0].imgPath
                }
                style={{
                  width: wp('9%'),
                  height: wp('10%'),
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

                top: '70%',
                left: '70%',
                alignItems: 'center',
                paddingHorizontal: wp('8%'),
                paddingBottom: wp('6%'),
              }}>
              <Image
                source={
                  isComplete[1] ? data[0].imgPathCompleto : data[1].imgPath
                }
                style={{
                  width: wp('9%'),
                  height: wp('10%'),
                }}
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
              }}
              style={{
                position: 'absolute',

                top: '45%',
                left: '80%',
                alignItems: 'center',
                paddingHorizontal: wp('6%'),
                paddingBottom: wp('5%'),
              }}>
              <Image
                source={
                  isComplete[2] ? data[0].imgPathCompleto : data[2].imgPath
                }
                style={{width: wp('9%'), height: wp('10%')}}
              />
            </TouchableOpacity>

            <TouchableOpacity
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
              }}
              style={{
                position: 'absolute',
                marginHorizontal: wp('5%'),
                top: '65%',
                left: '75%',
                alignItems: 'center',
                paddingLeft: wp('13%'),
                paddingBottom: wp('13%'),
              }}>
              <Image
                source={
                  isComplete[3] ? data[0].imgPathCompleto : data[3].imgPath
                }
                style={{width: wp('9%'), height: wp('10%')}}
              />
            </TouchableOpacity>

            <TouchableOpacity
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
              }}
              style={{
                position: 'absolute',
                paddingHorizontal: wp('10%'),
                paddingBottom: wp('15%'),
                top: '55%',
                left: '50%',
                alignItems: 'center', 
              }}>
              <Image
                source={
                  isComplete[4] ? data[0].imgPathCompleto : data[4].imgPath
                }
                style={{width: wp('9%'), height: wp('10%')}}
              />
            </TouchableOpacity>

            <TouchableOpacity
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
              }}
              style={{
                position: 'absolute',
                width: wp('9%'),
                height: wp('10%'),
                top: '5%',
                left: '35%',
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
              style={{
                position: 'absolute',
                width: wp('9%'),
                height: wp('10%'),
                top: '58%',
                left: '32%',
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

            <TouchableOpacity
              onPress={() => {
                isComplete[6]
                  ? getTemarios(8)
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
              style={{
                position: 'absolute',
                width: wp('9%'),
                height: wp('10%'),
                top: '15%',
                marginLeft: '50.5%',
                alignItems: 'center',
              }}>
              <Image
                source={
                  isComplete[7] ? data[0].imgPathCompleto : data[7].imgPath
                }
                style={{
                  flex: 1,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                isComplete[7]
                  ? getTemarios(9)
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
              style={{
                position: 'absolute',
                paddingLeft: wp('15%'),
                paddingRight: '6%',
                paddingBottom: wp('25%'),
                top: '55%',
                left: '10%',
                alignItems: 'center',
                // borderWidth: wp('0.5%'),
              }}>
              <Image
                source={
                  isComplete[8] ? data[0].imgPathCompleto : data[8].imgPath
                }
                style={{
                  width: wp('9%'),
                  height: wp('10%'),
                }}
              />
            </TouchableOpacity>
          </ImageBackground>
        </ScrollView>
      </ReactNativeZoomableView>

      {isCollapsed ? (
        <View
          style={{
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
                  marginVertical: hp('5%'),
                  fontFamily: 'Roboto-Regular',
                  fontSize: wp('5.5%'),
                  color: '#f5f5f0',
                }}>
                Transportadores
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
                    fontSize: wp('5%'),
                    color: '#f5f5f0',
                  }}>
                  Temáticas{' '}
                  <AntDesign name="left" size={wp('5%')} color="#f5f5f0" />
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      ) : null}

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
            onPress={() => {
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
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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

export default memo(TranspHome);