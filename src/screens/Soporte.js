import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Linking,
  Platform,
  SafeAreaView,
} from 'react-native';
import Fondo from '../components/SoporteComp';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getConsultarUsuario} from '../../api/api';
import PerfilHeader from '../components/PerfilHeader';

export default function Soporte(props) {
  // const [token, setToken] = useState('null');
  const [nombre, setNombre] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('token').then((token) => {
      if (token != 'null') {
        getConsultarUsuario(token).then((response) => {
          setNombre(response.cultivos[0].usuario.split(' ')[0]);
        });
      } else {
        setNombre('');
      }
    });
  }, [props]);

  const dialCall = () => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${3182854542}';
    } else {
      phoneNumber = 'telprompt:${3182854542}';
    }

    Linking.openURL(phoneNumber);
  };

  return (
    // <SafeAreaView>
    <View
      style={{backgroundColor: '#fff', height: '100%', alignItems: 'center'}}>
      <View style={{position: 'absolute'}}>
        {/* <View style={{height: '100%',}}> */}
        <Fondo navigation={props.navigation} />
        {/* </View> */}
        <View
          style={{
            // marginTop: '40%',
            marginTop: hp('6%'),
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 10,
          }}>
          <PerfilHeader
            ocultarSaludo={false}
            perfilStyle={{flexDirection: 'column-reverse'}}
            avatarSize={wp('20%')}
            textColor="#00983a"
            textSize={wp('5%')}
            isEnabled={false}
            disabled={true}
            textStyle={{alignItems: 'center', marginVertical: hp('1.5%')}}
          />

          <View style={styles.horizontalLine} />
        </View>

        <View
          style={{
            // marginTop: '7%',
            // marginTop: hp('1%'),
            // marginHorizontal: '12%',
            paddingHorizontal: wp('12%'),
            elevation: 10,
            alignItems: 'center',
          }}>
          <Text style={styles.titulo}>Ayuda y Soporte Técnico</Text>
          <Text style={styles.texto}>
            ¡Comunícate con nosotros para ayudarte en lo que necesites!
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            // marginHorizontal: '23%',
            paddingHorizontal: wp('21%'),
            // marginTop: '10%',
            marginTop: hp('4%'),
            elevation: 10,
          }}>
          <TouchableOpacity onPress={dialCall}>
            <Image
              style={styles.image}
              source={require('../../assets/contacto.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Linking.openURL('https://wa.me/573182854542')}>
            <Image
              style={styles.image}
              source={require('../../assets/wpp.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>

    // {/* </SafeAreaView> */}
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontFamily: 'Roboto-Bold',
    // fontSize: 19,
    fontSize: wp('5.5%'),
    color: '#797979',
    // lineHeight: 40,
    lineHeight: hp('6%'),
  },

  texto: {
    fontFamily: 'Roboto-Regular',
    color: '#7c7d7d',
    // fontSize: 16,
    fontSize: wp('4.5%'),
  },

  image: {
    // height: 60,
    height: wp('18%'),
    // width: 60,
    width: wp('18%'),
    // marginHorizontal: '12%',
    marginHorizontal: wp('5%'),
  },

  horizontalLine: {
    // flex: 1,
    height: hp('0.3%'),
    backgroundColor: '#e6e6e6',
    width: wp('85%'),
    // width: '100%',
    // width: wp('60%'),
    // marginTop: '37%',
    // marginTop: hp('15%'),
  },
});
