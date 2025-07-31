import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { LinearGradient } from 'expo-linear-gradient';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect } from 'react';
import {
  Image,
  ImageBackground,
  Linking,
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
import {
  consultarFechaCertificado,
  getConsultarPasoUsuario,
  getConsultarUsuario,
  postGenerarCertificado,
  validarPasosTodosAmbientes,
} from '../../api/api';
import dataAmbientes from '../../data/dataAmbientes';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import Loading from '../screens/Loading';

export default function Certificados(props) {
  //CONSULTAR MÉTODO DE TUTORIAL COMPLETADO PARA VERIFICAR SI HA INICIADO EL AMBIENTE
  //CONSULTAR MÉTODO DE AMBIENTES PASADOS. SI ARRAYPASOS.LENGTH DEL DATA AMBIENTE ES IGUAL
  //AL LENGTH DEL ARRAY DE PASOS COMPLETADOS UNA VEZ SE FILTRE POR CADA AMBIENTE EL AMBIENTE
  //ESTÁ PASADO
  const [isLoading, setIsLoading] = React.useState(true);
  const [ambientesAprobados, setAmbientesAprobados] = React.useState(
    new Array(5).fill(false),
  );

  const [tutorialCompletado, setTutorialCompletado] = React.useState(
    new Array(5).fill(false),
  );

  const fondoCertificado = [
    require('../../assets/fondocert0.png'),
    require('../../assets/fondocert100.png'),
  ];

  const flechaCertificado = [
    require('../../assets/continueicon.png'),
    require('../../assets/downloadicon.png'),
  ];

  const guardarAmbiente = async (ambienteId) => {
    try {
      await AsyncStorage.setItem('ambiente', ambienteId);
    } catch (e) {
      console.log('Failed to save the data to the storage');
    }
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

  // React.useEffect(() => {
  //   //para determinar cuáles ambientes han sido iniciados (completado tutorial)
    
  //   console.log('este es el length de datambientes', dataAmbientes.length);
  //   for (let i = 0; i < dataAmbientes.length; i++) {
  //     AsyncStorage.getItem('token').then((token) => {
  //       NetInfo.fetch().then((state) => {
  //         if (state.isConnected == true) {
  //           getConsultarPasoUsuario(
  //             token,
  //             parseInt(dataAmbientes[i].ambienteId),
  //           ).then((response) => {
  //             if (response == 'error de conexion') {
  //               conexion();
  //             } else {
  //               if (response == 'true' || response == true) {
  //                 auxTutorialCompletado[i] = true;
  //                 setTutorialCompletado(auxTutorialCompletado);
  //               } else {
  //                 auxTutorialCompletado[i] = false;
  //                 setTutorialCompletado(auxTutorialCompletado);
  //               }
  //             }
  //           });
  //         } else {
  //           conexion();
  //         }
  //       });
  //     });
  //   }
  // }, []);

  React.useEffect(() => {
    let auxAmbientesAprobados = ambientesAprobados.slice();
    for (let k = 0; k < dataAmbientes.length; k++) {
      NetInfo.fetch().then((state) => {
        AsyncStorage.getItem('token').then((value) => {
          
          if (state.isConnected == true) {
            validarPasosTodosAmbientes(value).then((response) => {
              if (response == 'error de conexion') {
                conexion();
              } else {
                const pasosAmbiente = response.filter(
                  (obj) => obj.ambiente == k + 1,
                );

                if (pasosAmbiente.some((e) => e.pasado === false)) {
                  auxAmbientesAprobados[k] = false;
                  setAmbientesAprobados(auxAmbientesAprobados);
                } else {
                  auxAmbientesAprobados[k] = true;
                  setAmbientesAprobados(auxAmbientesAprobados);
                }



                let auxTutorialCompletado = tutorialCompletado.slice();
                for (let i = 0; i < dataAmbientes.length; i++) {
                getConsultarPasoUsuario(
                  value,
                  parseInt(dataAmbientes[i].ambienteId),
                ).then((response) => {
                  if (response == 'error de conexion') {
                    conexion();
                  } else {
                    if (response == 'true' || response == true) {
                      auxTutorialCompletado[i] = true;
                      setTutorialCompletado(auxTutorialCompletado);
                    } else {
                      auxTutorialCompletado[i] = false;
                      setTutorialCompletado(auxTutorialCompletado);
                    }
                  }
                });
              }
            }
            });
          } else {
            conexion();
          }
        });
      });
    }
  }, []);

  const verificarTutorialAmbiente = (
    nombrePantalla,
    ambiente,
    splashAmbiente,
  ) => {
    AsyncStorage.getItem('token').then((token) => {
      NetInfo.fetch().then((state) => {
        if (state.isConnected == true) {
          getConsultarPasoUsuario(token, parseInt(ambiente)).then(
            (response) => {
              if (response == 'error de conexion') {
                conexion();
              } else {
                if (response == 'true' || response == true) {
                  props.navigation.navigate(nombrePantalla, {
                    ambiente: ambiente,
                  });
                } else {
                  props.navigation.navigate(splashAmbiente, {
                    ambiente: ambiente,
                  });
                }
              }
            },
          );
        } else {
          conexion();
        }
      });
    });
    // }, []);
  };

  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  useEffect(() => {
    // Lock to portrait orientation
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    
    // Cleanup function to restore default orientation when component unmounts
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  //  if (isLoading){
  //    return <Loading />
  //  }

  return (
    <SafeAreaWrapper backgroundColor='#f5f5f0'>
      <View style={styles.container}>
        
        <View>
          {/* FONDO */}
          <LinearGradient
            style={styles.background1}
            colors={['#2d71b0', '#20397e']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}></LinearGradient>

          <LinearGradient
            style={styles.background2}
            colors={['#afd9ef', '#ffffff']}
            end={{x: 0.5, y: 0.4}}></LinearGradient>
        </View>

        {/* ENCABEZADO */}
        <View style={styles.header}>
          <View style={{width: wp('45%'), height: wp('16%')}}>
            <ImageBackground
              style={styles.logo}
              source={require('../../assets/logoHorizontal.png')}
            />
          </View>

          <View>
            <Text
              style={{
                fontFamily: 'Oxygen-Bold',
                fontSize: wp('5%'),
                color: '#f5f5f0',
                paddingLeft: wp('14%'),
              }}>
              Certificados
            </Text>
          </View>
        </View>

        <ScrollView
          persistentScrollbar={true}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            // marginTop: '25%',
            marginTop: hp('17%'),
          }}>
          <View style={styles.ambientes}>
            {dataAmbientes.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    if (ambientesAprobados[index]) {
                      AsyncStorage.getItem('token').then((token) => {
                        consultarFechaCertificado(
                          token,
                          parseInt(dataAmbientes[index].ambienteId),
                        ).then((respFecha) => {
                          getConsultarUsuario(token).then((response) => {
                            postGenerarCertificado(
                              response.cultivos[0].usuario
                                .split('null')[0]
                                .toUpperCase(),
                              item.ambienteId,
                              respFecha.fecha
                            ).then((result) => {
                              Linking.openURL(result);
                            });
                          });
                        });
                      });
                    } else {
                      guardarAmbiente(item.ambienteId);
                      verificarTutorialAmbiente(
                        item.screenAmbiente,
                        item.ambienteId,
                        item.screen,
                      );
                    }
                  }}
                  style={{
                    marginBottom: hp('1.5%'),
                    width: wp('85%'),
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: wp('26%'),
                  }}>
                  <ImageBackground
                    resizeMode="contain"
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                    }}
                    source={
                      ambientesAprobados[index]
                        ? fondoCertificado[1]
                        : fondoCertificado[0]
                    }>
                    <View style={styles.contenedorIzq}>
                      <Image
                        style={styles.imgAmbiente}
                        source={
                          ambientesAprobados[index]
                            ? item.imgCert100
                            : item.imgCert0
                        }
                      />
                    </View>

                    <View style={styles.contenedorCentro}>
                      <View>
                        <Text style={styles.titulo}>{item.nombreAmbiente}</Text>
                        <Text style={styles.subtitulo}>
                          {ambientesAprobados[index]
                            ? 'Curso Finalizado'
                            : tutorialCompletado[index]
                            ? 'Curso Iniciado'
                            : 'Sin iniciar'}
                        </Text>
                      </View>

                      <Text style={styles.subtitulo}>
                        Calificación:{' '}
                        {props.route.params.arrayCalificaciones[index]}%
                      </Text>
                    </View>

                    <View style={styles.contenedorDer}>
                      <Image
                        style={styles.flecha}
                        source={
                          ambientesAprobados[index]
                            ? flechaCertificado[1]
                            : flechaCertificado[0]
                        }
                      />
                      <Text style={styles.subtituloBlanco}>
                        {ambientesAprobados[index]
                          ? 'Descargar certificado'
                          : tutorialCompletado[index]
                          ? 'Continuar Curso'
                          : 'Empezar Curso'}
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
        {isLoading && <Loading />}
      </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#20397e',
    alignItems: 'center',
  },
  background1: {
    // width: '100%',
    width: wp('100%'),
    // height: '23%',
    height: hp('20%'),
    opacity: 1,
  },
  background2: {
    // height: '80%',
    height: hp('80%'),
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  header: {
    position: 'absolute',
    // marginLeft: '5%',
    // marginTop: '8%',
    marginTop: hp('4%'),
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logo: {
    flex: 1,
    resizeMode: 'contain',
  },
  ambientes: {
    alignSelf: 'center',
    width: wp('80%'),
  },

  imgAmbiente: {
    width: wp('18%'),
    height: wp('18%'),
    // flex:1,
    // resizeMode:'contain'
  },

  contenedorIzq: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contenedorCentro: {
    flex: 3,
    justifyContent: 'space-around',
    paddingLeft: wp('0.5%'),
    paddingVertical: wp('2%'),
  },

  contenedorDer: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  flecha: {
    width: wp('7%'),
    height: wp('7%'),
  },

  titulo: {
    fontFamily: 'Roboto-Medium',
    fontSize: wp('4%'),
    color: '#22372b',
  },

  subtitulo: {
    fontFamily: 'Roboto-Regular',
    fontSize: wp('3.5%'),
    color: '#22372b',
  },

  subtituloBlanco: {
    fontFamily: 'Roboto-Regular',
    fontSize: wp('3.2%'),
    color: '#fff',
    textAlign: 'center',
  },
});
