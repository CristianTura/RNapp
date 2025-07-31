import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect } from 'react';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import RenderHtml from 'react-native-render-html';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomAvatar from '../components/CustomAvatar';
import PopupNavegacionTabla from './PopupNavegacionTabla';


export default function PopupTextoNavegacion(props) {
  const [renderNavegacionItem, setRenderNavegacionItem] = React.useState(false);
  const [indexItemSeleccionado, setIndexItemSeleccionado] = React.useState('');
  const [idItems, setIdItems] = React.useState('');
  const [itemSeleccionado, setItemSeleccionado] = React.useState('');
  const [dataModal, setDataModal] = React.useState({});
  let itemIdArray=[];

  useEffect(() => {
    // Lock to landscape orientation
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    
    // Cleanup function to restore default orientation when component unmounts
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  if (renderNavegacionItem==true){
    return (
      <PopupNavegacionTabla
        navigation={props.navigation}
        itemsNavegacionId={idItems}
        indexItemSeleccionado={indexItemSeleccionado}
        itemSeleccionado={itemSeleccionado}
        itemsNavegacion={props.itemsNavegacion}
        onClose={props.onClose}
      />
    );
  }

  const openPopupNavegacionTabla = (index, itemIdArray, item) => {
    setIdItems(itemIdArray);
    setIndexItemSeleccionado(index);
    setItemSeleccionado(item);
    setRenderNavegacionItem(true);
  }

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
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              flex: 6,

              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {/* <Text style={styles.texto}><Text>{props.numero}.</Text>{' '}{props.texto}</Text> */}

            <View style={{flexDirection:  'row'}}>
              <Text style={[styles.texto, {marginLeft: wp('3%'), alignSelf: 'flex-start'}]}>
                {props.numeroPopup}.{' '}
              </Text>
              <RenderHtml
                containerStyle={styles.texto}
                tagsStyles={{
                  p: styles.texto,
                  span: styles.texto,
                }}
                source={{html: props.texto}}
              />
            </View>
            <ScrollView
              persistentScrollbar={true}
              style={{
                marginLeft: wp('45%'),
                height: '50%',
                width: wp('70%'),
              }}>
              <View
                style={{
                  paddingVertical: wp('1%'),
                }}>
                {props.itemsNavegacion.map((item, index) => {
                  itemIdArray.push(item.temario);

                  return (
                    <View style={{marginVertical: hp('1%')}} key={index}>
                      <Pressable
                        onPress={() => {
                          openPopupNavegacionTabla(index, itemIdArray, item)
                        }}
                        children={({pressed}) => {
                          return (
                            <View
                              style={{
                                flexDirection: 'row',
                                backgroundColor: pressed
                                  ? '#00983a'
                                  : '#20397e',
                                width: wp('61%'),
                                borderRadius: wp('20%'),
                                alignItems: 'center',
                                padding: wp('2%'),
                              }}>
                              <CustomAvatar
                                size={wp('8%')}
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
                                overlayContainerStyle={{top: -2, left: -2}}
                              />
                              <View style={{width: '90%'}}>
                                <Text
                                  style={{
                                    color: '#fff',
                                    fontSize: wp('3.5%'),
                                    marginHorizontal: hp('1%'),
                                    flexWrap: 'wrap',
                                  }}>
                                  {item.cuerpo}
                                </Text>
                              </View>
                            </View>
                          );
                        }}
                      />
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>
          <View style={{alignItems: 'flex-end', flex: 1}}>
            <CustomAvatar
              onPress={() => props.onClose()}
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
    marginBottom: hp('3%'),
    textAlignVertical: 'center',
    textAlign: 'justify',
    
  },
});
