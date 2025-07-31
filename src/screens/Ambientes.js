import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
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
import { getConsultarPasoUsuario } from '../../api/api';
import data from '../../data/dataAmbientes';
import SafeAreaWrapper from '../components/SafeAreaWrapper';

export default function Ambientes({navigation}) {
  const [background1, setBackground1] = React.useState('transparent');
  const [background2, setBackground2] = React.useState('transparent');
  const [background3, setBackground3] = React.useState('transparent');
  const [background4, setBackground4] = React.useState('transparent');
  const [background5, setBackground5] = React.useState('transparent');

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

  const verificarTutorialAmbiente = (nombrePantalla, ambiente,splashAmbiente) => {
     AsyncStorage.getItem('token').then((token) => {
      NetInfo.fetch().then((state) => {
        if (state.isConnected == true) {
          getConsultarPasoUsuario(token, parseInt(ambiente)).then(
            (response) => {
              if (response == 'error de conexion') {
                conexion();
              } else {
                if (response == 'true' || response==true) {
                  navigation.navigate(nombrePantalla,{ambiente:ambiente})
                } else {
                  navigation.navigate(splashAmbiente, {ambiente: ambiente});
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
  }

  useEffect(() => {
    // Lock to portrait orientation
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    
    // Cleanup function to restore default orientation when component unmounts
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
    <SafeAreaWrapper backgroundColor="#2d71b0">
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
              Temáticas
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
            <ImageBackground
              style={{
                flex: 1,
                marginBottom: hp('1.5%'),
              }}
              source={data[0].imgPath}>
              <TouchableOpacity
                onPress={() => {
                  guardarAmbiente(data[0].ambienteId);
                  verificarTutorialAmbiente(
                    data[0].screenAmbiente,
                    data[0].ambienteId,
                    data[0].screen,
                  );
                }}
                onPressIn={() => setBackground1('rgba(39, 182, 17, 0.84)')}
                onPressOut={() => setBackground1('transparent')}
                activeOpacity={0.3}
                style={{
                  backgroundColor: background1,
                  // width: 300,
                  width: wp('80%'),
                  // height: 90,
                  height: wp('24%'),
                  borderRadius: 24,
                }}></TouchableOpacity>
            </ImageBackground>

            <ImageBackground
              style={{
                flex: 1,
                // marginVertical: 10,
                marginVertical: hp('1.5%'),
              }}
              source={data[1].imgPath}>
              <TouchableOpacity
                onPress={() => {
                  guardarAmbiente(data[1].ambienteId);
                  verificarTutorialAmbiente(
                    data[1].screenAmbiente,
                    data[1].ambienteId,
                    data[1].screen,
                  );
                }}
                onPressIn={() => setBackground2('rgba(39, 182, 17, 0.84)')}
                onPressOut={() => setBackground2('transparent')}
                activeOpacity={0.3}
                style={{
                  backgroundColor: background2,
                  // width: 300,
                  width: wp('80%'),
                  // height: 90,
                  height: wp('24%'),
                  borderRadius: 24,
                }}></TouchableOpacity>
            </ImageBackground>

            <ImageBackground
              style={{
                flex: 1,
                // marginVertical: 10,
                marginVertical: hp('1.5%'),
              }}
              source={data[2].imgPath}>
              <TouchableOpacity
                onPress={() => {
                  guardarAmbiente(data[2].ambienteId);
                  verificarTutorialAmbiente(
                    data[2].screenAmbiente,
                    data[2].ambienteId,
                    data[2].screen,
                  );
                }}
                onPressIn={() => setBackground3('rgba(39, 182, 17, 0.84)')}
                onPressOut={() => setBackground3('transparent')}
                activeOpacity={0.3}
                style={{
                  backgroundColor: background3,
                  // width: 300,
                  width: wp('80%'),
                  // height: 90,
                  height: wp('24%'),
                  borderRadius: 24,
                }}></TouchableOpacity>
            </ImageBackground>

            <ImageBackground
              style={{
                flex: 1,
                // marginVertical: 10,
                marginVertical: hp('1.5%'),
              }}
              source={data[3].imgPath}>
              <TouchableOpacity
                onPress={() => {
                  guardarAmbiente(data[3].ambienteId);
                  verificarTutorialAmbiente(
                    data[3].screenAmbiente,
                    data[3].ambienteId,
                    data[3].screen,
                  );
                }}
                onPressIn={() => setBackground4('rgba(39, 182, 17, 0.84)')}
                onPressOut={() => setBackground4('transparent')}
                activeOpacity={0.3}
                style={{
                  backgroundColor: background4,
                  // width: 300,
                  width: wp('80%'),
                  // height: 90,
                  height: wp('24%'),
                  borderRadius: 24,
                }}></TouchableOpacity>
            </ImageBackground>

            <ImageBackground
              style={{
                flex: 1,
                // marginVertical: 10,
                marginVertical: hp('1.5%'),
                marginBottom: hp('20%'),
              }}
              source={data[4].imgPath}>
              <TouchableOpacity
                onPress={() => {
                  guardarAmbiente(data[4].ambienteId);
                  verificarTutorialAmbiente(
                    data[4].screenAmbiente,
                    data[4].ambienteId,
                    data[4].screen,
                  );
                }}
                onPressIn={() => setBackground5('rgba(39, 182, 17, 0.84)')}
                onPressOut={() => setBackground5('transparent')}
                activeOpacity={0.3}
                style={{
                  backgroundColor: background5,
                  // width: 300,
                  width: wp('80%'),
                  // height: 90,
                  height: wp('24%'),
                  borderRadius: 24,
                }}></TouchableOpacity>
            </ImageBackground>
          </View>
        </ScrollView>
      </View>
    </SafeAreaWrapper>
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
});
