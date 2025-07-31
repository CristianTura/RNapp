import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef, useState } from 'react';
import { AppState, BackHandler } from 'react-native';
import { postGuardarTestPresentado } from '../../api/api';
import dataAmbientes from '../../data/dataAmbientes';
import dataProgreso from '../../data/dataProgreso';
import { useAudio } from '../../utils/AudioContext';
import Loading from '../screens/Loading';
import Felicidades from './Felicidades';
import Oops from './Oops';
import PreguntaMultiple from './PreguntaMultiple';
import Preguntas from './PreguntaUnica';
import PreguntaUnirImgRef from './PreguntaUnirImgRef';
import PreguntasUnirPalabras from './PreguntaUnirPalabras';
import PreguntasVF from './PreguntaVF';
// import SpinnerComponent from '../components/Spinner';
// import Sound from 'react-native-sound';

// const contador = 0
const arrayRespuestasGlobales = [];
const respuestasContestadas = []
// const arrayBooleanoRespuestas = new Array;
const arrayCalificacion = []
// let cuestionario = []
export default function Cuestionario(props) {
  const [pregunta, setPregunta] = useState(0);
  const [calificacion, setCalificacion] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [arrayBooleano, setArrayBooleano] = useState(null);
  const [idAmbiente, setIdAmbiente] = useState(
    props.route.params.cuestionario[3],
  );
  const [tipoPregunta, setTipoPregunta] = useState(null);
  const [contador, setContador] = useState(0);
  const [cuestionario, setCuestionario] = useState([]);
  const [tamaño, setTamaño] = useState(0);
  const [arrayBooleanoRespuestas, setArrayBooleanoRespuestas] = useState([]);

  const { setBackgroundVolume, setForegroundVolume } = useAudio();

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  
  // const tamaño = props.route.params.cuestionario[1];

  
  useEffect(() => {
    props.navigation.addListener('beforeRemove', (e) => {
      setBackgroundVolume(0.0)
    })
  }, []);

  useEffect(() => {
    setCuestionario(props.route.params.cuestionario[0]); 
    setTamaño(props.route.params.cuestionario[1]);
  }, [props])

  useEffect(() => {

    const subscription = AppState.addEventListener("change", nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground! IN CUESTIONARIOOOO");
        setBackgroundVolume(0);
        setForegroundVolume(0.1);
      } else {
        console.log('App is inactive')
        setBackgroundVolume(0);
        setForegroundVolume(0);
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      if(subscription) subscription.remove();
    };
  }, []);

  useEffect(() => {
    const backAction = async () => {
      AsyncStorage.getItem('ambiente').then(
        (ambiente) => {
          console.log('ambiente', ambiente)
          for (let i = 0; i < dataAmbientes.length; i++) {
            if (parseInt(ambiente) === parseInt(dataAmbientes[i].ambienteId)) {
              props.navigation.navigate(
                dataAmbientes[parseInt(dataAmbientes[i].ambienteId) - 1]
                  .screenAmbiente,
              );
              break;
            } else {
              props.navigation.navigate('Ambientes');
            }
          }
        }
      );
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [props]);

  const getCalificacion = () => {
    AsyncStorage.getItem('respuestas').then((respuestasGlobalesAsync) => {
      AsyncStorage.getItem('token').then((tokenAsync) => {
        postGuardarTestPresentado(tokenAsync, respuestasGlobalesAsync).then(
          (response) => {
            const arrayBooleanoRespuestasTemp = [];
            response?.preguntasContestadas?.forEach(pregunta => {
              arrayBooleanoRespuestasTemp.push(pregunta.correcta);
            });
            setArrayBooleanoRespuestas(arrayBooleanoRespuestasTemp);
            setCalificacion(response.calificacion);
            setContador(contador + 1);
          },
        );
      });
    });
  }

  useEffect(() => {
    if (pregunta < tamaño) {    
      setTipoPregunta(cuestionario[pregunta].tipo);
    } else {
      if(pregunta > 0){
        // setTipoPregunta('TERMINADO');
        getCalificacion();
        setContador(0);
      }
    }
  }, [pregunta, tamaño]);

  useEffect(() => {
    if(calificacion > -1){
      setTipoPregunta('TERMINADO')
    }
  }, [calificacion]);

  // if (isLoading) {
    // return <Loading />;
  // } else

console.log('tipoPregunta', calificacion, tipoPregunta)
  if (tipoPregunta == 'UNICA_RESPUESTA') {
    return (
      <Preguntas
        idPregunta={cuestionario?.[pregunta]?.id}
        contenido={cuestionario?.[pregunta]?.contenido}
        opciones={cuestionario?.[pregunta]?.opciones}
        orden={cuestionario?.[pregunta]?.orden}
        setPregunta={setPregunta}
        pregunta={pregunta}
        tamaño={tamaño}
        idAmbiente={idAmbiente}
        navigation={props.navigation}
        nombreAmbiente={dataProgreso[parseInt(idAmbiente) - 1].text}
      />
    );
  } else if (tipoPregunta == 'MULTIPLE_RESPUESTA') {
    let toggleCheckBox1 = [];
    // console.log('cuestionario?.[pregunta]?.opciones', cuestionario, pregunta)
    let tamañoArray = new Array(cuestionario?.[pregunta]?.opciones)?.length;
    for (let i = 0; i < tamañoArray; i++) {
      toggleCheckBox1.push(false);
    }
    return (
      <PreguntaMultiple
        toggleCheckBox={toggleCheckBox1}
        idPregunta={cuestionario?.[pregunta]?.id}
        contenido={cuestionario?.[pregunta]?.contenido}
        opciones={cuestionario?.[pregunta]?.opciones}
        orden={cuestionario?.[pregunta]?.orden}
        setPregunta={setPregunta}
        pregunta={pregunta}
        tamaño={tamaño}
        idAmbiente={idAmbiente}
        navigation={props.navigation}
        nombreAmbiente={dataProgreso[parseInt(idAmbiente) - 1].text}
      />
    );
  } else if (tipoPregunta == 'MULTIPLE_RESPUESTA_EMPAREJAMIENTO') {
    return (
      <PreguntasUnirPalabras
        idPregunta={cuestionario?.[pregunta]?.id}
        orden={cuestionario?.[pregunta]?.orden}
        contenido={cuestionario?.[pregunta]?.contenido}
        opciones={cuestionario?.[pregunta]?.opciones}
        setPregunta={setPregunta}
        pregunta={pregunta}
        tamaño={tamaño}
        idAmbiente={idAmbiente}
        navigation={props.navigation}
        nombreAmbiente={dataProgreso[parseInt(idAmbiente) - 1].text}
      />
    );
  } else if (tipoPregunta == 'FALSO_VERDADERO') {
    let toggleCheckBox1 = [];
    let tamañoArray = new Array(cuestionario?.[pregunta]?.opciones)?.length;
    for (let i = 0; i < tamañoArray; i++) {
      toggleCheckBox1.push({verdadero: false, falso: false});
    }
    return (
      <PreguntasVF
        toggleCheckBox={toggleCheckBox1}
        idPregunta={cuestionario?.[pregunta]?.id}
        contenido={cuestionario?.[pregunta]?.contenido}
        opciones={cuestionario?.[pregunta]?.opciones}
        orden={cuestionario?.[pregunta]?.orden}
        setPregunta={setPregunta}
        pregunta={pregunta}
        tamaño={tamaño}
        idAmbiente={idAmbiente}
        navigation={props.navigation}
        nombreAmbiente={dataProgreso[parseInt(idAmbiente) - 1].text}
      />
    );
  } else if (tipoPregunta == 'EMPAREJAMIENTO') {
    let opciones = [];
      for (let i = 0; i < cuestionario?.[pregunta]?.opciones.length; i++) {
      opciones.push(cuestionario?.[pregunta]?.opciones[i]);
    }
    return (
      <PreguntaUnirImgRef
        orden={cuestionario?.[pregunta]?.orden}
        idPregunta={cuestionario?.[pregunta]?.id}
        contenido={cuestionario?.[pregunta]?.contenido}
        opciones1={opciones}
        opciones={cuestionario?.[pregunta]?.opciones.sort(
          () => Math.random() - 0.5,
        )}
        setPregunta={setPregunta}
        pregunta={pregunta}
        tamaño={tamaño}
        idAmbiente={idAmbiente}
        navigation={props.navigation}
        nombreAmbiente={dataProgreso[parseInt(idAmbiente) - 1].text}
      />
    );
  } else if (tipoPregunta == 'TERMINADO') {
      if (calificacion >= 80) {
        // setTipoPregunta('otro');
        setForegroundVolume(0.0);
        return (
          <Felicidades
            navigation={props.navigation}
            arrayCalificacion={arrayBooleanoRespuestas}
            paso={props.route.params.cuestionario[2]}
            ambiente={props.route.params.cuestionario[3]}
            cuestionario={cuestionario}
          />
        );
      } else if (calificacion <= 79 && calificacion >= 0) {
        // setTipoPregunta('otro');
        setForegroundVolume(0.0);
        // console.log('paso a punto de oops')
        return (
          <Oops 
            navigation={props.navigation}
            arrayCalificacion={arrayBooleanoRespuestas}
            paso={props.route.params.cuestionario[2]}
            ambiente={props.route.params.cuestionario[3]}
            cuestionario={cuestionario}
            pregunta={pregunta}
            setPregunta={setPregunta}
            setCalificacion={setCalificacion}
          />
        );
      } else {
        // setTipoPregunta('otro');
        return <Loading />;
      }
    // }
  } else {
    // console.log('paso a punto de loading')
    return <Loading />;
  }
}





