import { LinearGradient } from 'expo-linear-gradient';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect } from 'react';
import {
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
import CarouselCalificacion from '../components/CarouselCalificacion';
import CarouselProgreso from '../components/CarouselProgreso';
import PerfilHeader from '../components/PerfilHeader';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import Loading from '../screens/Loading';

export default function Perfil(props) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [calificacion1Test, setCalificacion1Test] = React.useState(0);
  const [calificacion2Test, setCalificacion2Test] = React.useState(0);
  const [calificacion3Test, setCalificacion3Test] = React.useState(0);
  const [calificacion4Test, setCalificacion4Test] = React.useState(0);
  const [calificacion5Test, setCalificacion5Test] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [isLoading]);

  useEffect(() => {
    // Lock to portrait orientation
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    
    // Cleanup function to restore default orientation when component unmounts
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <SafeAreaWrapper backgroundColor="#2d71b0">
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
                paddingLeft: wp('26%'),
              }}>
              Perfil
            </Text>
          </View>
        </View>

        {/* BANNER PERFIL */}

        <View
          style={{
            width: wp('95%'),
            height: wp('25%'),
            marginTop: hp('16%'),
            position: 'absolute',
          }}>
          <ImageBackground
            style={styles.imageBanner}
            source={require('../../assets/perfil.png')}>
            <PerfilHeader
              navigation={props.navigation}
              perfilStyle={{
                flexDirection: 'row-reverse',
                marginHorizontal: wp('6%'),
                // marginTop: '2%',
                marginTop: hp('1.9%'),
              }}
              textStyle={{marginLeft: wp('4%'), marginTop: hp('1%')}}
              avatarSize={wp('17%')}
              isEnabled={true}
            />
          </ImageBackground>
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // position: 'absolute',
              // marginTop: '128%',
              marginTop: hp('1%'),
            }}>
            <View style={styles.horizontalLine} />
          </View>

          <View style={styles.subtitulo}>
            <Text style={styles.subtituloText}>Progreso de Ambientes</Text>
          </View>
          {/* carrusel para progreso */}
          <View>
            <CarouselProgreso
              navigation={props.navigation}
              setIsLoading={setIsLoading}
            />
          </View>

          {/* FIN carrusel para progreso */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // position: 'absolute',
              // marginTop: '128%',
              marginTop: hp('1%'),
            }}>
            <View style={styles.horizontalLine} />
          </View>

          <View style={styles.subtitulo}>
            <Text style={styles.subtituloText}>Último test presentado</Text>
          </View>

          {/* carrusel para calificaciòn */}
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

          {/*  FIN carrusel para calificaciòn */}
          <View
            style={{
              // alignItems: 'center',
              // marginTop: '53%',
              marginTop: hp('4%'),
            }}>
            <View style={styles.horizontalLine} />
          </View>

          <View style={{marginTop: hp('1%')}}>
            <Text style={styles.subtituloText}> Medallas Obtenidas</Text>
          </View>

          <TouchableOpacity
            style={{
              marginHorizontal: wp('2%'),
              width: wp('90%'),
              height: wp('18.5%'),
              marginTop: hp('2%'),
              // marginBottom: hp('20%'),
              alignSelf: 'center',
            }}
            onPress={() => props.navigation.push('Medallas')}
          >
            <ImageBackground
              source={require('../../assets/continuar_medallas.png')}
              style={styles.bannerContinuar}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              marginHorizontal: wp('2%'),
              width: wp('90%'),
              height: wp('18.5%'),
              marginTop: hp('1%'),
              marginBottom: hp('20%'),
              alignSelf: 'center',
            }}
            onPress={() =>
              props.navigation.push('Certificados', {
                arrayCalificaciones: [
                  calificacion1Test,
                  calificacion2Test,
                  calificacion3Test,
                  calificacion4Test,
                  calificacion5Test,
                ],
              })
            }
          >
            <ImageBackground
              source={require('../../assets/certificados.png')}
              style={styles.bannerContinuar}
            />
          </TouchableOpacity>
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

  imageBanner: {
    flex: 1,
    resizeMode: 'contain',
    alignItems: 'flex-start',
    // justifyContent:'center',
  },

  bannerContinuar: {
    flex: 1,
    resizeMode: 'contain',
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

  verTodosButton: {
    borderRadius: 15,
    padding: 5,
    alignSelf: 'flex-start',
  },

  verTodosText: {
    marginHorizontal: 5,
    color: '#f5f5f0',
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
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

  containerProgreso: {
    width: wp('35%'),
    height: wp('60%'),
    marginHorizontal: wp('2%'),
  },

  imageProgreso: {
    // width: 115,
    // height: 200,
    // marginHorizontal: 12,
    flex: 1,
    resizeMode: 'contain',
  },
});
