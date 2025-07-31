import {
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';
import { useEffect, useState } from 'react';
import {
  Platform,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleIcons from 'react-native-vector-icons/SimpleLineIcons';
import { getLinksApps } from '../api/api';
import PerfilHeader from '../src/components/PerfilHeader';
import SafeAreaWrapper from '../src/components/SafeAreaWrapper';

export default function CustomDrawer({progress, ...props}) {
  const [linkAndroid, setLinkAndroid] = useState('');
  const [linkIOS, setLinkIOS] = useState('');

  useEffect(() => {
    getLinksApps().then((response) => {
      setLinkAndroid(response[0][1]);
      setLinkIOS(response[1][1]);
    });
  }, [props]);

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

  let cerrarSesion = async () => {
    try {
      // Limpiar AsyncStorage
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
      props.navigation.navigate('Home');
    } catch (error) {
      console.log('Error al cerrar sesión:', error);
    }
  };

  const translateX = progress ? progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0],
  }) : 0;

  return (
    <SafeAreaWrapper backgroundColor='#f5f5f0'>
      <DrawerContentScrollView {...props}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{
              // marginLeft: '10%',
              marginLeft: wp('5%'),
              // marginRight: '1%',
              fontWeight: 'bold',
              // marginTop: '12%',
              marginTop: hp('5.5%'),
            }}
            onPress={() => props.navigation.closeDrawer()}>
            <AntDesign
              name="left"
              size={wp('11%')}
              color="#00983a"
              style={{
                fontWeight: 'bold',
              }}
            />
          </TouchableOpacity>
          <PerfilHeader
            navigation={props.navigation}
            perfilStyle={{flexDirection: 'row', justifyContent: 'space-between'}}
            textStyle={{
              color: '#00983a',
              marginRight: wp('25%'),
              marginTop: hp('5%'),
            }}
            textColor="#00983a"
            avatarSize={wp('20%')}
            avatarStyle={{marginTop: hp('4%')}}
            isEnabled={true}
          />
        </View>

        <View
          style={{
            // marginTop: '8%',
            marginTop: hp('5%'),
            height: 1,
            backgroundColor: '#d4d4d4',
            // marginBottom: '40%',
            marginBottom: hp('5%'),
          }}
        />

        <Animated.View style={{transform: [{translateX}]}}>
          {/* <DrawerItem
            label={(focused) => (
              <Text
                style={{
                  color: focused ? '#00983a' : 'red',
                  // fontSize: 13,
                  fontSize: wp('4%'),
                  // marginLeft: '10%',
                  marginLeft: wp('8%'),
                  width: wp('90%'),
                  paddingVertical: hp('0.5%'),
                }}>
                <Fontisto name="bell" size={wp('4%')} style={{marginRight: 10}} />
                {'  '}Notificaciones personalizadas{'    '}
                <AntDesign
                  name="right"
                  size={wp('3%')}
                  style={{marginLeft: 20}}
                />
              </Text>
            )}
            onPress={() =>
              props.navigation.navigate('Notificaciones personalizadas')
            }
            labelStyle={{margin: 0}}
            activeTintColor="red"
            activeBackgroundColor="#f6f6f6"
            inactiveTintColor="#7c7d7d"
          />
          <View
            style={{
              height: 1,
              backgroundColor: '#d4d4d4',
            }}
          /> */}

          <DrawerItem
            label={({focused}) => (
              <Text
                style={{
                  color: focused ? '#00983a' : '#7c7d7d',
                  // fontSize: 13,
                  fontSize: wp('4%'),
                  // marginLeft: '10%',
                  marginLeft: wp('8%'),
                  width: wp('90%'),
                  paddingVertical: hp('0.5%'),
                }}>
                <AntDesign name="sharealt" size={wp('4%')} />
                {'  '}Síguenos en redes sociales{'         '}
                <AntDesign
                  name="right"
                  size={wp('3%')}
                  style={{marginLeft: 20}}
                />
              </Text>
            )}
            // icon={({focused, color, size}) => (
            //   <AntDesign name="sharealt" size={15} color={color} />
            // )}
            onPress={() =>
              props.navigation.navigate('Síguenos en redes sociales')
            }
            labelStyle={{margin: 0}}
            activeTintColor="#00983a"
            activeBackgroundColor="#f6f6f6"
            inactiveTintColor="#7c7d7d"
          />
          <View
            style={{
              height: 1,
              backgroundColor: '#d4d4d4',
            }}
          />

          <DrawerItem
            label={({focused}) => (
              <Text
                style={{
                  color: focused ? '#00983a' : '#7c7d7d',
                  // fontSize: 13,
                  fontSize: wp('4%'),
                  // marginLeft: '10%',
                  marginLeft: wp('8%'),
                  width: wp('90%'),
                  paddingVertical: hp('0.5%'),
                }}>
                <Ionicons name="arrow-redo" size={wp('4%')} />
                {'  '}Recomendar app{'                           '}
                <AntDesign
                  name="right"
                  size={wp('3%')}
                  style={{marginLeft: 20}}
                />
              </Text>
            )}
            onPress={onShare}
          />
          <View
            style={{
              height: 1,
              backgroundColor: '#d4d4d4',
            }}
          />

          <DrawerItem
            label={({focused}) => (
              <Text
                style={{
                  color: focused ? '#00983a' : '#7c7d7d',
                  // fontSize: 13,
                  fontSize: wp('4%'),
                  // marginLeft: '10%',
                  marginLeft: wp('8%'),
                  width: wp('90%'),
                  paddingVertical: hp('0.5%'),
                }}>
                <Ionicons name="settings-outline" size={wp('4%')} />
                {'  '}Ayuda o soporte{'                            '}
                <AntDesign
                  name="right"
                  size={wp('3%')}
                  style={{marginLeft: 20}}
                />
              </Text>
            )}
            onPress={() => props.navigation.navigate('Ayuda o soporte')}
          />
          <View
            style={{
              height: 1,
              backgroundColor: '#d4d4d4',
            }}
          />

          <DrawerItem
            label={({focused}) => (
              <Text
                style={{
                  color: focused ? '#00983a' : '#7c7d7d',
                  // fontSize: 13,
                  fontSize: wp('4%'),
                  // marginLeft: '10%',
                  marginLeft: wp('8%'),
                  width: wp('90%'),
                  paddingVertical: hp('0.5%'),
                }}>
                <MaterialIcons name="comment-question-outline" size={wp('4%')} />
                {'  '}Sugerencias o FAQ{'                       '}
                <AntDesign
                  name="right"
                  size={wp('3%')}
                  style={{marginLeft: 20}}
                />
              </Text>
            )}
            onPress={() => props.navigation.navigate('Sugerencias o FAQ')}
          />
          <View
            style={{
              height: 1,
              backgroundColor: '#d4d4d4',
            }}
          />

          <DrawerItem
            label={({focused}) => (
              <Text
                style={{
                  color: focused ? '#00983a' : '#7c7d7d',
                  // fontSize: 13,
                  fontSize: wp('4%'),
                  // marginLeft: '10%',
                  marginLeft: wp('8%'),
                  width: wp('90%'),
                  paddingVertical: hp('0.5%'),
                }}>
                <SimpleIcons name="lock" size={wp('4%')} />
                {'  '}Políticas de privacidad{'                '}
                <AntDesign
                  name="right"
                  size={wp('3%')}
                  style={{marginLeft: 20}}
                />
              </Text>
            )}
            onPress={() => props.navigation.navigate('Políticas de privacidad')}
          />
          <View
            style={{
              height: 1,
              backgroundColor: '#d4d4d4',
            }}
          />

          <DrawerItem
            label={({focused}) => (
              <Text
                style={{
                  color: focused ? '#00983a' : '#7c7d7d',
                  // fontSize: 13,
                  fontSize: wp('4%'),
                  // marginLeft: '10%',
                  marginLeft: wp('8%'),
                  width: wp('90%'),
                  paddingVertical: hp('0.5%'),
                }}>
                <MaterialIcons
                  name="checkbox-marked-circle-outline"
                  size={wp('4%')}
                />
                {'  '}Términos y condiciones{'              '}
                <AntDesign
                  name="right"
                  size={wp('3%')}
                  style={{marginLeft: 20}}
                />
              </Text>
            )}
            // onPress={() => props.navigation.navigate('Términos y condiciones')}
          />
          <View
            style={{
              height: 1,
              backgroundColor: '#d4d4d4',
            }}
          />

          <DrawerItem
            label={({focused}) => (
              <Text
                style={{
                  color: focused ? '#00983a' : '#7c7d7d',
                  // fontSize: 13,
                  fontSize: wp('4%'),
                  // marginLeft: '10%',
                  marginLeft: wp('8%'),
                  width: wp('90%'),
                  paddingVertical: hp('0.5%'),
                }}>
                <MaterialIcons name="bag-personal-off-outline" size={wp('4%')} />
                {'  '}Eliminar cuenta{'                             '}
                <AntDesign
                  name="right"
                  size={wp('3%')}
                  style={{marginLeft: 20}}
                />
              </Text>
            )}
            onPress={() => props.navigation.navigate('Eliminar cuenta')}
          />
          <View
            style={{
              height: 3,
              backgroundColor: '#d4d4d4',
            }}
          />

          <DrawerItem
            label={({focused}) => (
              <Text
                style={{
                  color: focused ? '#00983a' : '#7c7d7d',
                  // fontSize: 16,
                  fontSize: wp('4.5%'),
                  fontFamily: 'Roboto-Medium',
                  letterSpacing: 0.8,
                  // marginLeft: '10%',
                  marginLeft: wp('8%'),
                  paddingBottom: hp('1%'),
                }}>
                <Ionicons name="log-out-outline" size={wp('4.5%')} />
                {'  '}Cerrar sesión
              </Text>
            )}
            onPress={() => cerrarSesion()}
          />
        </Animated.View>
      </DrawerContentScrollView>
    </SafeAreaWrapper>
    // {/* </View> */}
  );
}

const styles = StyleSheet.create({});
