import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect } from 'react';
import { Image, ImageBackground, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useAudio } from '../../utils/AudioContext';

export default function BannerPreguntas({ambiente, idAmbiente, navigation}) {
  const { setForegroundVolume } = useAudio();
  
  useEffect(() => {
    // Lock to landscape orientation
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    // Cleanup function to restore default orientation when component unmounts
    return () => {
    ScreenOrientation.unlockAsync();
    };
  }, []);
  
  return (
    <View
      style={{
        height: Platform.OS == 'android' ? '15%' : '15%',
        width: '100%',
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        overflow: 'hidden',
      }}>
      <Image
        style={{flex: 1, resizeMode: 'cover'}}
        source={require('../../assets/banner-preguntas.png')}
      />

      <View style={styles.header}>
        <View
          style={{
            height: wp('10%'),
            width: wp('35'),
          }}>
          <ImageBackground
            style={styles.logo}
            source={require('../../assets/logoHorizontal.png')}
          />
        </View>

        <Text
          style={{
            fontFamily: 'Roboto-Regular',
            fontSize: wp('5.5%'),
            color: '#f5f5f0',
          }}>
          {ambiente}
        </Text>
        <Pressable
          onPress={() => {
            setForegroundVolume(0.0);
            idAmbiente == 1 || idAmbiente == '1'
              ? navigation.push('AgriHome')
              : idAmbiente == 2 || idAmbiente == '2'
              ? navigation.push('AbejasHome')
              : idAmbiente == 3 || idAmbiente == '3'
              ? navigation.push('AcuaticosHome')
              : idAmbiente == 4 || idAmbiente == '4'
              ? navigation.push('AvesHome')
              : idAmbiente == 5 || idAmbiente == '5'
              ? navigation.push('TranspHome')
              : null;
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Oxygen-Bold',
                fontSize: wp('5%'),
                color: '#f5f5f0',
              }}>
              Temáticas
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    width: '93%',
    marginTop: hp('1%'),
  },

  logo: {
    // flex: 1,
    height: wp('10%'),
    width: wp('30%')

    
  },
});
