import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect, useRef, useState } from 'react';
import { AppState, BackHandler, StyleSheet } from 'react-native';
import dataAmbientes from '../../data/dataAmbientes';
import { useAudio } from '../../utils/AudioContext';
import Loading from './Loading';
import TemarioBloques from './TemarioBloques';
import TemarioHoriz from './TemarioHoriz';
import TemarioImgsHoriz from './TemarioImgsHoriz';
import TemarioImgsVertical from './TemarioImgsVertical';
import TemarioVertical from './TemarioVertical';

export default function Temario(props) {
    const [idPortada, setIdPortada] = useState('');
    const [contadorItems, setContadorItems] = useState(0);
    const temarioItems = props.route.params.response;
    const [isLoading, setIsLoading] = useState(true);
    
    const { 
      isMuted, 
      loadForegroundSound, 
      stopForegroundSound, 
      setForegroundVolume,
      setBackgroundVolume,
      loadBackgroundSound,
      stopBackgroundSound
    } = useAudio();

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    // Lock to landscape orientation
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    
    // Cleanup function to restore default orientation when component unmounts
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
        setBackgroundVolume(0.5);
      } else {
        console.log('App is inactive')
        setBackgroundVolume(0);
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      if(subscription) subscription.remove();
    };
  }, []);
  
  useEffect(() => {
    const loadAudio = async () => {
      try {
        const audioFile = require('../../assets/audio/contenidopreguntas.mp3');
        await loadBackgroundSound(audioFile, true);
        // await setForegroundVolume(0.7);
      } catch (error) {
        console.log('Failed to load the sound', error);
      }
    };

    loadAudio();

    props.navigation.addListener('beforeRemove', (e) => {
      stopBackgroundSound();
    });
  }, []);


  useEffect(() => {
    AsyncStorage.setItem('respuestas', JSON.stringify({id_ambiente: props.route.params.ambiente ,paso: props.route.params.paso, preguntasContestadas:[]}))
    const backAction = async () => {        
      AsyncStorage.getItem('ambiente').then(
        (ambiente) => {
          for (let i = 0; i < dataAmbientes.length; i++) {
            if (
              parseInt(ambiente) === parseInt(dataAmbientes[i].ambienteId)
            ) {
              props.navigation.navigate(
                dataAmbientes[parseInt(dataAmbientes[i].ambienteId) - 1]
                  .screenAmbiente,
              );
              break;
            } else {
              props.navigation.navigate('Ambientes');
            }
          }
        },
        [props],
      );
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [props]);

  console.log('temarioItems', temarioItems[contadorItems].tipo)
  if (temarioItems?.[contadorItems]?.tipo == 'NAVEGACION_BOTONES') {
    return (
      <TemarioBloques
      contadorItems={contadorItems}
      setContadorItems={setContadorItems}
      temarioLength={temarioItems.length}
      portadas={temarioItems[contadorItems].opciones}
      contenido={temarioItems[contadorItems].contenido}
      paso={temarioItems[contadorItems].paso}
      ambiente={temarioItems[contadorItems].ambiente.id}
      titulo={temarioItems[contadorItems].titulo}
      navigation={props.navigation}
      />
    );
  } else if (temarioItems?.[contadorItems]?.tipo == 'SOLO_IMAGEN_HORIZONTAL') {
    return (
      <TemarioHoriz
        contadorItems={contadorItems}
        setContadorItems={setContadorItems}
        temarioLength={temarioItems.length}
        imagenUri={temarioItems[contadorItems].imagen}
        contenido={temarioItems[contadorItems].contenido}
        paso={temarioItems[contadorItems].paso}
        ambiente={temarioItems[contadorItems].ambiente.id}
        titulo={temarioItems[contadorItems].titulo}
        navigation={props.navigation}
      />
    );
  } else if (temarioItems?.[contadorItems]?.tipo == 'SOLO_IMAGEN_VERTICAL') {

    return (
      <TemarioVertical
        contadorItems={contadorItems}
        setContadorItems={setContadorItems}
        temarioLength={temarioItems.length}
        imagenUri={temarioItems[contadorItems].imagen}
        contenido={temarioItems[contadorItems].contenido}
        paso={temarioItems[contadorItems].paso}
        ambiente={temarioItems[contadorItems].ambiente.id}
        titulo={temarioItems[contadorItems].titulo}
        navigation={props.navigation}
        
      />
    );
  } else if (
    temarioItems?.[contadorItems]?.tipo == 'IMAGEN_CONTENIDO_VERTICAL'
  ) {

    const imagenes = [];
    const frases = [];
    for (let i = 0; i < temarioItems[contadorItems].opciones.length; i++) {
      imagenes.push(temarioItems[contadorItems].opciones[i].foto);
      frases.push(temarioItems[contadorItems].opciones[i].cuerpo);
    }

    return (
      <TemarioImgsVertical
        contadorItems={contadorItems}
        setContadorItems={setContadorItems}
        temarioLength={temarioItems.length}
        imagenUri={temarioItems[contadorItems].imagen}
        contenido={temarioItems[contadorItems].contenido}
        paso={temarioItems[contadorItems].paso}
        ambiente={temarioItems[contadorItems].ambiente.id}
        titulo={temarioItems[contadorItems].titulo}
        frases={frases}
        imagenes={imagenes}
        navigation={props.navigation}
      />
    );
  } else if (
    temarioItems?.[contadorItems]?.tipo == 'IMAGEN_CONTENIDO_HORIZONTAL'
  ) {

    const imagenes = [];
    const frases = [];
    for (let i = 0; i < temarioItems[contadorItems].opciones.length; i++) {
      imagenes.push(temarioItems[contadorItems].opciones[i].foto);
      frases.push(temarioItems[contadorItems].opciones[i].cuerpo);
    }

    return (
      <TemarioImgsHoriz
        contadorItems={contadorItems}
        setContadorItems={setContadorItems}
        temarioLength={temarioItems.length}
        imagenUri={temarioItems[contadorItems].imagen}
        contenido={temarioItems[contadorItems].contenido}
        ambiente={temarioItems[contadorItems].ambiente.id}
        paso={temarioItems[contadorItems].paso}
        titulo={temarioItems[contadorItems].titulo}
        frases={frases}
        imagenes={imagenes}
        navigation={props.navigation}
      />
    );
  }
  else{
    return <Loading />
  }
}

const styles = StyleSheet.create({})
