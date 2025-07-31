import { LinearGradient } from 'expo-linear-gradient';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function FondoVistasDrawer({navigation}) {
  return (
    <LinearGradient
      style={styles.background1}
      colors={['#2d71b0', '#20397e']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <View style={styles.header}>
        <View style={{width: wp('45%'), height: wp('16%'),}}>
          <ImageBackground
            style={styles.logo}
            source={require('../../assets/logoHorizontal.png')}
          />
        </View>

        <View > 
          <TouchableOpacity
            style={{
              backgroundColor: '#f5f5f0',
              borderRadius: 50,
              // marginTop: '13%',
              // marginLeft: '70%',
              // alignSelf: 'flex-start',
            }}
            onPress={() => navigation.goBack()}>
            <Text
              style={{
                fontFamily: 'Roboto-Regular',
                // fontSize: 13,
                fontSize: wp('4%'),
                color: '#20397e',
                // padding: 6,
                padding:      wp('2%'),
                // marginHorizontal: 8,
                marginHorizontal:      wp('1.5%'),
              }}>
              Regresar{' '}
              <AntDesign name="right" size={wp('3.5%')} color="#20397e" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background1: {
    // width: '100%',
    width: wp('100%'),
    height: wp('35%'),
    opacity: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    // borderWidth: 1,
    borderColor: 'transparent',
    // borderTopWidth: 0,
    overflow: 'hidden',
    alignItems:      'center',
    // position: 'absolute',
  },

  header: {
    width:      wp('90%'),
    marginTop: hp('5%'),
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logo: {
    // width: 140,
    // height: 48,
    // marginRight: '25%',
    flex: 1,
    resizeMode: 'contain',
  },
});
