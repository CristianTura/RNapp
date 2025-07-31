import { LinearGradient } from 'expo-linear-gradient';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect } from 'react';
import {
  ImageBackground, ScrollView, StyleSheet,
  Text, TouchableOpacity, View
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import Triangle from '../components/Triangle';

export default function AgricultoresPop(props) {
  const scrollView = React.useRef(null);
  
  useEffect(() => {
    // Lock to landscape orientation
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    
    // Cleanup function to restore default orientation when component unmounts
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
    <SafeAreaWrapper backgroundColor='#f5f5f0'>
    <ScrollView
      horizontal={true}
      style={{flex: 1}}
      ref={scrollView}
      onContentSizeChange={() => scrollView.current.scrollToEnd({animated: true})}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/fondo-agri-pop.png')}
          style={styles.fondo}>
          <Triangle
            width={wp('10%')}
            height={wp('4%')}
            color={'#f5f5f0'}
            direction={'up'}
            style={{marginTop: hp('12%'), marginLeft: wp('210%')}}
          />
          <View style={styles.globo}>
            <Text style={styles.texto}>
              Puedes hacer zoom para observar con mayor detalle las actividades
              y situaciones que se presentan.
            </Text>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate(props.route.params.ambienteScreen)
              }>
              <LinearGradient
                colors={['#1ad17c', '#19ce79', '#099941']}
                start={{x: 0.3, y: 0.5}}
                end={{x: 1, y: 0.5}}
                locations={[0, 0.7, 1]}
                style={styles.regresarButton}>
                <Text style={styles.regresarText}>Continuar</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: wp('10%'),
              height: wp('10%'),
              marginTop: hp('10%'),
              marginLeft: wp('180%'),
              position: 'absolute',
            }}>
            <ImageBackground
              style={{flex: 1, resizeMode: 'cover', elevation: 10}}
              source={require('../../assets/perfil-aleatorio-amarillo.png')}
            />
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },

  fondo: {
    flex: 1,
    resizeMode: 'contain',
  },

  globo: {
    backgroundColor: '#f5f5f0',
    width: wp('50%'),
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginLeft: wp('180%'),
    marginRight: wp('5%'),
    alignItems: 'center',
  },

  texto: {
    fontFamily: 'Roboto-Regular',
    color: '#00983a',
    fontSize: wp('3%'),
    padding: wp('3%'),
    paddingHorizontal: wp('5.2%'),
  },

  regresarButton: {
    borderRadius: 25,
    padding: wp('1.5%'),
    alignItems: 'center',
    marginBottom: hp('2%'),
  },

  regresarText: {
    marginHorizontal: wp('3%'),
    color: '#f5f5f0',
    fontFamily: 'Roboto-Regular',
    fontSize: wp('3.5%'),
  },
});
