import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  AppState,
  ImageBackground,
  Platform,
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
import Svg, { Line } from 'react-native-svg';
import SimpleIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useAudio } from '../../utils/AudioContext';
import BannerPreguntas from '../components/BannerPreguntas';
import CustomAvatar from '../components/CustomAvatar';


let activos = 0;
let contador = 0;
// let botonesSeleccionados = [];
// let botonesCompletosSeleccionados = [];
// let lineaSeleccionada;
// seleccionActual = '';
// this.arrayRespuestasLocales = new Array();
// this.arrayRespuestasGlobales = Object;
// this.idGlobal = '';
// this.fotoGlobal = '';
// this.opcionGlobal = {
//   id: this.idGlobal,
//   foto: this.fotoGlobal,
// };

// this.opcion = {
//   id: '',
//   foto: '',
//   orden: ''
// };

export default function UnirImg(props) {
  const { setForegroundVolume, isMuted, toggleMute } = useAudio();
  const {
    orden,
    pregunta,
    setPregunta,
    tamaño,
    opciones,
    opciones1,
    idPregunta,
    idAmbiente,
    nombreAmbiente,
  } = props;
  const [seleccionados, setSeleccionado] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [linea1, setLinea1] = useState(false);
  const [linea2, setLinea2] = useState(false);
  const [linea3, setLinea3] = useState(false);
  const [linea4, setLinea4] = useState(false);
  const [linea5, setLinea5] = useState(false);
  const [linea6, setLinea6] = useState(false);
  const [linea7, setLinea7] = useState(false);
  const [linea8, setLinea8] = useState(false);
  const [linea9, setLinea9] = useState(false);
  const [linea10, setLinea10] = useState(false);
  const [linea11, setLinea11] = useState(false);
  const [linea12, setLinea12] = useState(false);
  const [linea13, setLinea13] = useState(false);
  const [linea14, setLinea14] = useState(false);
  const [linea15, setLinea15] = useState(false);
  const [linea16, setLinea16] = useState(false);
  const [linea17, setLinea17] = useState(false);
  const [linea18, setLinea18] = useState(false);
  const [linea19, setLinea19] = useState(false);
  const [linea20, setLinea20] = useState(false);
  const [linea21, setLinea21] = useState(false);
  const [linea22, setLinea22] = useState(false);
  const [linea23, setLinea23] = useState(false);
  const [linea24, setLinea24] = useState(false);
  const [linea25, setLinea25] = useState(false);
  const [pares1, setPares1] = useState([])
  const [pares2, setPares2] = useState([])
  const [itemPrueba, setItem] = useState(null)
  // this.pares1 = opciones;
  // this.pares2 = opciones1;

  const [arrayRespuestasLocales, setArrayRespuestasLocales] = useState([]); 
  const [arrayRespuestasGlobales, setArrayRespuestasGlobales] = useState({});
  const [opcion, setOpcion] = useState({
    id: '',
    foto: '',
    orden: '',
    to: '',
    from: ''
  });
  const [botonesSeleccionados, setBotonesSeleccionados] = useState([]);
  const [botonesCompletosSeleccionados, setBotonesCompletosSeleccionados] = useState([]);
  const [lineaSeleccionada, setLineaSeleccionada] = useState('');
  const [seleccionActual, setSeleccionActual] = useState('');
  const [coords, setCoords] = useState({
    _1x: 0, _1y: 0,
    _2x: 0, _2y: 0,
    _3x: 0, _3y: 0,
    _4x: 0, _4y: 0,
    _5x: 0, _5y: 0,
    _6x: 0, _6y: 0,
    _7x: 0, _7y: 0,
    _8x: 0, _8y: 0,
    _9x: 0, _9y: 0,
    _10x: 0, _10y: 0,
  });

   const respuestaInit = {
    id_pregunta: idPregunta,
    // opciones: arrayRespuestasLocales,
    opciones: [],
    orden: orden
  };
  const [respuesta, setRespuesta] = useState(respuestaInit);


  // const respuesta = {
  //   id_pregunta: idPregunta,
  //   opciones: arrayRespuestasLocales,
  //   orden: orden
  // };

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
        setForegroundVolume(0.1);
      } else {
        console.log('App is inactive')
        setForegroundVolume(0);
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      // console.log("AppState", appState.current);
    });

    return () => {
      if (subscription) subscription.remove();
    };
  }, []);

  useEffect(() => {
    setPares1(opciones)
    setPares2(opciones1)
    AsyncStorage.setItem('resuestaslocalesUnirImagen', JSON.stringify([]));
    setBotonesSeleccionados([]);
    setBotonesCompletosSeleccionados([]);
    setArrayRespuestasLocales([]);
    setOpcion({id: '', foto: '', from: '', to: ''});
  }, [props]);

  let contador = 0;
  // const [preguntas, setPreguntas] = useState([]);

  // useEffect(() => {
  //   setPreguntas(opciones);
  // }, [opciones])

  let textoBoton = 'Siguiente pregunta';
  if (pregunta == tamaño - 1) {
    textoBoton = 'Verificar Respuestas';
  }


  let siguientePregunta = () => {
    if (respuesta.opciones?.length == pares1?.length) {
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
    } else {
      Alert.alert(
        'Error de validación',
        'Por favor responda todas las preguntas para poder continuar',
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
    if (pregunta < tamaño) {
      let contador = pregunta + 1;

      setArrayRespuestasLocales([]);
      setPregunta(contador);
    } else {

      setArrayRespuestasLocales([]);
      setPregunta(5000);
    }

  };

  const [checkActive, setCheckActive] = useState(null);

  function bloquearDesbloquear(item, checkbox, fila) {
    console.log('item', item, checkbox)
    // setBotonesSeleccionados([]);
    // setBotonesCompletosSeleccionados([]);
    // setArrayRespuestasLocales([]);
    setCheckActive(checkbox);
    const opcionTemp = {...opcion};
    if(fila == 'fila1'){
      opcionTemp.id = item.id;
      opcionTemp.from = checkbox;
      // setOpcion(prev => ({ ...prev, id: item.id }));
    }else{
      opcionTemp.foto = item.foto;
      opcionTemp.to = checkbox;
      // setOpcion(prev => ({ ...prev, foto: item.foto}));
    }
    setOpcion(opcionTemp);
    if(opcionTemp.id != '' && opcionTemp.foto != ''){
      // setBotonesSeleccionados([...botonesSeleccionados, opcionTemp]);
      const opcionesTemp = respuesta.opciones.filter(item => item.id != opcionTemp.id).filter(item => item.foto != opcionTemp.foto)
      setRespuesta(prev => ({ ...prev, opciones: [...opcionesTemp, opcionTemp] }));

      const nuevasCombinaciones = botonesCompletosSeleccionados.filter(comb => {
        const [f, t] = comb.split('-');
        return f !== String(opcionTemp.from) && t !== String(opcionTemp.to) && t !== String(opcionTemp.from) && f !== String(opcionTemp.to);
      });
      // Agrega la nueva combinación
      nuevasCombinaciones.push(`${opcionTemp.from}-${opcionTemp.to}`);
      setBotonesCompletosSeleccionados(nuevasCombinaciones);
      setOpcion({id: '', foto: '', from: '', to: ''});
    }
  }
  // console.log('respuesta', respuesta, checkActive)

  useEffect(() => {
    if (activos == 2) {
      activos = 0;
      contador++;
    } else {
      console.log('activos', activos);
    }
  }, [activos]);

  useEffect(() => {
    // Lock to landscape orientation
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    
    // Cleanup function to restore default orientation when component unmounts
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <View style={{ height: '115%' }}>
        <BannerPreguntas
          ambiente={nombreAmbiente}
          idAmbiente={idAmbiente}
          navigation={props.navigation}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: wp('17%'),
          padding: 0,
          position: 'absolute',
        }}>
        <View style={{ flex: 2 }}>
          <View style={Platform.OS == 'ios' ? { marginLeft: hp('2%') } : null}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: hp('1%'),
              }}>
              <View style={styles.horizontalLine} />
            </View>

            <View style={[styles.subtitulo, { flexDirection: 'row', justifyContent: 'space-between' }]}>
              <Text style={styles.subtituloText}>Test</Text>
              <TouchableOpacity
                onPress={() => {
                  toggleMute(!isMuted);
                  if (isMuted) {
                    setForegroundVolume(0.1);
                  } else {
                    setForegroundVolume(0.0);
                  }
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
                  position: 'absolute',
                  left: wp('110%')
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
                Une el texto con la imagen correcta. Toca el texto y la imagen
                que quieras unir.
              </Text>
            </View>
          </View>
          <View style={styles.recuadroPregunta}>
            <ScrollView style={{ flex: 1 }} persistentScrollbar={true}>
              <View
                style={[
                  pares1?.length == 3
                    ? { marginLeft: hp('10%') }
                    : pares1?.length == 2
                      ? { marginLeft: hp('17%') }
                      : null,
                  { flexDirection: 'row' }, 
                ]}>
                {pares1?.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        width: '18%',
                        
                        // height: hp('8%'),
                        marginLeft: pares1?.length == 3 ? hp('3%') : hp('1%')
                      }}>
                      {/* <ScrollView persistentScrollbar={true} horizontal={true}> */}
                      <TouchableOpacity

                        disabled={seleccionados[index]}
                        onPress={() => {
                          bloquearDesbloquear(pares1[index], index + 1, 'fila1');
                        }}>
                        <Text style={[styles.texto]}>
                          {item.cuerpo}
                        </Text>
                      </TouchableOpacity>
                      {/* </ScrollView> */}
                    </View>
                  );
                })}
              </View>

              <View style={{ height: hp('8.5%') }}>
                <Svg>
                  {/* punto 1 */}
                  {botonesCompletosSeleccionados.includes('1-6') ? (
                    <Line
                      x1={coords._1x + wp('2.5%')}
                      y1={coords._1y + wp('2.5%')}
                      x2={coords._6x + wp('2.5%')}
                      y2={coords._6y + wp('2.5%')}
                      stroke="#20397e"
                      strokeWidth={wp('0.5%')}
                    />
                  ) : null}
                  {botonesCompletosSeleccionados.includes('1-7') ? (
                    <Line
                      x1={coords._1x + wp('2.5%')}
                      y1={coords._1y + wp('2.5%')}
                      x2={coords._7x + wp('2.5%')}
                      y2={coords._7y + wp('2.5%')}
                      stroke="#20397e"
                      strokeWidth={wp('0.5%')}
                    />
                  ) : null}
                  {botonesCompletosSeleccionados.includes('1-8') ? (
                    <Line
                      x1={coords._1x + wp('2.5%')}
                      y1={coords._1y + wp('2.5%')}
                      x2={coords._8x + wp('2.5%')}
                      y2={coords._8y + wp('2.5%')}
                      stroke="#20397e"
                      strokeWidth={wp('0.5%')}
                    />
                  ) : null}
                  {botonesCompletosSeleccionados.includes('1-9') ? (
                    <Line
                      x1={coords._1x + wp('2.5%')}
                      y1={coords._1y + wp('2.5%')}
                      x2={coords._9x + wp('2.5%')}
                      y2={coords._9y + wp('2.5%')}
                      stroke="#20397e"
                      strokeWidth={wp('0.5%')}
                    />
                  ) : null}
                  {botonesCompletosSeleccionados.includes('1-10') ? (
                    <Line
                      x1={coords._1x + wp('2.5%')}
                      y1={coords._1y + wp('2.5%')}
                      x2={coords._10x + wp('2.5%')}
                      y2={coords._10y + wp('2.5%')}
                      stroke="#20397e"
                      strokeWidth={wp('0.5%')}
                    />
                  ) : null}
                  {/* punto 2 */}
                  {botonesCompletosSeleccionados.includes('2-6') ? (
                    <Line
                      x1={coords._2x + wp('2.5%')}
                      y1={coords._2y + wp('2.5%')}
                      x2={coords._6x + wp('2.5%')}
                      y2={coords._6y + wp('2.5%')}
                      stroke="#20397e"
                      strokeWidth={wp('0.5%')}
                    />
                  ) : null}
                  {botonesCompletosSeleccionados.includes('2-7') ? (
                    <Line
                      x1={coords._2x + wp('2.5%')}
                      y1={coords._2y + wp('2.5%')}
                      x2={coords._7x + wp('2.5%')}
                      y2={coords._7y + wp('2.5%')}
                      stroke="#20397e"
                      strokeWidth={wp('0.5%')}
                    />
                  ) : null}
                  {botonesCompletosSeleccionados.includes('2-8') ? (
                    <Line
                      x1={coords._2x + wp('2.5%')}
                      y1={coords._2y + wp('2.5%')}
                      x2={coords._8x + wp('2.5%')}
                      y2={coords._8y + wp('2.5%')}
                      stroke="#20397e"
                      strokeWidth={wp('0.5%')}
                    />
                  ) : null}
                  {botonesCompletosSeleccionados.includes('2-9') ? (
                    <Line
                      x1={coords._2x + wp('2.5%')}
                      y1={coords._2y + wp('2.5%')}
                      x2={coords._9x + wp('2.5%')}
                      y2={coords._9y + wp('2.5%')}
                      stroke="#20397e"
                      strokeWidth={wp('0.5%')}
                    />
                  ) : null}
                  {botonesCompletosSeleccionados.includes('2-10') ? (
                    <Line
                      x1={coords._2x + wp('2.5%')}
                      y1={coords._2y + wp('2.5%')}
                      x2={coords._10x + wp('2.5%')}
                      y2={coords._10y + wp('2.5%')}
                      stroke="#20397e"
                      strokeWidth={wp('0.5%')}
                    />
                  ) : null}
                  {/* punto 3 */}
                  {botonesCompletosSeleccionados.includes('3-6') ? (
                    <Line
                      x1={coords._3x + wp('2.5%')}
                      y1={coords._3y + wp('2.5%')}
                      x2={coords._6x + wp('2.5%')}
                      y2={coords._6y + wp('2.5%')}
                      stroke="#20397e"
                      strokeWidth={wp('0.5%')}
                    />
                  ) : null}
                  {botonesCompletosSeleccionados.includes('3-7') ? (
                    <Line
                      x1={coords._3x + wp('2.5%')}
                      y1={coords._3y + wp('2.5%')}
                      x2={coords._7x + wp('2.5%')}
                      y2={coords._7y + wp('2.5%')}
                      stroke="#20397e"
                      strokeWidth={wp('0.5%')}
                    />
                  ) : null}
                  {botonesCompletosSeleccionados.includes('3-8') ? (
                    <Line
                      x1={coords._3x + wp('2.5%')}
                      y1={coords._3y + wp('2.5%')}
                      x2={coords._8x + wp('2.5%')}
                      y2={coords._8y + wp('2.5%')}
                      stroke="#20397e"
                      strokeWidth={wp('0.5%')}
                    />
                  ) : null}
                  {botonesCompletosSeleccionados.includes('3-9') ? (
                    <Line
                      x1={coords._3x + wp('2.5%')}
                      y1={coords._3y + wp('2.5%')}
                      x2={coords._9x + wp('2.5%')}
                      y2={coords._9y + wp('2.5%')}
                      stroke="#20397e"
                      strokeWidth={wp('0.5%')}
                    />
                  ) : null}
                  {botonesCompletosSeleccionados.includes('3-10') ? (
                    <Line
                      x1={coords._3x + wp('2.5%')}
                      y1={coords._3y + wp('2.5%')}
                      x2={coords._10x + wp('2.5%')}
                      y2={coords._10y + wp('2.5%')}
                      stroke="#20397e"
                      strokeWidth={wp('0.5%')}
                    />
                  ) : null}
                  {/* punto 4 */}
                  {botonesCompletosSeleccionados.includes('4-6') ? (
                    <Line
                      x1={coords._4x + wp('2.5%')}
                      y1={coords._4y + wp('2.5%')}
                      x2={coords._6x + wp('2.5%')}
                      y2={coords._6y + wp('2.5%')}
                      stroke="#20397e"
                      strokeWidth={wp('0.5%')}
                    />
                  ) : null}
                  {botonesCompletosSeleccionados.includes('4-7') ? (
                    <Line
                      x1={coords._4x + wp('2.5%')}
                      y1={coords._4y + wp('2.5%')}
                      x2={coords._7x + wp('2.5%')}
                      y2={coords._7y + wp('2.5%')}
                      stroke="#20397e"
                      strokeWidth={wp('0.5%')}
                    />
                  ) : null}
                  {botonesCompletosSeleccionados.includes('4-8') ? (
                    <Line
                      x1={coords._4x + wp('2.5%')}
                      y1={coords._4y + wp('2.5%')}
                      x2={coords._8x + wp('2.5%')}
                      y2={coords._8y + wp('2.5%')}
                      stroke="#20397e"
                      strokeWidth={wp('0.5%')}
                    />
                  ) : null}
                  {botonesCompletosSeleccionados.includes('4-9') ? (
                    <Line
                      x1={coords._4x + wp('2.5%')}
                      y1={coords._4y + wp('2.5%')}
                      x2={coords._9x + wp('2.5%')}
                      y2={coords._9y + wp('2.5%')}
                      stroke="#20397e"
                      strokeWidth={wp('0.5%')}
                    />
                  ) : null}
                  {botonesCompletosSeleccionados.includes('4-10') ? (
                    <Line
                      x1={coords._4x + wp('2.5%')}
                      y1={coords._4y + wp('2.5%')}
                      x2={coords._10x + wp('2.5%')}
                      y2={coords._10y + wp('2.5%')}
                      stroke="#20397e"
                      strokeWidth={wp('0.5%')}
                    />
                  ) : null}
                  {/* punto 5 */}
                  {botonesCompletosSeleccionados.includes('5-6') ? (
                    <Line
                      x1={coords._5x + wp('2.5%')}
                      y1={coords._5y + wp('2.5%')}
                      x2={coords._6x + wp('2.5%')}
                      y2={coords._6y + wp('2.5%')}
                      stroke="#20397e"
                      strokeWidth={wp('0.5%')}
                    />
                  ) : null}
                  {botonesCompletosSeleccionados.includes('5-7') ? (
                    <Line
                      x1={coords._5x + wp('2.5%')}
                      y1={coords._5y + wp('2.5%')}
                      x2={coords._7x + wp('2.5%')}
                      y2={coords._7y + wp('2.5%')}
                      stroke="#20397e"
                      strokeWidth={wp('0.5%')}
                    />
                  ) : null}
                  {botonesCompletosSeleccionados.includes('5-8') ? (
                    <Line
                      x1={coords._5x + wp('2.5%')}
                      y1={coords._5y + wp('2.5%')}
                      x2={coords._8x + wp('2.5%')}
                      y2={coords._8y + wp('2.5%')}
                      stroke="#20397e"
                      strokeWidth={wp('0.5%')}
                    />
                  ) : null}
                  {botonesCompletosSeleccionados.includes('5-9') ? (
                    <Line
                      x1={coords._5x + wp('2.5%')}
                      y1={coords._5y + wp('2.5%')}
                      x2={coords._9x + wp('2.5%')}
                      y2={coords._9y + wp('2.5%')}
                      stroke="#20397e"
                      strokeWidth={wp('0.5%')}
                    />
                  ) : null}
                  {botonesCompletosSeleccionados.includes('5-10') ? (
                    <Line
                      x1={coords._5x + wp('2.5%')}
                      y1={coords._5y + wp('2.5%')}
                      x2={coords._10x + wp('2.5%')}
                      y2={coords._10y + wp('2.5%')}
                      stroke="#20397e"
                      strokeWidth={wp('0.5%')}
                    />
                  ) : null}
                </Svg>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    position: 'absolute',
                    top: wp('2%'),
                  }}>
                  {pares1?.length > 0 ? (
                    <View
                      style={
                        pares1?.length == 3
                          ? styles.p1left
                          : pares1?.length == 2
                            ? styles.p1left2
                            : styles.p1
                      }
                      onLayout={(e) => {
                        const { x, y } = e.nativeEvent.layout;
                        setCoords(prev => ({ ...prev, _1x: x, _1y: y }));
                      }}>
                      <CustomAvatar
                        disabled={seleccionados[0]}
                        rounded
                        activeOpacity={0.3}
                        size={wp('4.5%')}
                        containerStyle={{
                          backgroundColor: '#fff',
                          borderWidth: 1,
                          borderColor: checkActive == 1 ? 'red' : '#00983a',
                        }}
                        onPress={() => {
                          bloquearDesbloquear(pares1[0], 1, 'fila1');
                        }}
                      />
                    </View>
                  ) : null}

                  {pares1?.length > 1 ? (
                    <View
                      style={styles.p2}
                      onLayout={(e) => {
                        const { x, y } = e.nativeEvent.layout;
                        setCoords(prev => ({ ...prev, _2x: x, _2y: y }));
                      }}>
                      <CustomAvatar
                        disabled={seleccionados[1]}
                        rounded
                        activeOpacity={0.3}
                        size={wp('4.5%')}
                        containerStyle={{
                          backgroundColor: '#fff',
                          borderWidth: 1,
                          borderColor: checkActive == 2 ? 'red' : '#00983a',
                        }}
                        onPress={() => {
                          bloquearDesbloquear(pares1[1], 2, 'fila1');
                        }}
                      />
                    </View>
                  ) : null}

                  {pares1?.length > 2 ? (
                    <View
                      style={styles.p3}
                      onLayout={(e) => {
                        const { x, y } = e.nativeEvent.layout;
                        setCoords(prev => ({ ...prev, _3x: x, _3y: y }));
                      }}>
                      <CustomAvatar
                        disabled={seleccionados[2]}
                        rounded
                        activeOpacity={0.3}
                        size={wp('4.5%')}
                        containerStyle={{
                          backgroundColor: '#fff',
                          borderWidth: 1,
                          borderColor: checkActive == 3 ? 'red' : '#00983a',
                        }}
                        onPress={() => {
                          bloquearDesbloquear(pares1[2], 3, 'fila1');
                        }}
                      />
                    </View>
                  ) : null}

                  {pares1?.length > 3 ? (
                    <View
                      style={styles.p4}
                      onLayout={(e) => {
                        const { x, y } = e.nativeEvent.layout;
                        setCoords(prev => ({ ...prev, _4x: x, _4y: y }));
                      }}>
                      <CustomAvatar
                        disabled={seleccionados[3]}
                        rounded
                        activeOpacity={0.3}
                        size={wp('4.5%')}
                        containerStyle={{
                          backgroundColor: '#fff',
                          borderWidth: 1,
                          borderColor: checkActive == 4 ? 'red' : '#00983a',
                        }}
                        onPress={() => {
                          bloquearDesbloquear(pares1[3], 4, 'fila1');
                        }}
                      />
                    </View>
                  ) : null}

                  {pares1?.length > 4 ? (
                    <View
                      style={styles.p5}
                      onLayout={(e) => {
                        const { x, y } = e.nativeEvent.layout;
                        setCoords(prev => ({ ...prev, _5x: x, _5y: y }));
                      }}>
                      <CustomAvatar
                        disabled={seleccionados[4]}
                        rounded
                        activeOpacity={0.3}
                        size={wp('4.5%')}
                        containerStyle={{
                          backgroundColor: '#fff',
                          borderWidth: 1,
                          borderColor: checkActive == 5 ? 'red' : '#00983a',
                        }}
                        onPress={() => {
                          bloquearDesbloquear(pares1[4], 5, 'fila1');
                        }}
                      />
                    </View>
                  ) : null}
                </View>

                <View
                  style={{ flex: 1, flexDirection: 'row', position: 'absolute' }}>
                  {pares2?.length > 0 ? (
                    <View
                      style={
                        pares1?.length == 3
                          ? styles.i1left
                          : pares1?.length == 2
                            ? styles.i1left2
                            : styles.i1
                      }
                      onLayout={(e) => {
                        const { x, y } = e.nativeEvent.layout;
                        setCoords(prev => ({ ...prev, _6x: x, _6y: y }));
                      }}>
                      <CustomAvatar
                        disabled={seleccionados[5]}
                        rounded
                        activeOpacity={0.3}
                        size={wp('4.5%')}
                        containerStyle={{
                          backgroundColor: '#fff',
                          borderWidth: 1,
                          borderColor: checkActive == 6 ? 'red' : '#00983a',
                          marginBottom: hp('1%'),
                        }}
                        onPress={() => {
                          bloquearDesbloquear(pares2[0], 6, 'fila2');
                        }}
                      />
                    </View>
                  ) : null}

                  {pares2?.length > 1 ? (
                    <View
                      style={styles.i2}
                      onLayout={(e) => {
                        const { x, y } = e.nativeEvent.layout;
                        setCoords(prev => ({ ...prev, _7x: x, _7y: y }));
                      }}>
                      <CustomAvatar
                        disabled={seleccionados[6]}
                        rounded
                        activeOpacity={0.3}
                        size={wp('4.5%')}
                        containerStyle={{
                          backgroundColor: '#fff',
                          borderWidth: 1,
                          borderColor: checkActive == 7 ? 'red' :  '#00983a',
                          marginBottom: hp('1%'),
                        }}
                        onPress={() => {
                          bloquearDesbloquear(pares2[1], 7, 'fila2');
                        }}
                      />
                    </View>
                  ) : null}

                  {pares2?.length > 2 ? (
                    <View
                      style={styles.i3}
                      onLayout={(e) => {
                        const { x, y } = e.nativeEvent.layout;
                        setCoords(prev => ({ ...prev, _8x: x, _8y: y }));
                      }}>
                      <CustomAvatar
                        disabled={seleccionados[7]}
                        rounded
                        activeOpacity={0.3}
                        size={wp('4.5%')}
                        containerStyle={{
                          backgroundColor: '#fff',
                          borderWidth: 1,
                          borderColor: checkActive == 8 ? 'red' : '#00983a',
                          marginBottom: hp('1%'),
                        }}
                        onPress={() => {
                          bloquearDesbloquear(pares2[2], 8, 'fila2');
                        }}
                      />
                    </View>
                  ) : null}

                  {pares2?.length > 3 ? (
                    <View
                      style={styles.i4}
                      onLayout={(e) => {
                        const { x, y } = e.nativeEvent.layout;
                        setCoords(prev => ({ ...prev, _9x: x, _9y: y }));
                      }}>
                      <CustomAvatar
                        disabled={seleccionados[8]}
                        rounded
                        activeOpacity={0.3}
                        size={wp('4.5%')}
                        containerStyle={{
                          backgroundColor: '#fff',
                          borderWidth: 1,
                          borderColor: checkActive == 9 ? 'red' : '#00983a',
                          marginBottom: hp('1%'),
                        }}
                        onPress={() => {
                          bloquearDesbloquear(pares2[3], 9, 'fila2');
                        }}
                      />
                    </View>
                  ) : null}

                  {pares2?.length > 4 ? (
                    <View
                      style={styles.i5}
                      onLayout={(e) => {
                        const { x, y } = e.nativeEvent.layout;
                        setCoords(prev => ({ ...prev, _10x: x, _10y: y }));
                      }}>
                      <CustomAvatar
                        disabled={seleccionados[9]}
                        rounded
                        activeOpacity={0.3}
                        size={wp('4.5%')}
                        containerStyle={{
                          backgroundColor: '#fff',
                          borderWidth: 1,
                          borderColor: checkActive == 10 ? 'red' : '#00983a',
                          marginBottom: hp('1%'),
                        }}
                        onPress={() => {
                          bloquearDesbloquear(pares2[4], 10, 'fila2');
                        }}
                      />
                    </View>
                  ) : null}
                </View>
              </View>
              <View
                style={[
                  pares2?.length == 3
                    ? { marginLeft: hp('7%') }
                    : pares1?.length == 2
                      ? { marginLeft: hp('17%') }
                      : null,
                  { flexDirection: 'row', marginBottom: wp('30%') },
                ]}>
                {pares2?.map((item, index) => {
                  let foto = { uri: item.foto };
                  return (
                    <View  key={index}
                    style={{width: '18%',                  
                    marginLeft: pares2?.length == 3 ? hp('3%') : hp('0.3%'),
                    marginTop: '5%'
                  }}
                    
                    >
                      <TouchableOpacity
                      
                        disabled={seleccionados[index + 5]}
                        onPress={() => {
                          bloquearDesbloquear(pares2[index], index + 6, 'fila2');
                        }}>
                        {/* <View
                          style={{
                            width: hp('10%'),
                            // width: hp('10%'),
                            height: hp('8%'),
                            marginLeft:  pares1?.length == 3 ? hp('2%'):  hp('1%'),

                            marginTop: wp('4%'),
                          }}> */}
                        <ImageBackground
                          source={foto}
                          style={{
                            flex: 1, 
                            resizeMode: 'contain', 
                            width: '100%',
                            // width: hp('10%'),
                            height: hp('8%'),
                            marginLeft:  pares1?.length == 3 ? hp('2%'):  hp('1%'),
                          }}
                        />
                        {/* </View> */}
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>

        <View style={{ flex: 1, alignItems: 'center' }}>
          <View
            style={{
              width: wp('41%'),
              height: wp('64%'),
              marginTop: hp('5%'),
            }}>
            <ImageBackground
              style={{ flex: 1, resizeMode: 'contain' }}
              source={require('../../assets/tobias-preguntas.png')}
            />
            <TouchableOpacity onPress={() => siguientePregunta()}>
              <LinearGradient
                style={styles.button}
                colors={['#20397e', '#030b4b']}
                start={{ x: 0.5, y: 0.3 }}>
                <Text style={styles.buttonText}>{textoBoton}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },

  texto: {
    fontFamily: 'Roboto-Regular',
    // lineHeight: hp('5%'),
    color: '#6d6d6d',
    fontSize: wp('3%'),
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
    fontSize: wp('3.5%'),
    fontFamily: 'Roboto-Regular',
    paddingVertical: hp('1.5%'),
  },

  recuadroPregunta: {
    backgroundColor: '#f5f5f0',
    borderRadius: 10,
    padding: wp('3%'),
    paddingVertical: hp('0.5%'),
    marginLeft: wp('6%'),
    marginRight: wp('1.5%'),
    marginBottom: hp('2%'),
    height: '60%'
  },

  p1: {
    alignItems: 'center',
    position: 'relative',
    marginLeft: hp('2%'),
    marginRight: hp('4%')

  },
  p1left: {
    alignItems: 'center',
    position: 'relative',
    marginLeft: hp('15%'),
    marginRight: hp('4%')
  },
  p1left2: {
    alignItems: 'center',
    position: 'relative',
    marginLeft: hp('20%'),
    marginRight: hp('4%')
  },
  p2: {
    alignItems: 'center',
    position: 'relative',
    marginLeft: hp('6%'),
    marginRight: hp('4%')


  },
  p3: {
    alignItems: 'center',
    position: 'relative',
    marginLeft: hp('6%'),
    marginRight: hp('4%')


  },
  p4: {
    alignItems: 'center',
    position: 'relative',
    marginLeft: hp('6%'),
    marginRight: hp('4%')


  },
  p5: {
    alignItems: 'center',
    position: 'relative',
    marginLeft: hp('6%'),
    marginRight: hp('4%')


  },

  i1: {
    alignItems: 'center',
    position: 'relative',
    marginLeft: hp('2%'),
    marginRight: hp('4%'),
    top: wp('10%')

  },
  i1left: {
    alignItems: 'center',
    position: 'relative',
    marginLeft: hp('15%'),
    marginRight: hp('4%'),
    top: wp('10%')

  },
  i1left2: {
    alignItems: 'center',
    position: 'relative',
    marginLeft: hp('20%'),
    marginRight: hp('4%'),
    top: wp('10%')

  },
  i2: {
    alignItems: 'center',
    position: 'relative',
    marginLeft: hp('6%'),
    marginRight: hp('4%'),
    top: wp('10%')

  },
  i3: {

    alignItems: 'center',
    position: 'relative',
    marginLeft: hp('6%'),
    marginRight: hp('4%'),
    top: wp('10%')
  },
  i4: {
    alignItems: 'center',
    position: 'relative',
    marginLeft: hp('6%'),
    marginRight: hp('4%'),
    top: wp('10%')

  },
  i5: {

    alignItems: 'center',
    position: 'relative',
    marginLeft: hp('6%'),
    marginRight: hp('4%'),
    top: wp('10%')

  },
});
