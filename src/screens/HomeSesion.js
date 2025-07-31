import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect } from 'react';
import {
  BackHandler,
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
import dataAmbientes from '../../data/dataAmbientes';
import data from '../../data/dataNovedades';
import CarouselHomeSesion from '../components/CarouselHomeSesion';
import PerfilHeader from '../components/PerfilHeader';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
// import NetInfo from '@react-native-community/netinfo';




export default function HomeSesion (props) {

  const ultimoAmbiente = () => {
    AsyncStorage.getItem('ambiente').then((ambiente) => {
      for (let i = 0; i < dataAmbientes.length; i++) {
        if (parseInt(ambiente) === parseInt(dataAmbientes[i].ambienteId)) {
          props.navigation.navigate(
            dataAmbientes[parseInt(dataAmbientes[i].ambienteId) - 1]
              .screenAmbiente,
          );
          break;
        } else {
          props.navigation.navigate('Ambientes');
        }
      }
    });
  };

  useEffect(() => {
    props.navigation.addListener('beforeRemove', (e) => {
        e.preventDefault();
        BackHandler.exitApp();
    });
  }, [props.navigation]);

  useEffect(() => {
    // Lock to portrait orientation
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    
    // Cleanup function to restore default orientation when component unmounts
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);


// codigo temporal para mostrar componentes --------------------------------------------------------------------
// const [calificacion1Test, setCalificacion1Test] = React.useState(0);
//   const [calificacion2Test, setCalificacion2Test] = React.useState(0);
//   const [calificacion3Test, setCalificacion3Test] = React.useState(0);
//   const [calificacion4Test, setCalificacion4Test] = React.useState(0);
//   const [calificacion5Test, setCalificacion5Test] = React.useState(0);

//   const [isEnabledSMS, setIsEnabledSMS] = React.useState(false);
//   const toggleSwitchSMS = () => setIsEnabledSMS((previousState) => !previousState);

//   const [isEnabledPush, setIsEnabledPush] = React.useState(false);
//   const toggleSwitchPush = () => setIsEnabledPush((previousState) => !previousState);

//   let cerrarSesion = () => {
//     console.log('cerrarSesion')
//     props.navigation.navigate('Home')
//     AsyncStorage.getAllKeys()
//         .then(keys => AsyncStorage.multiRemove(keys))
//         .then(() => RNRestart.Restart())
//         .catch(err=>console.log('error deleting AsyncSt',err))
//   };

  
  return (
    <SafeAreaWrapper backgroundColor="#2d71b0">
      <View style={styles.container}>

        {/* BACKGROUND */}
        <View>
          <LinearGradient
            style={styles.background1}
            colors={['#2d71b0', '#20397e']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}></LinearGradient>

          <View style={styles.background2}></View>
        </View>

        {/* CAROUSEL */}
        <View
          style={{
            position: 'absolute',
            // marginTop: '30%',
            marginTop: hp('17%'),
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <View style={styles.carousel}>
            <CarouselHomeSesion navigation={props.navigation} />
          </View>
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
            <PerfilHeader
              navigation={props.navigation}
              perfilStyle={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: wp('12%'),
              }}
              textStyle={{alignItems: 'flex-end', marginRight: wp('2%')}}
              avatarSize={wp('15%')}
              isEnabled={true}
            />
          </View>
        </View>

        {/* SCROLLVIEW */}

        <ScrollView
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            // marginTop: '55%',
            marginTop: wp('55%'),
          }}>
          {/* LINEA HORIZONTAL Y TÍTULO */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // marginTop: '2%',
              marginTop: hp('2%'),
            }}>
            <View style={styles.horizontalLine} />
          </View>
          <View style={{marginTop: hp('1%'), marginBottom: hp('1%')}}>
            <Text style={styles.novedadesText}>Novedades</Text>
          </View>

          {/* BOTONES NOVEDADES */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity 
              // onPress={() => props.navigation.navigate('Temas')}
            >
              <View
                style={{
                  // height: 190,
                  height: wp('54%'),
                  // width: 105,
                  width: wp('31%'),
                  // paddingHorizontal: '1%',
                  paddingHorizontal: wp('1%'),
                }}>
                <ImageBackground
                  style={styles.imageNovedades}
                  source={data[0].imgPath}>
                  <TouchableOpacity
                    style={{
                      // marginTop: wp'130%',
                      marginTop: wp('35%'),
                      // marginBottom: '10%',
                      // paddingVertical: '5%',
                      paddingVertical: wp('3%'),
                      // marginHorizontal: '1%',
                      marginHorizontal: wp('1%'),
                      // paddingHorizontal: '15%',
                      paddingHorizontal: wp('2%'),
                    }}
                    // onPress={() => props.navigation.navigate('Temas')}
                  >
                    <Text
                      style={{
                        color: '#7D7D7D',
                        fontFamily: 'Roboto-Regular',
                        textAlign: 'center',
                        fontSize: wp('4%'),
                      }}>
                      {data[0].text}
                    </Text>
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate('Noticias')}
            >
              <View
                style={{
                  // height: 190,
                  height: wp('54%'),
                  // width: 105,
                  width: wp('31%'),
                  // paddingHorizontal: '1%',
                  paddingHorizontal: wp('1%'),
                }}>
                <ImageBackground
                  style={styles.imageNovedades}
                  source={data[1].imgPath}>
                  <TouchableOpacity
                    style={{
                      // marginTop: wp'130%',
                      marginTop: wp('35%'),
                      // marginBottom: '10%',
                      // paddingVertical: '5%',
                      paddingVertical: wp('3%'),
                      // marginHorizontal: '1%',
                      marginHorizontal: wp('1%'),
                      // paddingHorizontal: '15%',
                      paddingHorizontal: wp('2%'),
                    }}
                    // onPress={() => props.navigation.navigate('Noticias')}
                  >
                    <Text
                      style={{
                        color: '#7D7D7D',
                        fontFamily: 'Roboto-Regular',
                        textAlign: 'center',
                        fontSize: wp('4%'),
                      }}>
                      {data[1].text}
                    </Text>
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              // onPress={() => props.navigation.navigate('Empresa')}
            >
              <View
                style={{
                  // height: 190,
                  height: wp('54%'),
                  // width: 105,
                  width: wp('31%'),
                  // paddingHorizontal: '1%',
                  paddingHorizontal: wp('1%'),
                }}>
                <ImageBackground
                  style={styles.imageNovedades}
                  source={data[2].imgPath}>
                  <TouchableOpacity
                    style={{
                      // marginTop: wp'130%',
                      marginTop: wp('35%'),
                      // marginBottom: '10%',
                      // paddingVertical: '5%',
                      paddingVertical: wp('3%'),
                      // marginHorizontal: '1%',
                      marginHorizontal: wp('1%'),
                      // paddingHorizontal: '15%',
                      paddingHorizontal: wp('2%'),
                    }}
                    // onPress={() => props.navigation.navigate('Empresa')}
                  >
                    <Text
                      style={{
                        color: '#7D7D7D',
                        fontFamily: 'Roboto-Regular',
                        textAlign: 'center',
                        fontSize: wp('3.5%'),
                      }}>
                      {data[2].text}
                    </Text>
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          </View>
          
          {/* <View style={styles.subtitulo}>
            <Text style={styles.subtituloText}>Progreso de Ambientes</Text>
          </View>
          <View>
                <CarouselCalificacion
                  navigation={props.navigation}
                  calificacion1Test={calificacion1Test}
                  calificacion2Test={calificacion2Test}
                  calificacion3Test={calificacion3Test}
                  calificacion4Test={calificacion4Test}
                  calificacion5Test={calificacion5Test}
                  setCalificacion1Test={setCalificacion1Test}
                  setCalificacion2Test={setCalificacion2Test}
                  setCalificacion3Test={setCalificacion3Test}
                  setCalificacion4Test={setCalificacion4Test}
                  setCalificacion5Test={setCalificacion5Test}
                />
              </View>
          <View style={{marginTop: hp('1%')}}>
            <Text style={styles.subtituloText}>Último test presentado</Text>
          </View>
          <View>
            <CarouselProgreso
              navigation={props.navigation}
            />
          </View>
          <View style={{marginTop: hp('5%'), marginHorizontal: wp('5%')}}>
            <SwitchButton
              text="SMS"
              isEnabled={isEnabledSMS}
              toggleSwitch={toggleSwitchSMS}
            /> */}
            {/* <SwitchButton
              text="Notificaciones Push"
              isEnabled={isEnabledPush}
              toggleSwitch={toggleSwitchPush}
            />
          </View>
          <View style={{marginBottom: hp('5%'), marginHorizontal: wp('5%')}}>

            <UltimosTemasItem
              key={1}
              imagenTemaPath={"https://media.istockphoto.com/id/1214352851/es/vector/cayendo-granos-de-caf%C3%A9-realistas-aislados-sobre-fondo-transparente-volar-desenfocando-granos.jpg?s=1024x1024&w=is&k=20&c=SNDtTe6rGFrsv6xXkXK-Z7ZXeAlWOeBG9pgc7EMdbfU="}
              tituloTema={"Titulo de la novedad"}
              navigation={props.navigation}
              contenidoTema={"Contenido de la novedad"}
              testDeshabilitado={true}
              tituloPantalla="Conoce nuestra empresa"
            />
          </View>

          <View style={{marginBottom: hp('5%')}}>
            <Fondo navigation={props.navigation} />
          </View> */}
          {/* <View style={{marginBottom: hp('5%')}}>
            <Fondo2 navigation={props.navigation} />
          </View> */}

          {/* <Text onPress={() => cerrarSesion()}>Cerrar sesión</Text>
          <Text onPress={() => props.navigation.navigate('Prueba')}>Pruebas</Text> */}




          {/* BOTON CONTINUAR TEMAS */}
          <TouchableOpacity onPress={() => ultimoAmbiente()}>
            <View
              style={{
                // marginHorizontal: '2%',
                marginHorizontal: wp('2%'),
                // width: 320,
                width: wp('90%'),
                // height: 80,
                height: wp('18.5%'),
                // marginTop: '10%',
                marginTop: hp('6%'),
                marginBottom: hp('20%'),
                alignSelf: 'center',
              }}>
              <ImageBackground
                style={styles.imageContinuar}
                source={require('../../assets/continuar.png')}>
                <Text
                  style={{
                    color: '#ffffff',
                    fontFamily: 'Oxygen-Bold',
                    // marginTop: '2%',
                    marginTop: hp('0.3%'),
                    // marginLeft: '20%',
                    marginLeft: wp('17%'),
                    // fontSize: 16,
                    fontSize: wp('3.7%'),
                  }}>
                  Continúa donde lo dejaste
                </Text>

                <Text
                  style={{
                    color: '#ffffff',
                    fontFamily: 'Oxygen-Regular',
                    // marginLeft: '20%',
                    marginLeft: wp('17%'),
                    // fontSize: 12,
                    fontSize: wp('3%'),
                    width: '55%',
                  }}>
                  Toca aquí para continuar desarrollando el contenido.
                </Text>

                <TouchableOpacity
                  style={{
                    // marginTop: '0.5%',
                    marginTop: hp('0.2%'),
                    // marginLeft: '20%',
                    marginLeft: wp('18%'),
                    alignSelf: 'flex-start',
                    backgroundColor: '#fff',
                    // padding: 3,
                    padding: wp('1%'),
                    paddingVertical: hp('0.2%'),
                    borderRadius: 25,
                    // marginBottom: '5%',
                  }}
                  onPress={() => ultimoAmbiente()}>
                  <Text
                    style={{
                      color: '#00983a',
                      // fontSize: 10,
                      fontSize: wp('2.8%'),
                      // marginHorizontal: 5,
                      marginHorizontal: wp('1%'),
                      textAlign: 'center',
                      fontFamily: 'Oxygen-Bold',
                    }}>
                    Ver más
                  </Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>

          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
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
    // height: '78%',
    height: hp('80%'),
    backgroundColor: '#ffffff',
  },

  header: {
    position: 'absolute',
    // marginLeft: '5%',
    // marginTop: '8%',
    marginTop:hp('4%'),
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logo: {
    flex: 1,
    resizeMode: 'contain',
  },

  carousel: {
    // width: '100%',
    width: wp('100%'),
    // height: '15%',
    height: hp('19%'),
    flex: 1,
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  horizontalLine: {
    flex: 1,
    // height: 5,
    height: hp('1%'),
    backgroundColor: '#20397e',
    // marginLeft: '6%',
    marginLeft: wp('6%'),
    // marginRight: '83%',
    marginRight: wp('85%'),
  },

  novedadesText: {
    fontFamily: 'Roboto-Light',
    // fontSize: 20,
    fontSize: wp('5%'),
    color: '#00983a',
    // marginLeft: '5%',
    marginLeft: wp('6%'),
  },

  imageContinuar: {
    // height: '85%',
    flex: 1,
    resizeMode: 'contain',
    // margin:2,
  },

  imageNovedades: {
    // width: '102%',
    flex: 1,
    resizeMode: 'contain',
  },

  subtituloText: {
    fontFamily: 'Roboto-Light',
    // fontSize: 20,
    fontSize: wp('6%'),
    color: '#00983a',
    // marginLeft: '5%',
    marginLeft: wp('6%'),
  },

  subtitulo: {
    // position: 'absolute',
    // marginTop: '55%',
    marginTop: hp('1%'),
    // flexDirection: 'row',
  },
});
