import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
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
import { getNovedades, medallaContenidos } from '../../api/api';
import UltimosTemasItem from '../components/UltimosTemasItem';


export default function UltimosTemas({navigation}) {
  const [novedades, setNovedades] = useState([]);

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

  useEffect(() => {
    NetInfo.fetch().then((state) => {
      AsyncStorage.getItem('token').then((token) => {
        if (state.isConnected == true) {
          medallaContenidos(token).then((response) => {
            console.log(response);
          });
          getNovedades().then((result) => {
            if (result == 'error de conexion') {
              conexion();
            } else {
              setNovedades(result);
            }
          });
        } else {
          conexion();
        }
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <LinearGradient
          style={styles.background1}
          colors={['#2d71b0', '#20397e']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}></LinearGradient>

        <View style={styles.background2}></View>
      </View>

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
              // fontSize: 18,
              fontSize: wp('4.5%'),
              color: '#f5f5f0',
              paddingLeft: wp('16%'),
            }}>
            Novedades
          </Text>
        </View>
      </View>

      <View style={styles.menu}>
        <View>
          <TouchableOpacity
          // onPress={() => navigation.navigate(this)}
          >
            <View style={styles.iconoContainer}>
              <Image
                source={require('../../assets/u-temas-icono.png')}
                style={styles.icono}
              />
            </View>

            <LinearGradient
              style={styles.buttonActive}
              colors={['#00c96c', '#00983a']}
              start={{x: 0.5, y: 0.1}}
              end={{x: 0.5, y: 1}}
              locations={[0, 0.9]}>
              <Text style={styles.iconoTexto}>Actualidad</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Noticias')}>
            <View style={styles.iconoContainer}>
              <Image
                source={require('../../assets/noticias-icono.png')}
                style={styles.icono}
              />
            </View>

            <View style={styles.buttonInactive}>
              <Text style={styles.iconoTextoInactive}>Noticias de Interés</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Empresa')}>
            <View style={styles.iconoContainer}>
              <Image
                source={require('../../assets/conoce-empresa-icono.png')}
                style={styles.icono}
              />
            </View>

            <View style={styles.buttonInactive}>
              <Text style={styles.iconoTextoInactive}>
                Nosotros
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* RENDERIZACIÓN DE ÚLTIMOS TEMAS DENTRO DE SCROLLVIEW */}

      <ScrollView
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          // marginTop: '55%',
          marginTop: wp('63%'),
        }}
        contentContainerStyle={{
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            // marginTop: '2%',
            marginTop: hp('2%'),
          }}>
          <View style={styles.horizontalLine} />
        </View>
        <View
          style={{
            marginTop: hp('1%'),
            marginBottom: hp('1%'),
            alignSelf: 'flex-start',
          }}>
          <Text style={styles.titulo}>Últimos Temas</Text>
        </View>

        {/* RENDERIZACIÓN DE CADA UNO DE LOS TEMAS / COMPONENTES */}
        <View style={{marginBottom: hp('20%')}}>
          {novedades.map((item, index) => {
            if (item.tipo == 'NOVEDAD') {
              return (
                <UltimosTemasItem
                  key={index}
                  imagenTemaPath={item.imagen}
                  tituloTema={item.titulo}
                  navigation={navigation}
                  contenidoTema={item.contenido}
                  testDeshabilitado={true}
                  tituloPantalla="Últimos Temas"
                />
              );
            }
          })}

          {/* <UltimosTemasItem
            imagenTemaPath={imagenTemaPath2}
            tituloTema={tituloTema2}
            contenidoTema={contenidoTema2}
            navigation={navigation}
          /> */}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#20397e',
  },
  background1: {
    // width: '100%',
    width: wp('100%'),
    // height: '23%',
    height: hp('25%'),
    opacity: 1,
  },
  background2: {
    // height: '80%',
    height: hp('75%'),
    backgroundColor: '#ffffff',
  },

  header: {
    position: 'absolute',
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

  menu: {
    position: 'absolute',
    flexDirection: 'row',
  },

  buttonActive: {
    borderColor: '#e5e5e5',
    borderWidth: wp('0.5%'),
    borderRadius: 20,
    height: wp('20%'),
    width: wp('30%'),
    justifyContent: 'flex-end',
    marginTop: hp('20%'),
    alignItems: 'center',
    marginHorizontal: wp('1.2%'),
  },

  buttonInactive: {
    backgroundColor: '#f0f0f0',
    borderColor: '#e5e5e5',
    borderWidth: wp('0.5%'),
    borderRadius: 20,
    height: wp('20%'),
    width: wp('30%'),
    justifyContent: 'flex-end',
    marginTop: hp('20%'),
    alignItems: 'center',
    marginHorizontal: wp('1.2%'),
  },

  icono: {
    margin: wp('4%'),
    flex: 1,
    resizeMode: 'contain',
  },

  iconoContainer: {
    backgroundColor: '#00983a',
    borderColor: '#f5f5f0',
    // borderWidth: 2,
    borderWidth: wp('0.3%'),
    marginTop: hp('16%'),
    elevation: 20,
    zIndex:1,
    shadowColor: '#bac5b9',
    shadowOpacity: 0.4,
    shadowOffset: {width: 0, height: 10},
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 90,
    height: wp('15%'),
    width: wp('15%'),
  },

  iconoTexto: {
    color: '#f5f5f0',
    fontFamily: 'Roboto-Regular',
    fontSize: wp('3.4%'),
    marginHorizontal: wp('2%'),
    paddingVertical: hp('1.5%'),
    textAlign: 'center',
  },

  iconoTextoInactive: {
    color: '#7c7d7d',
    fontFamily: 'Roboto-Regular',
    fontSize: wp('3.4%'),
    marginHorizontal: wp('2%'),
    paddingVertical: hp('1.5%'),
    textAlign: 'center',
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

  titulo: {
    fontFamily: 'Roboto-Light',
    // fontSize: 20,
    fontSize: wp('5%'),
    color: '#00983a',
    // marginLeft: '5%',
    marginLeft: wp('6%'),
  },
});
