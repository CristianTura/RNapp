import React from 'react';
import data from '../../data/dataProgreso';
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Text,
  ImageBackground,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  validarPasosTodosAmbientes,
  getConsultarPasoUsuario,
} from '../../api/api';
import NetInfo from '@react-native-community/netinfo';





const CarouselProgreso = ({navigation}) => {
  const [progreso1, setProgreso1] = React.useState(0);
  const [progreso2, setProgreso2] = React.useState(0);
  const [progreso3, setProgreso3] = React.useState(0);
  const [progreso4, setProgreso4] = React.useState(0);
  const [progreso5, setProgreso5] = React.useState(0); 

  
  

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

  const CarouselProgresoItem = ({item, index, isComplete, progreso}) => {   
    const guardarAmbiente = async () => {
      try {
        await AsyncStorage.setItem('ambiente', item.ambienteId);
      } catch (e) {
        console.log('Failed to save the data to the storage');
      }
    };

    const verificarTutorialAmbiente = (
      nombrePantalla,
      ambiente,
      splashAmbiente,
    ) => {
      AsyncStorage.getItem('token').then((token) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected == true) {
            getConsultarPasoUsuario(token, parseInt(ambiente)).then(
              (response) => {
                if (response == 'error de conexion') {
                  conexion();
                } else {
                  if (response == 'true' || response == true) {
                    navigation.navigate(nombrePantalla, {ambiente: ambiente});
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
    };


    return (
      <TouchableOpacity
        key={index}
        style={styles.container}
        onPress={() => {
          guardarAmbiente();
          verificarTutorialAmbiente(
            item.screenAmbiente,
            item.ambienteId,
            item.screen,
          );
        }}>
        <ImageBackground
          style={[styles.image, {flex: 1}]}
          source={progreso >= 100 ? item.imgPathCompleto : item.imgPath}>
          <Text
            style={{
              color: progreso >= 100 ? '#fff' : '#7E7E7E',
              fontFamily: 'Roboto-Bold',
              // fontSize: 35,
              fontSize: wp('10%'),
              marginTop: '98%',
              textAlign: 'center',
            }}>
            {progreso}%
          </Text>
          <Text
            style={{
              color: progreso >= 100 ? '#fff' : '#7E7E7E',
              fontFamily: 'Roboto-Bold',
              // fontSize: 18,
              fontSize: wp('4.5%'),
              textAlign: 'center',
            }}>
            {item.text}{' '}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  React.useEffect(() => {
     AsyncStorage.getItem('token').then((token) => {
       NetInfo.fetch().then((state) => {
         if (state.isConnected == true) {
           validarPasosTodosAmbientes(token).then((response) => {
             if (response == 'error de conexion') {
               conexion();
             } else {
               const pasosAmbiente1 = response.filter(
                 (obj) => obj.ambiente == 1,
               );
               var pasados = 0;

               for (let i = 0; i < pasosAmbiente1.length; i++) {
                 if (pasosAmbiente1[i].pasado == true) {
                   pasados++;
                   const porcentajeProgreso = Math.round(
                     (pasados / pasosAmbiente1.length) * 100,
                   );
                   setProgreso1(porcentajeProgreso);
                 }
               }


               const pasosAmbiente2 = response.filter(
                 (obj) => obj.ambiente == 2,
               );
               var pasados2 = 0;

               for (let i = 0; i < pasosAmbiente2.length; i++) {
                 if (pasosAmbiente2[i].pasado == true) {
                   pasados2++;
                   const porcentajeProgreso2 = Math.round(
                     (pasados2 / pasosAmbiente2.length) * 100,
                   );
                   setProgreso2(porcentajeProgreso2);
                 }
               }

               const pasosAmbiente3 = response.filter(
                 (obj) => obj.ambiente == 3,
               );
               var pasados3 = 0;

               for (let i = 0; i < pasosAmbiente3.length; i++) {
                 if (pasosAmbiente3[i].pasado == true) {
                   pasados3++;
                   const porcentajeProgreso3 = Math.round(
                     (pasados3 / pasosAmbiente3.length) * 100,
                   );
                   setProgreso3(porcentajeProgreso3);
                 }
               }

               const pasosAmbiente4 = response.filter(
                 (obj) => obj.ambiente == 4,
               );
               var pasados4 = 0;

               for (let i = 0; i < pasosAmbiente4.length; i++) {
                 if (pasosAmbiente4[i].pasado == true) {
                   pasados4++;
                   const porcentajeProgreso4 = Math.round(
                     (pasados4 / pasosAmbiente4.length) * 100,
                   );
                   setProgreso4(porcentajeProgreso4);
                 }
               }

               const pasosAmbiente5 = response.filter(
                 (obj) => obj.ambiente == 5,
               );
               var pasados5 = 0;

               for (let i = 0; i < pasosAmbiente5.length; i++) {
                 if (pasosAmbiente5[i].pasado == true) {
                   pasados5++;
                   const porcentajeProgreso5 = Math.round(
                     (pasados5 / pasosAmbiente5.length) * 100,
                   );
                   setProgreso5(porcentajeProgreso5);
                 }
               }
             }
           });
         } else {
           conexion();
         }
       });
     });
  }, []);

  return (
    <ScrollView
      // content container style se debe eliminar en el momento de que ingresen los nuevos ambientes
      // contentContainerStyle={{alignItems: 'center'}}
      style={{marginTop: hp('3%')}}
      horizontal={true}
      nestedScrollEnabled={true}>
      <CarouselProgresoItem item={data[0]} progreso={progreso1} />
      <CarouselProgresoItem item={data[1]} progreso={progreso2} />
      <CarouselProgresoItem item={data[2]} progreso={progreso3} />
      <CarouselProgresoItem item={data[3]} progreso={progreso4} />
      <CarouselProgresoItem item={data[4]} progreso={progreso5} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('35%'),
    height: wp('60%'),
    marginHorizontal:wp('2%'),
  },

  image: {
    // width: 115,
    // height: 200,
    // marginHorizontal: 12,
    flex:  1,
    resizeMode:  'contain',
  },
});

export default CarouselProgreso;
