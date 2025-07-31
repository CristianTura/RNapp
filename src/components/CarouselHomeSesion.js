import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import React, { useRef } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import { getConsultarPasoUsuario } from '../../api/api';
import data from '../../data/dataAmbientes';

const width = Dimensions.get("window").width;

const CarouselHomeSesion = ({navigation}) => {
  const isCarousel = React.useRef(null);
  const [index, setIndex] = React.useState(0);

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });
  

  function CarouselHomeSesionItem({index, item}) {
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

    const verificarTutorialAmbiente = (
      nombrePantalla,
      ambiente,
      splashAmbiente,
    ) => {
      // console.log('nombrePantalla', nombrePantalla, splashAmbiente)
      AsyncStorage.getItem('token').then((token) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected == true) {

            getConsultarPasoUsuario(token, parseInt(ambiente)).then(
              (response) => {
                if (response == 'error de conexion') {
                  navigation.navigate(splashAmbiente, {ambiente: ambiente});
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
            navigation.navigate(splashAmbiente, {ambiente: ambiente});
            conexion();
          }
        });
      });
      // }, []);
    };

    const guardarAmbiente = async (ambienteId) => {
      console.log('ambienteId', ambienteId)
      try {
        await AsyncStorage.setItem('ambiente', ambienteId);
      } catch (e) {
        console.log('Failed to save the data to the storage');
      }
    };
    return (
      <View style={styles.container} key={index}>
        <ImageBackground style={styles.image} source={item.imgPath}>
          <TouchableOpacity
            style={styles.temaButton}
            onPress={() =>{
              guardarAmbiente(item.ambienteId);
              verificarTutorialAmbiente(
                item.screenAmbiente,
                item.ambienteId,
                item.screen,
              );
            }}
          >
            <Text style={styles.temaText}>Ver Tema</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }

  return (
    <View style={{flex: 1, resizeMode: 'contain'}}>


    <FlatList
      ref={isCarousel}
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={CarouselHomeSesionItem}
      keyExtractor={(_, i) => i.toString()}
      onViewableItemsChanged={onViewRef.current}
      viewabilityConfig={viewConfigRef.current}
      getItemLayout={(_, i) => ({
        length: width,
        offset: width * i,
        index: i,
      })}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('80%'),
    height: wp('22%'),
  },

  image: {
    flex: 1,
    resizeMode: 'contain',
  },

  temaButton: {
    marginTop: wp('12%'),
    marginLeft: wp('7%'),
    backgroundColor: '#00983a',
    padding: wp('1%'),
    borderRadius: 25,
    alignSelf: 'flex-start',
  },

  temaText: {
    fontFamily: 'Roboto-Regular',
    fontSize: wp('3%'),
    color: '#f5f5f0',
    paddingHorizontal: wp('5%'),
  },
});

export default CarouselHomeSesion;
