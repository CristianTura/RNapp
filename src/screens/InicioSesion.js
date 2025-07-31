import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import {
  Alert, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet,
  Text, TextInput, TouchableOpacity, View
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getAuth } from '../../api/api';
import SafeAreaWrapper from '../components/SafeAreaWrapper';

export default function InicioSesion(props) {
 
  const [phone, setPhone] = useState('');
  const [token, setToken] = useState(null);
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
  let iniciarSecion = () => {

    NetInfo.fetch().then((state) => {
      if (state.isConnected == true) {

        getAuth(phone).then((response) => {

          if (response == 'error de conexion') {
           
            conexion();
          } else if (response.hasOwnProperty('error')) {
          
            if (response.error == 'Usuario no existe') {
              Alert.alert(
                'Error de validación',
                'El usuario no esta registrado',
                [
                  {
                    text: 'Cancelar',
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                  },
                ],
              );
            }
          } else if (response.hasOwnProperty('token')) {
            setToken(response.token);
     
          }
        });
      } else {
        conexion();
      }
    });
  };

  useEffect(() => {
    if (token != null) {
      AsyncStorage.setItem('token', token);
      AsyncStorage.getItem('token').then((value) => {
        props.navigation.navigate('MyDrawer');
        // props.navigation.navigate('Home');
      });
    }
  }, [token]);

  const checkFormulario = () => {
    phone.length < 10
      ? Alert.alert(
          'Error en el formulario',
          'El teléfono debe contener 10 números',
          [
            {
              text: 'Cancelar',
              // onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'OK',
              // onPress: () => console.log('OK Pressed')
            },
          ],
        )
      : iniciarSecion();
    // : verificarWifi();
  };
                
  return (
    <SafeAreaWrapper backgroundColor="#ffffff">
      <KeyboardAvoidingView
        style={styles.background}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          // behavior='padding'
      >
        <ImageBackground
          style={styles.background}
          source={require('../../assets/fondoHS.png')}>
          
            <ScrollView
              style={{paddingHorizontal:wp('10%')}}
              contentContainerStyle={{alignItems: 'center', height: '120%'}}>
              {Platform.OS == 'ios' ? (
                <TouchableOpacity style={{alignSelf:'flex-start'}} onPress={() => props.navigation.navigate('Home')}>
                  <LinearGradient
                    colors={['#1ad17c', '#19ce79', '#099941']}
                    start={{x: 0.3, y: 0.5}}
                    end={{x: 1, y: 0.5}}
                    locations={[0, 0.7, 1]}
                    style={[styles.regresarButton,{alignSelf:'flex-start'}]}>
                    <Text style={styles.regresarText}>
                      <AntDesign name="left" size={wp('3%')} color="#f5f5f0" />{' '}
                      Regresar
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              ) : null}

              <LinearGradient
                style={styles.bienvenidosGradient}
                colors={['#1ad17c', '#19ce79', '#099941']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}>
                <Text style={styles.bienvenidos}>Hola! Bienvenido</Text>
              </LinearGradient>
              <View
                style={{
                  // height: wp('68%'),
                  // width:wp('60%'),
                  height: wp('65%'),
                  width: wp('55%'),
                  // marginBottom:           hp('10%'),
                }}>
                <ImageBackground
                  style={{
                    flex: 1,
                    resizeMode: 'center',
                    // alignSelf: 'center',
                    // paddingHorizontal: '30%',
                    // justifyContent: 'center',
                  }}
                  source={require('../../assets/tobias-iniciosesion.png')}
                />
              </View>

              <LinearGradient
                style={styles.buttonInput}
                colors={['#20397e', '#030b4b']}
                start={{x: 0.5, y: 0.3}}>
                <View
                  style={{
                    flexDirection: 'row',
                    // marginHorizontal: wp('3%'),
                    // marginTop: hp('2%'),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: wp('12%'),
                      height: hp('6%'),
                      alignContent: 'center',
                    }}>
                    <Image
                      style={{resizeMode: 'contain', flex: 1}}
                      source={require('../../assets/cellphone.png')}
                    />
                  </View>
                  <TextInput
                    style={styles.inputText}
                    maxLength={10}
                    placeholder="__ __ __ __ __ __ __ __ __ __"
                    placeholderTextColor="#fff"
                    keyboardType="number-pad"
                    returnKeyType='done'
                    onChangeText={(newPhone) =>
                      setPhone(newPhone.replace(/[^0-9]/g, ''))
                    }
                  />
                </View>
              </LinearGradient>
              <TouchableOpacity style={[styles.button,{marginBottom:wp('20%')}]} onPress={() => checkFormulario()}>
                <LinearGradient 
                  style={[styles.buttonGradient]}
                  colors={['#20397e', '#030b4b']}
                  start={{x: 0.5, y: 0.3}}>
                  <Text style={[styles.buttonText]}>Inicia sesión</Text>
                </LinearGradient>
              </TouchableOpacity>
            </ScrollView>
        </ImageBackground>
      </KeyboardAvoidingView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    resizeMode: 'contain',
    flex: 1,
  },

  bienvenidos: {
    fontFamily: 'Roboto-Bold',
    color: '#fff',
    // fontSize: 30,
    fontSize: wp('8%'),
    textAlign: 'center',
  },

  bienvenidosGradient: {
    height: '10%',
    // height: hp('10%'),
    width: '85%',
    // width: wp('80%'),
    alignContent: 'center',
    justifyContent: 'center',
    // marginTop: '10%',
    marginTop: hp('2%'),
    // marginBottom: '5%',
    marginBottom: Platform.OS == 'ios' ? hp('4%') : hp('7%'),
    borderRadius: 20,
    overflow: 'hidden',
  },

  button: {
    marginTop: '5%',
    marginBottom: '2%',
    borderRadius: wp('3%'),
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 1.0,
    elevation: 10,
    width: '100%',
    // height: '8%',
  },

  buttonGradient: {
    padding: wp('5%'),
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: wp('5%'),
    justifyContent: 'center',
  },

  buttonInput: {
    // width: '80%',
    width: wp('80%'),
    height: wp('15%'),
    // marginTop: '4%',
    marginTop: hp('4%'),
    // marginBottom:    hp('1%'),
    // padding: 4,
    // padding: wp('0.5%'),
    borderRadius: 15,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 1.0,
    elevation: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    // alignContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    marginHorizontal: wp('10%'),
    // fontSize: 17,
    fontSize: wp('5%'),
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    // margin: wp('1.5%'),
    // height: Platform.OS == 'ios' ? wp('3.2%') : null,
  },

  inputText: {
    // marginLeft: '1%',
    color: '#fff',
    // fontSize: 20,
    fontSize: wp('5%'),
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
  },

  regresarButton: {
    borderRadius: 25,
    // padding: 5,
    padding: wp('1%'),
    marginTop: hp('7%'),
    alignSelf: 'flex-start',
    // marginLeft:wp('3%'),
  },

  regresarText: {
    // marginHorizontal: 5,
    marginHorizontal: wp('2%'),
    color: '#f5f5f0',
    fontFamily: 'Roboto-Regular',
    fontSize: wp('3%'),
  },
});
