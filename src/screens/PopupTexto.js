import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import RenderHtml from 'react-native-render-html';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomAvatar from '../components/CustomAvatar';

export default function PopupTexto(props) {
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3620397e',
      }}>

      <View style={styles.popupContainer}>
        <View
          style={{
            // flex: 2,
            elevation: 14,
            width: wp('35%'),
            height: wp('41%'),
            position: 'absolute',
            marginTop: -wp('3%'),
            bottom: 0, //para mantener la imagen alineada al fondo (bottom)
          }}>
          <ImageBackground
            style={{flex: 1, resizeMode: 'contain'}}
            source={require('../../assets/tobiaspop.png')}
          />
        </View>
        <View style={{flexDirection: 'row',marginVertical:hp('3%')}}>
          <View
            style={{
              // flex: 6,
              marginLeft: wp('32%'),
              width:'73%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {/* <Text style={styles.texto}><Text>{props.numero}.</Text>{' '}{props.texto}</Text> */}
            <ScrollView>
              <View style={{flexDirection: 'row', width:wp('95%')}}>
                <Text style={[styles.texto]}>
                  {props.numeroPopup}.{' '}
                </Text>
                
                <RenderHtml
                  containerStyle={[styles.texto,{paddingRight:wp('10%')}]}
                  tagsStyles={{
                    p: styles.texto,
                    span: styles.texto,
                  }}
                  source={{html: props.texto}}
                />
              </View>
            </ScrollView>
            {/* <Text style={styles.texto}>{props.texto}</Text> */}
          </View>
          <View style={{alignItems: 'flex-end', flex: 1}}>
            <CustomAvatar
              onPress={() => props.onClose()}
              rounded
              containerStyle={{backgroundColor: '#fa4616'}}
              size={wp('7%')}
              icon={{name: 'close', size: wp('5%')}}
              overlayContainerStyle={{top: -2, left: -2}}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  popupContainer: {
    backgroundColor: '#fff',
    elevation: 20,
    zIndex: 10,
    shadowOffset: {width: 1, height: 3},
    shadowRadius: wp('0.1%'),
    shadowOpacity: 0.3,
    shadowColor: 'black',
    width: hp('75%'),
    borderRadius: wp('5%'),
    maxHeight: wp('80%'),
    padding: wp('3%'),
  },

  texto: {
    fontFamily: 'Roboto-Regular',
    fontSize: wp('4%'),
    color: '#6d6d6d',
    textAlign:'left',
    // padding:wp('3%'),
    // marginVertical: hp('3%'),
    // textAlignVertical: 'center',
    // textAlign: 'center',
  },
});
