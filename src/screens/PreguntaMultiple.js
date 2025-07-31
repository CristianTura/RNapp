import { LinearGradient } from 'expo-linear-gradient';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  AppState,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import BannerPreguntas from '../components/BannerPreguntas';
// import {CheckBox} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import CheckBox from '@react-native-community/checkbox';
import SimpleIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useAudio } from '../../utils/AudioContext';
import CustomCheckbox from '../components/CustomCheckbox';
import SafeAreaWrapper from '../components/SafeAreaWrapper';

// this.arrayRespuestasLocales = new Array();
// this.arrayRespuestasGlobales = Object;
// let contadorPrueba = 0;
export default function PreguntaMultiple(props) {
  const {
    orden,
    pregunta,
    setPregunta,
    tamaño,
    contenido,
    opciones,
    idPregunta,
    toggleCheckBox,
    idAmbiente,
    nombreAmbiente,
  } = props;
  const [arrayRespuestasLocales, setArrayRespuestasLocales] = useState([]); 
  const [arrayRespuestasGlobales, setArrayRespuestasGlobales] = useState({});
  const [toggleCheckBox1, setToggleCheckBox1] = React.useState(toggleCheckBox);
  const [preguntas, setPreguntas] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({});
  
  const { 
    isMuted, 
    loadForegroundSound, 
    playForegroundSound, 
    stopForegroundSound, 
    setForegroundVolume,
    toggleMute
  } = useAudio();
  
  let textoBoton = 'Siguiente pregunta';
  if (pregunta == tamaño - 1) {
    textoBoton = 'Verificar Respuestas';
  }
// console.log('preguntas PreguntaMultiple')
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    setPreguntas(opciones);
  }, [opciones])

  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground! FOREGROUNDDDDDD");
      } else {
        console.log('App is inactive INACTIVEEEEEE')
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      // console.log("AppState", appState.current);
    });

    return () => {
      if(subscription) subscription.remove();
    };
  }, []);

  // useEffect(() => {
    // Configurar sonido de primer plano
    // const setupForegroundSound = async () => {
    //   try {
    //     await loadForegroundSound(require('../../assets/audio/click.mp3'), false);
    //   } catch (error) {
    //     console.log('Error loading foreground sound:', error);
    //   }
    // };

    // setupForegroundSound();

    // Cleanup function
  //   return () => {
  //     stopForegroundSound();
  //   };
  // }, []);

  useEffect(() => {
    // if(isMuted || appState.current.match(/inactive|background/)){
    //   setForegroundVolume(0.0)
    // } else {
    //   setForegroundVolume(0.1)
    // }
    setArrayRespuestasLocales([]);
    setSelectedCheckboxes({});
    setToggleCheckBox1(toggleCheckBox);
  }, [props]);

  const respuesta = {
    id_pregunta: idPregunta,
    opciones: arrayRespuestasLocales,
    orden: orden
  };

  let seleccionarRespuesta = (item, index) => {
    // let auxToggleCheckBox1 = toggleCheckBox1.slice();
    // auxToggleCheckBox1.splice(index, 1, !auxToggleCheckBox1[index]);
    // setToggleCheckBox1(auxToggleCheckBox1);

    // let indice = -1;
    // for (var i = 0; i < arrayRespuestasLocales.length; i++) {
    //   if (arrayRespuestasLocales[i].id == item.id) {
    //     indice = i;
    //   }
    // }

    // if (indice == -1) {
    //   setArrayRespuestasLocales([...arrayRespuestasLocales, {id: item.id}]);
    // } else {
    //   setArrayRespuestasLocales(arrayRespuestasLocales.splice(indice, 1));
    // }   
    const idBuscado = item.id;
    const existe = arrayRespuestasLocales.some(obj => obj.id === idBuscado);

    if (existe) {
      setArrayRespuestasLocales(arrayRespuestasLocales.filter(obj => obj.id !== idBuscado));
    } else {
      setArrayRespuestasLocales([...arrayRespuestasLocales, { id: idBuscado }]);
    }
    setSelectedCheckboxes({...selectedCheckboxes, [item.id]: !selectedCheckboxes[item.id]});
  };
