import React from 'react';
import {
  View,
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CarouselHomeItem = ({item, index}) => {
  return (
    <View style={styles.container} key={index}>
      {/* <View style={{height:'10%',width:'100%'}} /> */}
      {Platform.OS == 'ios' ? (
        <ImageBackground style={styles.image} source={item.imgPath} />
      ) : null}
      {Platform.OS == 'android' ? (
        <Image style={styles.image} source={item.imgPath} />
      ) : null}
      {/* <View
        style={{
          position: 'absolute',
          marginTop:'0.5%',
          marginLeft: '45%',
          marginRight: '25%',
          height: '18%',
        }}>
        <Text style={{backgroundColor: 'yellow', margin:6}}>{item.text}</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // height: hp('75%'),
    // width: wp('80%'),
    height: Platform.OS == 'ios' ? wp('75%') : wp('75%'),
    width: Platform.OS == 'ios' ? wp('90%') :  wp('100%'),
  },

  image: {
    resizeMode: 'contain',
    // alignSelf: 'center',
    flex: 1,
  },
});

export default CarouselHomeItem;
