import { LinearGradient } from 'expo-linear-gradient';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect } from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import data from '../../data/dataGlobosAmbientes';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import Triangle from '../components/Triangle';


export default function AgricultoresSplash(props) {
  console.log('AgricultoresSplash')
  
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
      <ImageBackground
        style={styles.bg}
        source={require('../../assets/fondoAgriSplash.png')}>
        <View
          style={{
            flexDirection: 'row',
            height: '90%',
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={styles.img}
              source={require('../../assets/tobiasAgriSplash.png')}
            />
          </View>

          <View style={{flexDirection: 'row', flex: 1}}>
            <Triangle
              width={wp('5%')}
              height={wp('5%')}
              color={'#f5f5f0'}
              direction={'left'}
              style={{marginTop: hp('6%')}}
            />
            <View>
              <View
                style={{
                  backgroundColor: '#f5f5f0',
                  borderRadius: 20,
                  padding: wp('4%'),
                  width: wp('80%'),
                  marginTop: hp('2%'),
                  maxHeight: wp('58%'),
                }}>
                <ScrollView persistentScrollbar={true}>
                  <Text style={styles.text}>
                    {data[props.route.params.ambiente - 1].contenido}
                  </Text>
                </ScrollView>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                  <LinearGradient
                    style={styles.button}
                    colors={['#1ad17c', '#099941']}
                    end={{x: 0.5, y: 0.3}}>
                    <Text style={styles.buttonText}>Regresar</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('AgriPop', {
                      ambienteScreen:
                        data[props.route.params.ambiente - 1].screenAmbiente,
                    })
                  }>
                  <LinearGradient
                    style={styles.button}
                    colors={['#1ad17c', '#099941']}
                    end={{x: 0.5, y: 0.3}}>
                    <Text style={styles.buttonText}>Continuar</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  bg: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    flex: 1,
    resizeMode: 'contain',
    marginTop: hp('5%'),
  },
  text: {
    color: '#00983a',
    fontSize: wp('5%'),
    fontFamily: 'Roboto-Regular',
  },

  button: {
    padding: wp('3%'),
    borderRadius: 50,
    marginHorizontal: wp('1%'),
    marginVertical: hp('3%'),
  },

  buttonText: {
    fontSize: wp('5%'),
    fontFamily: 'Roboto-Regular',
    color: '#f5f5f0',
    marginHorizontal: wp('5%'),
  },
});

