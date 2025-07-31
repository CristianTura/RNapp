import NetInfo from '@react-native-community/netinfo';
import React, { useEffect } from 'react';
import {
  Alert,
  ScrollView,
  View
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import { getPolitica } from '../../api/api';
import Fondo from '../components/FondoVistasDrawer';
import SafeAreaWrapper from '../components/SafeAreaWrapper';

export default function Privacidad({navigation}) {
  const [politica, setPolitica] = React.useState(
    '<H1></H1>',
  );
  let conexion = () => {
    Alert.alert(
      'Error de conexión',
      'No tienes conexión a internet. Puede que algunas opciones no se carguen correctamente. Intenta más tarde.',
      [
        {
          text: 'Cerrar',
          // onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
    );
  };
  useEffect(() => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected == true) {
        getPolitica().then((response) => {
          if (response == 'error de conexion') {
            conexion();
          } else {
            setPolitica(response.cuerpo);
          }
        });
      } else {
        conexion();
      }
    });
  }, []);

  return (
    <SafeAreaWrapper backgroundColor='#f5f5f0'>
      <View style={{height: '100%', backgroundColor: '#fff'}}>
        <View>
          <Fondo navigation={navigation} />
        </View>

        <ScrollView
          style={{
            // marginHorizontal: '10%',
            marginHorizontal: wp('10%'),
            // marginTop: hp('20%'),
          }}>
          <RenderHtml
            source={{html: politica}}
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
                textAlign:'justify',
              },
              li:{
                fontSize: wp('5%'),
                textAlign:'justify',
              },
              ol:{
                fontSize: wp('5%'),
                textAlign:'justify',
              },
              a:{
                fontSize: wp('5%'),
                textAlign:'justify',
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
    </SafeAreaWrapper>
  );
}
