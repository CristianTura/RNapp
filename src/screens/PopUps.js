import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import { getTemarioById } from '../../api/api';
import Loading from '../screens/Loading';
import PopupTexto from './PopupTexto';
import PopupTextoImagen from './PopupTextoImagen';
import PopupTextoNavegacion from './PopupTextoNavegacion';

export default function PopUps({props}) {
  //hacer condicionales
  //pasar props

  const [popupSeleccionado, setPopupSeleccionado] = React.useState({});

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

  React.useEffect(() => {
    AsyncStorage.getItem('token').then((token) => {
      NetInfo.fetch().then((state) => {
        if (state.isConnected == true) {
          getTemarioById(token, props.popupId).then((response) => {            
            setPopupSeleccionado(response);
          });
        } else {
          conexion();
        }
      });
    });
  }, [props]);

  if (popupSeleccionado.tipo == 'SOLO_CONTENIDO') {
    return (
      <PopupTexto
        numeroPopup={props.numeroPopup}
        texto={popupSeleccionado.contenido}
        navigation={props.navigation}
        onClose={props.onClose}
      />
    );
  } else if (
    popupSeleccionado.tipo == 'IMAGEN_CONTENIDO_HORIZONTAL' ||
    popupSeleccionado.tipo == 'IMAGEN_CONTENIDO_VERTICAL' ||
    popupSeleccionado.tipo == 'SOLO_IMAGEN_VERTICAL' ||
    popupSeleccionado.tipo == 'SOLO_IMAGEN_HORIZONTAL'
  ) {
    return (
      <PopupTextoImagen
        texto={popupSeleccionado.contenido}
        imagen={popupSeleccionado.imagen}
        navigation={props.navigation}
        numeroPopup={props.numeroPopup}
        onClose={props.onClose}
      />
    );
  } else if (popupSeleccionado.tipo == 'NAVEGACION_ITEMS') {
    return (
      <PopupTextoNavegacion
        texto={popupSeleccionado.contenido}
        navigation={props.navigation}
        itemsNavegacion={popupSeleccionado.opciones}
        numeroPopup={props.numeroPopup}
        onClose={props.onClose}
      />
    );
  } else {
    return <Loading />;
  }
}

const styles = StyleSheet.create({});
