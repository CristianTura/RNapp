import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect, useRef, useState } from 'react';
import {
  BackHandler,
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
import CarouselHome from '../components/CarouselHome';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import SplashScreen2 from '../components/SplashScreen2';
// import SplashScreen from 'react-native-splash-screen';

const HomeScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [boton, setBoton] = useState(null);
  const isMounted = useRef(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    isMounted.current = true;
    const getToken = async () => {
      const value = await AsyncStorage.getItem('token');
      if (isMounted.current) setBoton(value);
    };
    getToken();
    return () => {
      isMounted.current = false;
    };
  }, [isFocused]);

  useEffect(() => {
    const performTimeConsumingTask = async () => {
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve('result');
        }, 2000)
      );
    };
    let isActive = true;
    (async () => {
      await performTimeConsumingTask();
      if (isActive) setIsLoading(false);
    })();
    return () => {
      isActive = false;
    };
  }, []);

  useEffect(
    () =>
      props.navigation.addListener('beforeRemove', (e) => {
        e.preventDefault();
        BackHandler.exitApp();
      }),
    [props.navigation],
  );

  useEffect(() => {
    // Lock to landscape orientation
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    
    // Cleanup function to restore default orientation when component unmounts
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  if (isLoading) {
    return (
      <SafeAreaWrapper backgroundColor="#ffffff">
        <View>
          <SplashScreen2 />
        </View>
      </SafeAreaWrapper>
    );
  }

  if (boton !== 'null' && boton !== null) {
    return (
      <SafeAreaWrapper backgroundColor="#ffffff">
        <ImageBackground
          style={styles.background}
          source={require('../../assets/fondoHS.png')}
        >
          <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.ScrollBackground}>
            <View
              style={{
                marginTop: '15%',
                alignItems: 'center',
                height: '50%',
                width: '95%',
              }}
            >
              <CarouselHome />
            </View>
            <TouchableOpacity
              style={[styles.button, { marginTop: wp('30%') }]}
              onPress={() => props.navigation.navigate('MyDrawer')}
              // onPress={() => props.navigation.navigate('HomeSesion')}
            >
              <LinearGradient
                style={styles.buttonGradient}
                colors={['#20397e', '#030b4b']}
                start={{ x: 0.5, y: 0.3 }}
              >
                <Text style={styles.buttonText}>Continuemos</Text>
              </LinearGradient>
            </TouchableOpacity>
            <View style={styles.ayuda}>
              <Text style={styles.ayudaText}>Necesitas ayuda? </Text>
              <TouchableOpacity onPress={() => props.navigation.navigate('Contactenos')}>
                <Text style={styles.contactoText}>Contáctanos</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ImageBackground>
      </SafeAreaWrapper>
    );
  }

  if (boton === 'null' || boton === null) {
    return (
      <SafeAreaWrapper backgroundColor="#ffffff">
        <ImageBackground
          style={styles.background}
          source={require('../../assets/fondoHS.png')}
        >
          <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.ScrollBackground}>
            <View
              style={{
                marginTop: '15%',
                alignItems: 'center',
                height: '50%',
                width: '95%',
              }}
            >
              <CarouselHome />
            </View>
            <TouchableOpacity
              style={[styles.button, { marginTop: wp('10%') }]}
              onPress={() => props.navigation.navigate('Registro')}
            >
              <LinearGradient
                style={styles.buttonGradient}
                colors={['#20397e', '#030b4b']}
                start={{ x: 0.5, y: 0.3 }}
              >
                <Text style={styles.buttonText}>Registrarse</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => props.navigation.navigate('InicioSesion')}
            >
              <LinearGradient
                style={styles.buttonGradient}
                colors={['#20397e', '#030b4b']}
                start={{ x: 0.5, y: 0.3 }}
              >
                <Text style={styles.buttonText}>Iniciar sesión</Text>
              </LinearGradient>
            </TouchableOpacity>
            <View style={styles.ayuda}>
              <Text style={styles.ayudaText}>Necesitas ayuda? </Text>
              <TouchableOpacity onPress={() => props.navigation.navigate('Contactenos')}>
                <Text style={styles.contactoText}>Contáctanos</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ImageBackground>
      </SafeAreaWrapper>
    );
  }

  return null;
};

export default HomeScreen;

const styles = StyleSheet.create({
  buttonText: {
    color: '#fff',
    marginHorizontal: '30%',
    // height: Platform.OS == 'ios' ? hp('4%') : null, //ESTILO UTILIZADO PARA IOS. VERIFICAR EN ANDROID
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: wp('5%'),
    fontFamily: 'Roboto-Regular',
    // borderRadius: 5,
    // flex:1,
  },

  background: {
    height: '100%',
    width: '100%',
    flex:1,
    alignItems: 'center',
    resizeMode: 'cover',
  },

  ScrollBackground: {
    height: '100%',
    width: '100%',
    flex:1,
    // alignItems: 'center',
    resizeMode: 'cover',
    // backgroundColor:'green'
  },

  button: {
    marginTop: '5%',
    marginBottom: '2%',
    borderRadius: wp('3%'),
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 1.0,
    elevation: 10,
    width: '90%',
    // height: '8%',
  },

  buttonGradient: {
    padding: wp('5%'),
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: wp('5%'),
    justifyContent: 'center',
  },

  ayuda: {
    flexDirection: 'row',
    marginTop: hp('2%'),
  },

  ayudaText: {
    fontFamily: 'Roboto-Medium',
    color: '#20397e',
    letterSpacing: 0.5,
    fontSize: wp('4%'),
  },

  contactoText: {
    color: '#00008b',
    fontFamily: 'Roboto-Medium',
    letterSpacing: 0.5,
    fontSize: wp('4%'),
  },
});
