import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function Loading() {
  return (
    <View
      style={{
        width:'100%',
        height:'100%',
        position:'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        // flex: 1,
        backgroundColor: 'rgba(230,230,230,0.5)',
      }}>
      <ActivityIndicator size={wp('20%')} color="green" />
    </View>
  );
}

const styles = StyleSheet.create({});
