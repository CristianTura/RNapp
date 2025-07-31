import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { withTiming } from 'react-native-reanimated';
import {
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import { getConsultarUsuario } from '../../api/api';
import CustomAvatar from './CustomAvatar';

export default function PerfilHeader(props) {
  const [usuario, setUsuario] = useState(null);
  const [nombre, setNombre] = useState(null);
  const [foto, setFoto] = useState(null);

  
  useEffect(() => {
     AsyncStorage.getItem('token').then((token) => {
       NetInfo.fetch().then((state) => {
         if (state.isConnected == true) {
           if (token != 'null') {
             getConsultarUsuario(token).then((response) => {
               setNombre(response.cultivos[0].usuario.split(' ')[0]);
               if (response.foto) {
                 setFoto(response.foto.slice(1).slice(0, -1));
               }
             });
           } else {
             setNombre('');
           }
         } else {
           conexion();
         }
       });
     });
  }, [props]);

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

  const abrirBottomSheet = () => {
    props.sheetRef.current?.snapToIndex(1); 
    props.sheetRef.current?.present();
    props.opacity.value = withTiming(0.1, { duration: 300 });
  }

  return (
    <View style={props.perfilStyle}>
      <View style={props.textStyle}>
        <Text
          style={{
            color: props.textColor ? props.textColor : '#f5f5f0',
            fontFamily: 'Oxygen-Regular',
            fontSize: props.textSize ? props.textSize : wp('4.5%'),
          }}>
          {props.ocultarSaludo ? null : 'Hola'}
        </Text>
        <Text
          style={{
            color: props.textColor ? props.textColor : '#f5f5f0',
            fontFamily: 'Oxygen-Bold',
            fontSize: props.textSize ? props.textSize : wp('4.5%'),
          }}>
          {nombre}
        </Text>
      </View>
      <View style={props.avatarStyle}>
        <CustomAvatar
          size={props.avatarSize ? props.avatarSize : 50}
          source={{
            uri: props.imgTempPath
              ? props.imgTempPath
              : foto
              ? foto
              : 'https://tiobiasapp.s3.us-east-2.amazonaws.com/aniapp/assets/perfil-aleatorio.png',
          }}
          onPress={() =>
            props.isEnabled
              ? props.navigation.navigate('MyDrawer', {
                  screen: 'Menú Principal',
                  params: {screen: 'PerfilTab', params: {screen: 'EditarPerfil'}},
                })
              : props.disabled
              ? null
              : abrirBottomSheet()
          }
          activeOpacity={props.isEnabled ? 0.5 : 1}
          containerStyle={{
            backgroundColor: '#a9a9a9',
            borderColor: '#FFA500',
            borderWidth: 2,
          }}
          disabled={props.disabled}
        />
      </View>
    </View>
  );
}
