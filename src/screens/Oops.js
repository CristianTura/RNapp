import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { getCantidadIntentosPorAmbienteYPaso } from '../../api/api';

import { Audio } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import SafeAreaWrapper from '../components/SafeAreaWrapper';


export default function Oops(props) {
  const [intentos, setIntentos] = useState(null)
  const { navigation, arrayCalificacion, paso, ambiente, cuestionario, pregunta, setPregunta, setCalificacion}  = props;

  useEffect(() => {
    AsyncStorage.getItem('token').then((token) => {     
      getCantidadIntentosPorAmbienteYPaso(
        parseInt(ambiente),
        parseInt(paso),
        token,
      ).then((response) => {
       
        setIntentos(parseInt(response));
      });
    });
  }, [props]);


  useEffect(() => {
    const loadAudio = async () => {
      try {
        global.whoosh3 = new Audio.Sound();
        await global.whoosh3.loadAsync(require('../../assets/audio/incorrecto.mp3'));
        await global.whoosh3.playAsync();
      } catch (error) {
        console.log('Failed to load the sound', error);
        // Create a silent audio object as fallback
        global.whoosh3 = {
          stopAsync: async () => {},
        };
      }
    };

    loadAudio();

    props.navigation.addListener('beforeRemove', (e) => {
      if (global.whoosh3 && global.whoosh3.stopAsync) {
        global.whoosh3.stopAsync();
      }
    });
  }, []);

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
      
    <View
      style={{
        backgroundColor: 'rgba(32, 57, 126, 0.78)',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        
      <View style={styles.modal}>
        <View
          style={{
            width: '50%',
            height: '150%',
            alignItems: 'center',
            marginTop: hp('6%'),
          }}>
          <Image
            source={require('../../assets/oops-pregunta.png')}
            style={{ flex: 1, resizeMode: 'contain' }}
          />
        </View>

        <View style={{ width: '50%', alignItems: 'center' }}>
          <Text style={styles.texto}>
            Estuviste muy cerca, inténtalo una vez más.
          </Text>

          {intentos >= 2 ? (
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('Respuestas', [
                  { array: arrayCalificacion },
                  props.cuestionario,
                ])
              }>
              <LinearGradient
                style={styles.button}
                colors={['#1ad17c', '#099941']}
                end={{ x: 0.5, y: 0.3 }}>
                <Text style={styles.buttonText}>Revisar Respuestas</Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : intentos <2 && intentos != null ?(
            <TouchableOpacity
              onPress={() => {
                AsyncStorage.getItem('respuestas').then((respuestasGlobalesAsync) => {
                  let auxRespuestas = JSON.parse(respuestasGlobalesAsync)
                  auxRespuestas.preguntasContestadas = []
                  AsyncStorage.setItem('respuestas', JSON.stringify(auxRespuestas))

                });
                // props.navigation.goBack()
                setCalificacion(-1)
                setPregunta(0)
              }


              }>
              <LinearGradient
                style={styles.button}
                colors={['#1ad17c', '#099941']}
                end={{ x: 0.5, y: 0.3 }}>
                <Text style={styles.buttonText}>Repetir test</Text>
              </LinearGradient>
            </TouchableOpacity>
          ): null}
        </View>
      </View>
    </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  modal: {
    // marginHorizontal: wp('1%'),
    height: '70%',
    width: '80%',
    borderRadius: 15,
    borderBottomWidth: 0,
    borderColor: '#00983a',
    backgroundColor: '#fff',
    borderWidth: wp('1%'),
    elevation: 10,
    flexDirection: 'row',
    paddingVertical: wp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  texto: {
    fontFamily: 'Roboto-Bold',
    fontSize: wp('5.8%'),
    color: '#20397e',
    paddingVertical: wp('3%'),
    paddingHorizontal: wp('5%'),
    textAlign: 'center',
  },
  button: {
    // padding: 10,
    padding: wp('2.5%'),
    borderRadius: 15,
    // marginHorizontal: 10,
    marginHorizontal: wp('1%'),
    // marginVertical: 10,
    marginVertical: hp('3%'),
    alignItems: 'center',
  },

  buttonText: {
    // fontSize: 18,
    fontSize: wp('4.5%'),
    fontFamily: 'Roboto-Regular',
    color: '#f5f5f0',
    // marginHorizontal: 10,
    marginHorizontal: wp('3%'),
  },
});
