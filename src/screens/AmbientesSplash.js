import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { LinearGradient } from 'expo-linear-gradient';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { getGuardarPasoUsuario, medallaQuintoAmbiente } from '../../api/api';
import data from '../../data/dataAmbientes';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import Triangle from '../components/Triangle';

export default function AmbientesSplash(props) {
  const [ambiente, setAmbiente] = useState(null);
  console.log('AmbientesSplash')
  React.useEffect(() => {
    AsyncStorage.getItem('ambiente').then((value) => {
      setAmbiente(value);
    });
    AsyncStorage.getItem('token').then((token) => { 
      NetInfo.fetch().then((state) => {
        if (state.isConnected == true) {
          getGuardarPasoUsuario(
            token,
            parseInt(props.route.params.ambiente),
          ).then((response) => {
            if (response == 'error de conexion') {
              conexion();
            } else {
              console.log(response);
            }
          });
        } else {
          conexion();
        }
      });
    });
  }, []);

  if (props.route.params.ambiente == 5) {
    medallaQuintoAmbiente(this.token).then((response) => {
      console.log(response);
    });
  }

  useEffect(() => {
    // Lock to landscape orientation
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    
    // Cleanup function to restore default orientation when component unmounts
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
    <SafeAreaWrapper backgroundColor='#f5f5f0'>
      <ImageBackground
        style={styles.bg}
        source={require('../../assets/fondoAgriSplash.png')}>
        
        <View
          style={{
            flexDirection: 'row',
            height: '90%',
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={styles.img}
              source={require('../../assets/tobiasAgriSplash.png')}
            />
          </View>

          <View style={{flexDirection: 'row', flex: 1}}>
            <Triangle
              width={wp('5%')}
              height={wp('5%')}
              color={'#f5f5f0'}
              direction={'left'}
              style={{marginTop: hp('6%')}}
            />
            <View>
              <View
                style={{
                  backgroundColor: '#f5f5f0',
                  borderRadius: 20,
                  padding: wp('4%'),
                  width: wp('80%'),
                  marginTop: hp('2%'),
                  maxHeight: wp('58%'),
                }}>
                <ScrollView persistentScrollbar={true}>
                  <Text style={styles.text}>
                    ¡Hola mi nombre es Tobías, soy agricultor y te doy la
                    bienvenida!
                  </Text>
                  <Text style={styles.text}>
                    A continuación, encontrarás un entorno con diferentes
                    situaciones, selecciona en cada una de ellas para ampliar tu
                    conocimiento en Buenas Prácticas Agrícolas.
                  </Text>
                </ScrollView>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('MyDrawer')}>
                  <LinearGradient
                    style={styles.button}
                    colors={['#1ad17c', '#099941']}
                    end={{x: 0.5, y: 0.3}}>
                    <Text style={styles.buttonText}>Regresar</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>{
                    props.navigation.navigate(
                      data[parseInt(ambiente) - 1]?.screenSplashAmbiente,
                      {ambiente: parseInt(ambiente)},
                    )}
                  }>
                  <LinearGradient
                    style={styles.button}
                    colors={['#1ad17c', '#099941']}
                    end={{x: 0.5, y: 0.3}}>
                    <Text style={styles.buttonText}>Continuar</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  bg: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    flex: 1,
    resizeMode: 'contain',
    marginTop: hp('5%'),
  },
  text: {
    color: '#00983a',
    fontSize: wp('5%'),
    fontFamily: 'Roboto-Regular',
  },

  button: {
    padding: wp('3%'),
    borderRadius: 50,
    marginHorizontal: wp('1%'),
    marginVertical: hp('3%'),
  },

  buttonText: {
    fontSize: wp('5%'),
    fontFamily: 'Roboto-Regular',
    color: '#f5f5f0',
    marginHorizontal: wp('5%'),
  },
});
