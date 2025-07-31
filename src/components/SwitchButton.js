import React from 'react';
import {StyleSheet, Text, View, Switch} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function SwitchButton({text,toggleSwitch,isEnabled}) {
  
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.switchText}>{text}</Text>
        <Switch
          trackColor={{false: '#d8d8d8', true: '#d8d8d8'}}
          style={{transform: [{scaleX: wp('0.3%')}, {scaleY: wp('0.3%')}]}}
          thumbColor={
            isEnabled ? '#00983a' : '#7c7d7d' /* color del botón redondo*/
          }
          ios_backgroundColor="#d8d8d8"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View style={styles.horizontalLine} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  switchText: {
    color: '#7c7d7d',
    fontFamily: 'Roboto-Regular',
    // fontSize: 16,
    fontSize:  wp('5%'),
    // padding: 10,
    padding:  wp('2%'),
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e6e6e6',
    // width: '100%',
    width:  wp('100%'),
    // marginVertical: 10,
    marginVertical:  hp('2%'),
  },
});
