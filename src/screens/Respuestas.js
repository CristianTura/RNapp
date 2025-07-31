import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect, useState } from 'react';
import {
  AppState,
  BackHandler,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import BannerPreguntas from '../components/BannerPreguntas';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import data from '../../data/dataProgreso';
import { useAudio } from '../../utils/AudioContext';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import Loading from '../screens/Loading';


const imgRespuesta = [
  require('../../assets/mal.png'),
  require('../../assets/bien.png'),
];

export default function Respuestas(props) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [retroCuerpo, setRetroCuerpo] = useState(true);
  const [retroOpciones, setRetroOpciones] = useState([])
  const [tipoPregunta, setTipoPregunta] = useState();
  const [selectedAmbiente, setSelectedAmbiente] = useState('');
  // const [correctas, setCorrectas] = useState(0);
  const [calificacion, setCalificacion] = useState(0);
  const [nombreAmbiente, setNombreAmbiente] = useState('');
  const [dataAmbiente, setDataAmbiente] = useState({});

  const { setBackgroundVolume, setForegroundVolume } = useAudio();

  const appState = React.useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = React.useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
        setBackgroundVolume(0);
        setForegroundVolume(0);
      } else {
        console.log('App is inactive')
        setBackgroundVolume(0);
        setForegroundVolume(0);
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      // console.log("AppState", appState.current);
    });

    return () => {
      if(subscription) subscription.remove();
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const backAction = async () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('ambiente').then((ambiente) => {
      const dataAmbiente = data.find(item => item.ambienteId === ambiente);
      setDataAmbiente(dataAmbiente);
      setSelectedAmbiente(dataAmbiente.ambienteId);
      setNombreAmbiente(dataAmbiente.nombreAmbiente);

      // for (let i = 0; i < data.length; i++) {
      //   if (parseInt(ambiente) === parseInt(data[i].ambienteId)) {
      //     setSelectedAmbiente(data[i].ambienteId);
      //     setNombreAmbiente(data[i].nombreAmbiente);
      //     break;
      //   }
      // }
    });
  }, []);


  useEffect(() => {
    let correctas = 0;
    for (let i = 0; i < props.route.params[0].array.length; i++) {
      if (props.route.params[0].array[i]) {
        correctas++;
      }
    }

    setCalificacion(Math.round(
      (correctas / props.route.params[0].array.length) * 100,
    ));
 
  },[]);

  let mostrarRetroalimentacion = (index) => {
    setRetroCuerpo(props.route.params[1][index].contenido)
    setRetroOpciones(props.route.params[1][index].opciones);
    setTipoPregunta(props.route.params[1][index].tipo)
    setModalVisible(true)
  }

  useEffect(() => {
    // Lock to landscape orientation
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    
    // Cleanup function to restore default orientation when component unmounts
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaWrapper backgroundColor="#ffffff">

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          supportedOrientations={[
            'landscape',
            'portrait',
            'landscape-left',
            'landscape-right',
          ]}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  alignSelf: 'flex-end',
                  marginTop: wp('3%'),
                  paddingRight: wp('5%'),
                }}
                onPress={() => setModalVisible(false)}>
                <MaterialIcons
                  name="close-circle"
                  color="red"
                  size={wp('7%')}
                />
              </TouchableOpacity>
              {tipoPregunta == 'EMPAREJAMIENTO' ? (
                <ScrollView persistentScrollbar={true}>
                  <Text style={styles.modalText}>{retroCuerpo}</Text>
                  {retroOpciones.map((item, index) => {
                    let foto = {uri: item.foto};
                    return (
                      <View key={index} style={{flex: 1, alignItems: 'center'}}>
                        <View style={{flex: 1}}>
                          <View
                            style={{
                              width: wp('15%'),
                              height: wp('15%'),
                              marginRight: hp('6%'),
                            }}>
                            <ImageBackground
                              source={foto}
                              style={{flex: 1, resizeMode: 'contain'}}
                            />
                          </View>
                        </View>

                        <View style={{flex: 1}}>
                          <View
                            style={{
                              flex: 1,
                              width: hp('40%'),
                              height: wp('10%'),
                              marginRight: hp('6%'),
                              alignItems: 'center',
                            }}>
                            <Text>{item.cuerpo}</Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </ScrollView>
              ) : (
                <ScrollView persistentScrollbar={true}>
                  <Text style={styles.modalText}>{retroCuerpo}</Text>
                  {retroOpciones.map((item, index) => {
                    return (
                      <Text
                        key={index}
                        style={
                          item.correcta ? styles.textoVerde : styles.textoAzul
                        }>
                        {item.correcta ? (
                          <MaterialIcons
                            name="check-bold"
                            size={15}
                            color="green"
                            style={{
                              marginRight: '10%',
                            }}
                          />
                        ) : (
                          <MaterialIcons
                            name="close-thick"
                            size={15}
                            color="red"
                            style={{
                              marginRight: '10%',
                            }}
                          />
                        )}
                        {item.cuerpo}
                      </Text>
                    );
                  })}
                </ScrollView>
              )}
            </View>
          </View>
        </Modal>
      </View>

      <BannerPreguntas ambiente={nombreAmbiente} />
    
      <View style={{flexDirection: 'row'}}>

        <View style={{width: '75%', height: wp('100%') }}>
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

          <View style={[styles.subtitulo]}>
            <Text style={[styles.enunciado]}>
              A continuación las respuestas y el progreso de la temática "
              {data[selectedAmbiente]?.text}". Da click en cada una de las
              preguntas para ver la retroalimentación.
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
              {props.route.params[0].array.map((respuesta, index) => {
                return (
                  <TouchableOpacity
                    style={{zIndex: 10}}
                    key={index}
                    onPress={() => {
                      mostrarRetroalimentacion(index);
                    }}>
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
                          source={respuesta ? imgRespuesta[1] : imgRespuesta[0]}
                          style={{flex: 1, resizeMode: 'contain'}}
                        />
                      </View>
                      <Text style={styles.preguntaTexto}>
                        Pregunta {index + 1}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>

        <View style={{width: '25%'}}>
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
              source={dataAmbiente.imgPathCompleto}>
              <Text numberOfLines={1} style={styles.calificacion}>
                {calificacion} %
              </Text>
              <Text style={styles.nombreAmbiente}>
                {dataAmbiente?.text}
              </Text>
            </ImageBackground>
            <TouchableOpacity
              onPress={() =>{
                setForegroundVolume(0.0)
                props.navigation.push(dataAmbiente.screenAmbiente)
              }}>
              <LinearGradient
                style={styles.button}
                colors={['#20397e', '#030b4b']}
                start={{x: 0.5, y: 0.3}}>
                <Text style={styles.buttonText}>Ir a temática</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaWrapper>
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
    backgroundColor: '#fff',
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
    marginBottom: hp('2%'),
    // textAlign: 'center',
    // width: hp('40%'),
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
