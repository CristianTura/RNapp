import { useEffect, useState } from 'react';
import {
  Linking,
  Platform,
  Share,
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getLinksApps } from '../../api/api';
import CustomAvatar from '../components/CustomAvatar';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import Fondo from '../components/SoporteComp';

export default function Redes({navigation}) {
  const [linkAndroid, setLinkAndroid] = useState('');
  const [linkIOS, setLinkIOS] = useState('');
  
  useEffect(() => {
    getLinksApps().then((response) => {
      setLinkAndroid(response[0][1]);
      setLinkIOS(response[1][1]);
    });
  }, []);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          Platform.OS == 'ios'
            ? 'Te invito a descargar la app Tobias BPA en App Store: ' +
              linkIOS
            : 'Te invito a descargar la app Tobias BPA en Play Store: ' +
              linkAndroid,
        url: Platform.OS == 'ios' ? linkIOS : linkAndroid,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaWrapper backgroundColor='#f5f5f0'>
    <View
      style={{backgroundColor: '#fff', height: '100%', alignItems: 'center'}}>
      <View>
        <Fondo navigation={navigation} />
      </View>
      <View>
        <View
          style={{
            // marginTop: '40%',
            marginTop: hp('6%'),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CustomAvatar
            size={wp('30%')}
            source={require('../../assets/perfil-aleatorio.png') }
            activeOpacity={0.5}
            containerStyle={{
              backgroundColor: '#a9a9a9',
              borderColor: '#FFA500',
              borderWidth: wp('0.7%'),
              marginBottom: hp('3%'),
              elevation: 10,
            }}
          />
          <View
            style={{
              elevation: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#00983a',
                fontFamily: 'Oxygen-Bold',
                // fontSize: 16,
                fontSize: wp('6%'),
                marginBottom: hp('2%'),
                paddingHorizontal: wp('25%'),
                textAlign: 'center',
              }}>
              Redes Sociales
            </Text>

            <View style={styles.horizontalLine} />
          </View>
        </View>

        <View
          style={{
            elevation: 11,
            alignSelf: 'center',
            paddingHorizontal: wp('20%'),
            marginTop: hp('1%'),
          }}>
          <Text
            style={{
              color: '#6d6d6d',
              fontFamily: 'Roboto-Regular',
              fontSize: wp('4.5%'),
              textAlign: 'center',
            }}>
            Síguenos en nuestras redes sociales para que estés al día con TOBÍAS
            BPA.
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            // marginHorizontal: '23%',
            paddingHorizontal: wp('23%'),
            // marginTop: '10%',
            marginTop: hp('2%'),
            elevation: 10,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#4f7ab5',
              borderRadius: 80,
              width: wp('18%'),
              height: wp('18%'),
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: wp('3%'),
            }}
            onPress={() =>
              Linking.openURL('https://www.facebook.com/tobias.bpa')
            }>
            <FontAwesome name="facebook-f" size={wp('12%')} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              borderRadius: 80,
              width: wp('18%'),
              height: wp('18%'),
              overflow: 'hidden',
              marginHorizontal: wp('3%'),
              backgroundColor: '#00ACEE',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => Linking.openURL('https://twitter.com/tobias_bpa')}>
            {/* <RadialGradient
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}
              colors={['#5c33f9', '#ff2d80', '#ffd960']}
              stops={[0.1, 0.5, 0.7]}
              center={[wp('14%'), 0]}
              radius={wp('27%')}>
              <Fontisto name="instagram" size={wp('12%')} color="#fff" />
            </RadialGradient> */}
            {/* <Image
              source={require('../../assets/instagram.png')}
              style={{width: wp('18%'), height: wp('18%')}}
            /> */}
            {/* <AntDesign name="x" size={wp('12%')} color="#fff" /> */}
            <CustomAvatar
              size={wp('18%')}
              source={require('../../assets/x.png') }
              containerStyle={{
                backgroundColor: '#000',
                borderColor: '#000',
                // borderWidth: wp('0.7%'),
                // marginBottom: hp('3%'),
                // elevation: 10,
              }}
              onPress={() => Linking.openURL('https://twitter.com/tobias_bpa')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: '#6236ff',
              borderRadius: 80,
              width: wp('18%'),
              height: wp('18%'),
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: wp('3%'),
            }}
            onPress={onShare}>
            <AntDesign name="sharealt" size={wp('12%')} color="#fff" />
            {/* <XOutlined /> */}
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  image: {
    // height: 60,
    height: wp('18%'),
    // width: 60,
    width: wp('18%'),
    // marginHorizontal: '12%',
    marginHorizontal: wp('5%'),
  },

  horizontalLine: {
    // flex: 1,
    height: hp('0.3%'),
    backgroundColor: '#e6e6e6',
    width: wp('85%'),
    // width: '100%',
    // width: wp('60%'),
    // marginTop: '37%',
    // marginTop: hp('15%'),
  },
});
