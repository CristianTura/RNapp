import React from 'react';
import {StyleSheet, View} from 'react-native';
import Fondo from './FondoVistasDrawer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function SoporteComp({navigation}) {
  return (
    <View style={{alignItems:'center'}} >
      <Fondo navigation={navigation} />
      <View
        style={{
          // marginTop: '40%',
          marginTop: hp('30%'),
          // marginHorizontal: '8%',
          position: 'absolute',
        }}>
        <View
          style={{
            // width: '620%',
            width:wp('85%'),
            // height: '40%',
            height:wp('85%'),
            backgroundColor: '#f5f5f0',
            borderRadius: wp('4%'),
            shadowColor: 'black',
            shadowOffset: {width: 0, height: 5},
            shadowOpacity: 0.5,
            elevation: 10,
          }}>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
});
