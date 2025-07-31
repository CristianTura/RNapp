import * as ScreenOrientation from 'expo-screen-orientation';
import React from 'react';
import {
  BackHandler,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import BannerPreguntas from '../components/BannerPreguntas';

import { LinearGradient } from 'expo-linear-gradient';
import { Pressable } from 'react-native';
import data from '../../data/dataProgreso';

export default function RespuestasAgricultores(props) {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [modalVisible, setModalVisible] = useState(false);
  // const [retroCuerpo, setRetroCuerpo] = useState(true);
  // const [retroOpciones, setRetroOpciones] = useState([]);
  // const [tipoPregunta, setTipoPregunta] = useState();

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);
  // }, [isLoading]);

  // React.useEffect(() => {
  //   const backAction = async () => {
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  // }, [props]);

  React.useEffect(() => {
    const backAction = () => {
      props.navigation.navigate('Perfil');
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const imgRespuesta = [
    require('../../assets/mal.png'),
    require('../../assets/bien.png'),
  ];

  useEffect(() => {
    // Lock to landscape orientation
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    
    // Cleanup function to restore default orientation when component unmounts
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>

      <BannerPreguntas ambiente={props.nombreAmbiente} />
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        {/* <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {props.indexArrayPasos > 0 ? (
            <TouchableOpacity
              onPress={() =>
                props.setIndexArrayPasos(props.indexArrayPasos - 1)
              }>
              <FontAwesome
                name="chevron-left"
                size={wp('10%')}
                color="#20397e"
              />
            </TouchableOpacity>
          ) : null}
        </View> */}

        <View style={{width: '65%'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: hp('3%'),
            }}>
            <View style={styles.horizontalLine} />
          </View>

          <View style={styles.subtitulo}>
            <Text style={styles.subtituloText}>Respuestas</Text>
          </View>

          <View style={styles.subtitulo}>
            <Text style={styles.enunciado}>
              A continuación la calificación de los últimos tests
              presentados de la temática "{props.nombreAmbiente}
              ".
            </Text>
          </View>

          <ScrollView
            contentContainerStyle={{alignItems: 'center'}}
            persistentScrollbar={true}
            style={{
              height: '50%',
              width: '80%',
              // flexDirection: 'row',
              marginLeft: wp('6%'),
            }}>
            <View
              style={{
                height: '50%',
                width: '100%',
                flexDirection: 'row',
                padding: wp('1%'),
                flexWrap: 'wrap',
                alignItems: 'center',
              }}>
              {props.cuestionario.map(
                (respuesta, index) => {
                  return (
                    <Pressable key={index}>
                      <View style={{alignItems: 'center'}} key={index}>
                        <View
                          key={index}
                          style={{
                            width: wp('20%'),
                            height: wp('20%'),
                            padding: wp('2%'),
                            marginHorizontal: wp('1%'),
                          }}>
                          <ImageBackground
                            source={
                              respuesta.calificacion>=80
                                ? imgRespuesta[1]
                                : imgRespuesta[0]
                            }
                            style={{flex: 1, resizeMode: 'contain'}}
                          />
                        </View>
                        <Text style={styles.preguntaTexto}>
                          Pregunta {index + 1}
                        </Text>
                      </View>
                    </Pressable>
                  );
                },
              )}
            </View>
          </ScrollView>
        </View>

        <View
          style={{
            width: '20%',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: wp('30%'),
              height: wp('65%'),
              marginTop: hp('2%'),
            }}>
            <ImageBackground
              style={{
                flex: 1,
                resizeMode: 'contain',
                alignItems: 'center',
                justifyContent: 'flex-end',
                marginBottom: hp('1%'),
              }}
              source={data[0].imgPathCompleto}>
              <Text numberOfLines={1} style={styles.calificacion}>
                {props.calificacionTest} %
              </Text>
              <Text style={styles.nombreAmbiente}>{props.nombreAmbiente}</Text>
            </ImageBackground>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Perfil')}>
              <LinearGradient
                style={styles.button}
                colors={['#20397e', '#030b4b']}
                start={{x: 0.5, y: 0.3}}>
                <Text style={styles.buttonText}>Ir al perfil</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={{alignItems: 'center', justifyContent: 'center'}}>
          {props.indexArrayPasos == props.tamaño - 1 ? null : (
            <TouchableOpacity
              onPress={() =>
                props.setIndexArrayPasos(props.indexArrayPasos + 1)
              }>
              <FontAwesome
                name="chevron-right"
                size={wp('10%')}
                color="#20397e"
              />
            </TouchableOpacity>
          )}
        </View> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },

  horizontalLine: {
    flex: 1,
    height: hp('1%'),
    backgroundColor: '#20397e',
    marginLeft: wp('6%'),
    marginRight: '85%',
  },

  subtituloText: {
    fontFamily: 'Roboto-Light',
    fontSize: wp('6%'),
    color: '#00983a',
  },

  subtitulo: {
    marginLeft: wp('6%'),
    marginTop: hp('0.5%'),
  },

  enunciado: {
    fontFamily: 'Roboto-Regular',
    fontSize: wp('4.5%'),
    color: '#7c7d7d',
    paddingHorizontal: wp('1%'),
  },

  button: {
    // borderRadius: wp('1%'),
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    justifyContent: 'center',
    color: '#fff',
    fontSize: wp('3.5%'),
    fontFamily: 'Roboto-Regular',
    paddingVertical: wp('1%'),
  },

  calificacion: {
    color: '#fff',
    fontFamily: 'Roboto-Bold',
    fontSize: wp('9.5%'),
    textAlign: 'center',
    // marginTop: '98%',
  },

  nombreAmbiente: {
    color: '#fff',
    fontFamily: 'Roboto-Regular',
    // fontSize: 18,
    fontSize: wp('4%'),
    marginBottom: hp('2%'),
  },

  preguntaTexto: {
    fontFamily: 'Roboto-Regular',
    fontSize: wp('3%'),
    color: '#7c7d7d',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: hp('50%'),
    height: wp('60%'),
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: wp('2%'),
    padding: wp('1.5%'),
    elevation: 2,
    alignItems: 'center',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    width: hp('40%'),
  },
  textoVerde: {
    color: 'green',
    marginVertical: hp('1%'),
  },
  textoAzul: {
    color: 'red',
    marginTop: hp('1%'),
  },
});
