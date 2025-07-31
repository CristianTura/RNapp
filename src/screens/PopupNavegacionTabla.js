import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { Image } from 'expo-image';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { getTemarioById } from '../../api/api';
import CustomAvatar from '../components/CustomAvatar';
import Loading from '../screens/Loading';


export default function PopupNavegacionTabla(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [tablaItems, setTablaItems] = useState([]);
  const [selected, setSelected] = useState(null);
    // this.tablaItems = tablaItems.slice();

  const scrollViewRef = useRef(null);

  const conexion = () => {
    Alert.alert(
      'Error de conexión',
      'No tienes conexión a internet. Puede que algunas opciones no se carguen correctamente. Intenta más tarde.',
      [
        {
          text: 'Cerrar',
          style: 'cancel',
        },
      ],
    );
  };

  React.useEffect(() => {
    setIsLoading(true);
    AsyncStorage.getItem('token').then((token) => { 
      NetInfo.fetch().then((state) => {
        if (state.isConnected == true) {
          // Crear un array de promesas para todas las llamadas
          const promises = props.itemsNavegacionId
            .filter(id => id != null)
            .map(id => getTemarioById(token, id));
          
          // Esperar a que todas las promesas se resuelvan
          Promise.all(promises)
            .then((responses) => {
              setTablaItems(responses);
              setIsLoading(false);
            })
            .catch((error) => {
              console.log('Error loading items:', error);
              setTablaItems([]);
              setIsLoading(false);
            });
        } else {
          conexion();
          setIsLoading(false);
        }
      });
    });
  }, [props?.itemsNavegacionId]);

  useEffect(() => {
    if(tablaItems.length > 0){
      setSelected(tablaItems[props.indexItemSeleccionado])
    }
  }, [props.indexItemSeleccionado, tablaItems])
  
  useEffect(() => {
    // Lock to landscape orientation
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    
    // Cleanup function to restore default orientation when component unmounts
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);
// console.log('tablaItems', tablaItems, selected, props)
  if (isLoading){
    return <Loading />
  }
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3620397e',
      }}>
      {/* <OrientationLocker orientation={LANDSCAPE} /> */}

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
        <View
          //   contentContainerStyle={{
          //     justifyContent: 'space-between',
          //     alignItems: 'center',
          //   }}
          //   style={{flexDirection: 'row', backgroundColor: 'red'}}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <ScrollView
            horizontal={true}
            persistentScrollbar={true}
            style={{flexDirection: 'row', marginRight: wp('2%')}}>
            {tablaItems?.map((item, index) => {
              return (
                <Pressable
                  key={index}
                  onPress={() => {
                    setTimeout(
                      () => {
                        if (scrollViewRef.current) {
                          scrollViewRef.current.scrollTo({x: 0, y: 0, animated: false})
                        }
                      },
                      100,
                    );
                    setSelected(item);
                  }}
                  children={({pressed}) => {
                    return (
                      <View
                        style={{
                          flexDirection: 'row',
                          backgroundColor:
                            selected?.id == item.id ? '#00983a' : 'transparent',
                          width: selected?.id == item.id ? wp('61%') : wp('10%'),
                          borderRadius: wp('20%'),
                          overflow: 'hidden',
                          alignItems: 'center',
                          padding: wp('2%'),
                        }}>
                        <CustomAvatar
                          size={wp('7%')}
                          title={index + 1}
                          titleStyle={{
                            fontFamily: 'Roboto-Regular',
                            fontSize: wp('4%'),
                            color: '#fff',
                          }}
                          containerStyle={{
                            backgroundColor: '#efb342',
                            marginRight: wp('2%'),
                          }}
                          onPress={() =>{
                            setSelected(item)
                          }}
                          overlayContainerStyle={{top: -2, left: -2}}
                        />
                        {selected?.id == item.id ? (
                          <View style={{width: '90%'}}>
                            <Text
                              style={{
                                color: '#fff',
                                fontSize: wp('3.5%'),
                                paddingHorizontal: wp('1.5%'),
                                flexWrap: 'wrap',
                                textAlignVertical: 'center',
                              }}>
                              {item.titulo}
                            </Text>
                          </View>
                        ) : null}
                      </View>
                    );
                  }}
                />
              );
            })}
          </ScrollView>
          <CustomAvatar
            onPress={() => props.onClose()}
            rounded
            containerStyle={{
              backgroundColor: '#fa4616',
            }}
            size={wp('7%')}
            icon={{name: 'close', size: wp('5%')}}
            overlayContainerStyle={{top: -2, left: -2}}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: wp('50%'),
              width: hp('50%'),
              marginLeft: wp('32%'),
            }}>
            <ScrollView
              horizontal={true}
              persistentScrollbar={true}
              style={
                {
                  // flex: 1,
                  // width: '100%',
                }
              }>
              <ScrollView
                style={
                  {
                    // flex: 1,
                    // width: '100%',
                  }
                }
                ref={scrollViewRef}
                nestedScrollEnabled={true}
                persistentScrollbar={true}>
                <View
                  style={{
                    width: hp('50%'),
                    borderColor: '#979797',
                    borderWidth: wp('0.5%'),
                    marginTop: hp('2%'),
                    borderRadius: wp('5%'),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      //   alignItems: 'center',
                      //   justifyContent: 'center',
                      borderBottomColor: '#979797',
                      borderBottomWidth: wp('0.3%'),
                      flex: 1,
                      // width: '100%',
                    }}>
                    <View style={{width: '50%'}}>
                      <Text
                        style={{
                          fontFamily: 'Roboto-Regular',
                          color: '#6d6d6d',
                          fontSize: wp('5%'),
                          textAlign: 'center',
                          borderRightWidth: wp('0.5%'),
                          borderRightColor: '#979797',
                          paddingVertical: hp('2%'),
                        }}>
                          {
                            selected != null && selected.encabezado_imagen != null
                              ? selected?.encabezado_imagen : null
                          }
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '50%',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontFamily: 'Roboto-Regular',
                          color: '#6d6d6d',
                          fontSize: wp('5%'),
                          textAlign: 'center',
                          paddingVertical: hp('2%'),
                        }}
                      >
                        {
                          selected != null && selected.encabezado_texto != null
                            ? selected.encabezado_texto
                            : null
                        }
                      </Text>
                    </View>
                  </View>
                  {/* <Text>hola</Text> */}
                  {selected != null && selected.opciones != null ? (
                    selected.opciones.map((item, index) => {
                      return (
                        <View
                          key={index}
                          style={{flexDirection: 'row', flex: 1}}>
                          <View
                            style={{
                              width: '50%',
                              height: hp('15%'),
                              borderRightWidth: wp('0.5%'),
                              borderRightColor: '#979797',
                              paddingVertical: hp('2%'),
                            }}>
                            <Image
                                source={{uri: item.foto}}
                                style={{
                                  flex: 1,
                                  resizeMode: 'contain',
                                }}
                              />
                          </View>
                          <View
                            style={{
                              width: '50%',
                              height: hp('15%'),
                              paddingVertical: hp('2%'),
                              paddingHorizontal: wp('2%'),
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                textAlign: 'center',
                                textAlignVertical: 'center',
                                fontFamily: 'Roboto-Regular',
                                color: '#6d6d6d',
                                fontSize: wp('5%'),
                              }}>
                              {item.cuerpo}
                            </Text>
                          </View>
                        </View>
                      );
                    })
                  ) : (
                    <Loading />
                  )}
                </View>
              </ScrollView>
            </ScrollView>
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
    marginVertical: hp('3%'),
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
