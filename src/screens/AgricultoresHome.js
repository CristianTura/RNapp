import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { LinearGradient } from 'expo-linear-gradient';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { memo, useEffect, useState } from 'react';
import {
  Alert,
  AppState,
  BackHandler,
  Image,
  ImageBackground,
  Platform,
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

const AgricultoresHome = (props) => {

  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isEnabledZoom, setIsEnabledZoom] = React.useState(true);
  const [zoom, setZoom] = React.useState(1);
  const [iconName, setIconName] = React.useState('up');
  const { loadBackgroundSound, setBackgroundVolume, toggleMute, isMuted } = useAudio();
  const falseArray = new Array(9).fill(false);
  const [isComplete, setIsComplete] = React.useState(falseArray);
  const [isLoading, setIsLoading] = React.useState(true);
  const [token, setToken] = useState(null);

  const appState = React.useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = React.useState(appState.current);

  React.useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
        setBackgroundVolume(0.7);
      } else {
        console.log('App is inactive')
        setBackgroundVolume(0);
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      if(subscription) subscription.remove();
    };
  }, []);

  React.useEffect(() => {
    const loadAudio = async () => {
      try {
        const audioFile = require('../../assets/audio/agricultores.mp3');
        await loadBackgroundSound(audioFile, true);
      } catch (error) {
        console.log('Failed to load the sound', error);
      }
    };

    loadAudio();

    props.navigation.addListener('beforeRemove', (e) => {
      // No need to stop audio here, it's managed by AudioContext
    });

    const backAction = async () => {
      // No need to stop audio here
      props.navigation.navigate('MyDrawer');
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

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
                (obj) => obj.ambiente == 1,
              );
              const auxIsComplete = isComplete.slice();

              for (let i = 0; i < pasosAmbiente1.length; i++) {
                for (let j = 0; j < isComplete.length; j++) {
                  if (pasosAmbiente1[i].paso == j + 1) {
                    auxIsComplete.splice(j, 1, pasosAmbiente1[i].pasado);
                    setIsComplete(auxIsComplete);
                  }
                }
                i == pasosAmbiente1.length - 1
                  ? setIsLoading(false)
                  : setIsLoading(true);
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
    if (!isComplete[paso - 1]) {
      var current = isComplete.indexOf(false);
      paso = current >= 0 ? current + 1 : paso;
    }

    AsyncStorage.getItem('ambiente').then((ambiente) => {
      NetInfo.fetch().then((state) => {
        if (state.isConnected == true) {
          getTemario(token, ambiente, paso).then((response) => {
            if (response == 'error de conexion') {
              conexion();
            } else {
              setBackgroundVolume(0.0);
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

  // Configurar orientación landscape de manera más robusta
  useEffect(() => {
    const lockOrientation = async () => {
      try {
        // Verificar la orientación actual
        const currentOrientation = await ScreenOrientation.getOrientationAsync();
        // Forzar orientación landscape
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        // Verificar que se aplicó correctamente
        const newOrientation = await ScreenOrientation.getOrientationAsync();
      } catch (error) {
        console.log('Error locking orientation:', error);
      }
    };

    // Aplicar orientación con un pequeño delay para asegurar que el componente esté montado
    const timer = setTimeout(() => {
      lockOrientation();
    }, 100);

    return () => {
      clearTimeout(timer);
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
              source={require('../../assets/agricultores.png')}
              imageStyle={{flex: 1, resizeMode: 'stretch'}}
              style={{
                width: hp('105%'),
                height: wp('100%'),
              }}>
                {/* <Text>Current state is: {appStateVisible}</Text> */}
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: wp('50%'),
                  paddingLeft: wp('5%'),
                }}>
                <TouchableOpacity
                  style={{marginLeft: wp('1%')}}
                  onPress={() => {
                    getTemarios(2);
                    
                  }}>
                  <Image
                    source={require('../../assets/02agri.png')}
                    style={{
                      width: wp('29%'),
                      height: wp('25%'),

                      // position: 'absolute',
                    }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{top: '6%', left: '4%'}}
                  onPress={() => {
                    getTemarios(3);

                  }}>
                    {Platform.OS=='android' || Platform.OS=='ios'?
                    <Image
                    source={require('../../assets/03agrimin.gif')}
                    style={{
                      width: wp('35%'),
                      height: wp('35%'),
                    }}
                  />
                  :
                  <Image
                    source={require('../../assets/03agri_.png')}
                    style={{
                      width: wp('26%'),
                      height: wp('30%'),
                    }}
                  />
                    }
                  
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    // right: 0,
                    position: 'absolute',
                    left: '80%',
                    top: '40%',
                    // marginLeft: wp('93%'),
                  }}
                  onPress={() => {
                    getTemarios(7);
                    
                  }}>
                  <Image
                    source={require('../../assets/07agri.png')}
                    style={{
                      width: wp('72%'),
                      height: wp('25%'),
                    }}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => {
                  getTemarios(1);
              }}
              style={{
                top: '26%',
                left: '10%',
                position: 'absolute',
              }}>
              {Platform.OS=='android' || Platform.OS=='ios'?
                  <Image
                  source={require('../../assets/01agrimin.gif')}
                  style={{
                    width: wp('35%'),
                    height: wp('35%'),
                  }}
                />
                :
                <Image
                  source={require('../../assets/01agri_.png')}
                  style={{
                    width: wp('35%'),
                    height: wp('30%'),
                  }}
                />
              }
              
 
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                top: '33%',
                left: '30%',
                position: 'absolute',
              }}
              onPress={() => {
                getTemarios(4);

              }}>
              {Platform.OS=='android' || Platform.OS=='ios'?
                <Image
                source={require('../../assets/04agrimin.gif')}
                style={{
                  width: wp('35%'),
                  height: wp('35%'),
                }}
              />
              :
              <Image
                source={require('../../assets/04agri_.png')}
                style={{
                  width: wp('28%'),
                  height: wp('28%'),
                }}
              />
              }
              

            </TouchableOpacity>

            <TouchableOpacity
              style={{
                top: '38%',
                left: '50%',
                position: 'absolute',
              }}
              onPress={() => {
                getTemarios(5);
                
              }}>
              <Image
                source={require('../../assets/05agri.png')}
                style={{
                  width: wp('30%'),
                  height: wp('25%'),
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                top: '58%',
                left: '55%',
                position: 'absolute',
              }}
              onPress={() => {
                getTemarios(6);
                
              }}>
              <Image
                source={require('../../assets/06agri.png')}
                style={{
                  width: wp('32%'),
                  height: wp('25%'),
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                top: '27%',
                left: '80%',
                position: 'absolute',
              }}
              onPress={() => {
                getTemarios(8);

              }}>
                {Platform.OS=='android' || Platform.OS=='ios'?
                  <Image
                  source={require('../../assets/08agrimin.gif')}
                  style={{
                    width: wp('30%'),
                    height: wp('30%'),
                  }}
                />
                :
                <Image
                source={require('../../assets/08agri_.png')}
                style={{
                  width: wp('25%'),
                  height: wp('30%'),
                }}
              />
                }
              
              
              
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                top: '45%',
                left: '70%',
                position: 'absolute',
              }}
              onPress={() => {
                getTemarios(9);
                
              }}>
              <Image
                source={require('../../assets/09agri.png')}
                style={{
                  width: wp('25%'),
                  height: wp('20%'),
                }}
              />
            </TouchableOpacity>
            <View></View>
            <TouchableOpacity
              onPress={() => {
                getTemarios(1);
              }}
              activeOpacity={0.6}
              style={{
                position: 'absolute',
                width: wp('9%'),
                height: wp('10%'),
                top: '29%',
                left: '5%',
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
                getTemarios(2);
                
              }}
              activeOpacity={0.6}
              style={{
                position: 'absolute',
                width: wp('9%'),
                height: wp('10%'),
                top: '57%',
                left: '9%',
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
                getTemarios(3);

              }}
              style={{
                position: 'absolute',
                width: wp('9%'),
                height: wp('10%'),
                top: '65%',
                left: '28%',
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
                getTemarios(4);
                
              }}
              style={{
                position: 'absolute',
                width: wp('9%'),
                height: wp('10%'),
                top: '33%',
                left: '35%',
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
                getTemarios(5);
                
              }}
              style={{
                position: 'absolute',
                width: wp('9%'),
                height: wp('10%'),
                top: '40%',
                left: '50%',
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
                getTemarios(6);
                
              }}
              style={{
                position: 'absolute',
                width: wp('9%'),
                height: wp('10%'),
                top: '53%',
                left: '65%',
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
                getTemarios(7);

              }}
              style={{
                position: 'absolute',
                width: wp('9%'),
                height: wp('10%'),
                top: '65%',
                left: '83%',
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
                getTemarios(8);
                
              }}
              style={{
                position: 'absolute',
                zIndex: 0,
                width: wp('9%'),
                height: wp('10%'),
                top: '30%',
                left: '78%',
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
                getTemarios(9);
                
              }}
              style={{
                position: 'absolute',
                width: wp('9%'),
                height: wp('10%'),
                top: '37%',
                left: '70%',
                alignItems: 'center',
              }}>
              <Image
                source={
                  isComplete[8] ? data[0].imgPathCompleto : data[8].imgPath
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

      {/* MENÚ COLAPSABLE */}
      <View
        style={{
          width: hp('100%'),
          height: hp('15%'),
          position: 'absolute',
          backgroundColor: 'transparent',
          top: 0,
        }}>
        <LinearGradient
          style={[styles.background1, {opacity: isCollapsed ? 0.85 : 0}]}
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
              Agricultores
            </Text>

            <TouchableOpacity
              disabled={!isCollapsed}
              onPress={() => {
                // No need to stop audio here, it's managed by AudioContext
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
          onPress={() => {
            toggleMute()
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
          style={styles.collapseButton}
        >
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
    // top: 30,
    zIndex: 2,
  },
});

export default memo(AgricultoresHome);
