import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Fondo from '../components/FondoVistasDrawer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import NetInfo from '@react-native-community/netinfo';
import RenderHtml from 'react-native-render-html';
import {getTerminos} from '../../api/api';

export default function Privacidad({navigation}) {
  const [termino, setTermino] = React.useState(
    '<H1></h1>',
  );
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
      if (state.isConnected == true) {
        getTerminos().then((response) => {
          if (response == 'error de conexion') {
            conexion();
          } else {
            this.terminos = response.cuerpo;
            setTermino(response.cuerpo);
          }
        });
      } else {
        conexion();
      }
    });
  }, []);

  return (
    <View style={{backgroundColor: '#fff', height: '100%'}}>
      <View>
        <Fondo navigation={navigation} />
      </View>

      <ScrollView
        style={{
          marginHorizontal: wp('9%'),
          // marginTop: hp('20%')
        }}>
        <RenderHtml
          source={{html: termino}}
          tagsStyles={{
            p: {
              textAlign:'justify',
              fontSize: wp('5%'),
            },
            span: {
              textAlign:'justify',
              fontSize: wp('5%'),
            },
            ul:{
              fontSize: wp('5%'),
            },
            li:{
              fontSize: wp('5%'),
            },
            ol:{
              fontSize: wp('5%'),
            },
            strong:{
              fontSize: wp('5%'),
              textAlign:'justify',
            },
            em:{
              fontSize: wp('5%'),
              textAlign:'justify',
            },
            u:{
              fontSize: wp('5%'),
              textAlign:'justify',
            }
          }}
        />
      </ScrollView>
    </View>
  );
}