// console.log('arrayRespuestasLocales', arrayRespuestasLocales, selectedCheckboxes)
  let continuar = () => {
    if (respuesta.opciones.length > 0) {    
      AsyncStorage.getItem('respuestas').then((respuestaStorage) => {
        const arrayRespuestasGlobalesTemp = JSON.parse(respuestaStorage);
        arrayRespuestasGlobalesTemp.preguntasContestadas.push(respuesta);
        setArrayRespuestasGlobales(arrayRespuestasGlobalesTemp);
        AsyncStorage.setItem(
          'respuestas',
          JSON.stringify(arrayRespuestasGlobalesTemp),
        );
        continuarPregunta();     
      });
    } else if (respuesta.opciones.length <= 0) {
      Alert.alert(
        'Error de validación',
        'Por favor selecciona una respuesta para poder continuar',
        [
          {
            text: 'Cerrar',        
            style: 'cancel',
          },
        ],
      );
    }
  };

  let continuarPregunta = () => {    
    // console.log('continuarPregunta', pregunta, 'tamaño', tamaño)
      if (pregunta < tamaño) {
        let contador = pregunta + 1;
        setArrayRespuestasLocales([]);
        setSelectedCheckboxes({});
        setPregunta(contador);
      } else {
        setArrayRespuestasLocales([]);
        setSelectedCheckboxes({});
        setPregunta(5000);
      }  
  };

  useEffect(() => {
    // Lock to landscape orientation
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    
    // Cleanup function to restore default orientation when component unmounts
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
    <SafeAreaWrapper backgroundColor="#ffffff">
      <BannerPreguntas
        ambiente={nombreAmbiente}
        idAmbiente={idAmbiente}
        navigation={props.navigation}
      />

      <View style={{flexDirection: 'row'}}>
        <View style={{width: '70%'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: hp('3%'),
            }}>
            <View style={styles.horizontalLine} />
          </View>

          <View style={[styles.subtitulo,{flexDirection:'row',justifyContent:'space-between'}]}>
            <Text style={styles.subtituloText}>Test</Text>
            <TouchableOpacity
              onPress={() => {
                toggleMute();
              }}
              activeOpacity={0.3}
              style={{
                backgroundColor: '#fa4616',
                // padding: 3,
                padding: wp('3%'),
                borderWidth: 2,
                borderColor: '#f5f5f0',
                borderRadius: wp('10%'),
                justifyContent: 'center',
                alignContent: 'center',
                elevation: 7,
                zIndex: 7,
                shadowColor: '#d6d6d6d',
                shadowOpacity: 0.3,
                shadowColor: 'black',
                marginHorizontal: wp('2%'),
                position:'absolute',
                left:wp('110%')
              }}>
              <SimpleIcons
                name={isMuted ? 'volume-2' : 'volume-off'}
                size={wp('4.5%')}
                color="#f5f5f0"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.subtitulo}>
            <Text style={styles.enunciado}>
              Seleccione las respuestas correctas.
            </Text>
          </View>

          <ScrollView
            style={styles.recuadroPregunta}
            persistentScrollbar={true}>
            <Text style={styles.pregunta}>{contenido}</Text>

            {preguntas?.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.7}
                  onPress={() => seleccionarRespuesta(item, index)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 8,
                  }}
                >
                  {/* <CheckBox
                    value={selectedCheckboxes[item.id]}
                    onChange={() => seleccionarRespuesta(item, index)}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 8,
                      padding: 0,
                      margin: 0,
                      marginRight: 10,
                      borderColor: 'gray',
                    }}
                    tintColors={{ true: '#4CAF50', false: '#BDBDBD' }}
                  /> */}

                  <CustomCheckbox 
                    checked={selectedCheckboxes[item.id]} 
                    onPress={() => seleccionarRespuesta(item, index)}
                    size={24}
                    color="#4CAF50"
                    uncheckedColor="#BDBDBD"
                    borderRadius={4}
                  />

                  <Text style={styles.opcion}>
                    {item.cuerpo} {/* O el campo que quieras mostrar como label */}
                  </Text>
                </TouchableOpacity>

                // <CheckBox
                //   key={index}
                //   center={false}
                //   textStyle={styles.opcion}
                //   containerStyle={{
                //     padding: 0,
                //     margin: wp('0.5%'),
                //     backgroundColor: 'transparent',
                //     borderColor: 'transparent',
                //     marginBottom: hp('1.5%'),
                //   }}
                //   title={item.cuerpo}
                //   checkedIcon={
                //     <MaterialIcon
                //       name="checkbox-marked"
                //       size={wp('5%')}
                //       color="green"
                //     />
                //   }
                //   uncheckedIcon={
                //     <MaterialIcon
                //       name="checkbox-blank"
                //       size={wp('5%')}
                //       color="#e5e5e5"
                //     />
                //   }
                //   checked={toggleCheckBox1[index]}
                //   onPress={() => {
                //     seleccionarRespuesta(item, index);
                //   }}
                // />
              );
            })}
            <View style={{height: 20}} />
          </ScrollView>
        </View>

        <View style={{width: '30%'}}>
          <View
            style={{width: wp('41%'), height: wp('62%'), marginTop: hp('5%')}}>
            <ImageBackground
              style={{flex: 1, resizeMode: 'center'}}
              source={require('../../assets/tobias-preguntas.png')}
            />
            <LinearGradient
              style={styles.button}
              colors={['#20397e', '#030b4b']}
              start={{x: 0.5, y: 0.3}}>
              <TouchableOpacity onPress={() => continuar()}>
                <Text style={styles.buttonText}>{textoBoton}</Text>
              </TouchableOpacity>
            </LinearGradient>
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
  },

  button: {
    borderRadius: 10,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontFamily: 'Roboto-Regular',
    paddingVertical: hp('1.5%'),
  },

  recuadroPregunta: {
    backgroundColor: '#f5f5f0',
    borderRadius: 15,
    padding: wp('3%'),
    marginLeft: wp('6%'),
    marginRight: wp('1.5%'),
    marginBottom: hp('28%'),
    height: '52%',
  },

  pregunta: {
    fontFamily: 'Roboto-Bold',
    color: '#00983a',
    fontSize: wp('4.5%'),
  },

  opcion: {
    // width: '90%',
    flexShrink: 1,
    fontFamily: 'Roboto-Regular',
    color: '#6d6d6d',
    fontSize: wp('4.5%'),
    marginLeft: wp('2%'),
    fontWeight: 'normal',
  },
});
