import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import SafeAreaWrapper from '../components/SafeAreaWrapper';

export default function Felicidades(props) {
  const { arrayCalificacion } = props

  useEffect(() => {
    const loadAudio = async () => {
      try {
        global.whoosh3 = new Audio.Sound();
        await global.whoosh3.loadAsync(require('../../assets/audio/acertar.mp3'));
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
              source={require('../../assets/felicidades-pregunta.png')}
              style={{flex: 1, resizeMode: 'contain'}}
            />
          </View>

          <View style={{width: '50%', alignItems: 'center'}}>
            <Text style={styles.texto}>
              ¡Felicitaciones!, ya puedes revisar tu progreso.
            </Text>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('Respuestas', [
                  {array: arrayCalificacion},
                  props.cuestionario,
                ])
              }>
              <LinearGradient
                style={styles.button}
                colors={['#1ad17c', '#099941']}
                end={{x: 0.5, y: 0.3}}>
                <Text style={styles.buttonText}>Revisar Respuestas</Text>
              </LinearGradient>
            </TouchableOpacity>
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
    color: '#00983a',
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
