import { LinearGradient } from 'expo-linear-gradient';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect, useRef, useState } from 'react';
import { AppState, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import RenderHtml from 'react-native-render-html';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleIcons from 'react-native-vector-icons/SimpleLineIcons';
import dataAmbientes from '../../data/dataAmbientes';
import { useAudio } from '../../utils/AudioContext';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import TemarioBloque from './TemarioBloque';

export default function TemarioBloques(props) {
  const [renderPortada, setRenderPortada] = useState(false); //Booleano para activar el renderizado de las portadas
  const [itemSeleccionado, setItemSeleccionado] = useState('');
  const [indexSeleccionado, setIndexSeleccionado] = useState('');
  const [secciones, setSecciones] = useState(new Array())
  const [contadorSecciones, setContadorSecciones] = useState(0)
  const [bloquearSiguiente, setBloquearSiguiente] = useState(false)
  const { setForegroundVolume, isMuted, toggleMute } = useAudio();

  const refScrollView = useRef(null);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const { width } = useWindowDimensions();

  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
        setForegroundVolume(0.1);
      } else {
        console.log('App is inactive')
        setForegroundVolume(0);
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      // console.log("AppState", appState.current);
    });

    return () => {
      if(subscription) subscription.remove();
    };
  }, []);

  useEffect(()=>{
    if (isMuted || appState.current.match(/inactive|background/)){
      setForegroundVolume(0.0);
    } else {
      setForegroundVolume(0.1);
    }
  },[isMuted])

  useEffect(() => {
    // Lock to landscape orientation
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    
    // Cleanup function to restore default orientation when component unmounts
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);


  if (renderPortada == true) {
    return (
      <TemarioBloque
        bloqueId={props.portadas[indexSeleccionado].temario}
        seleccionado={itemSeleccionado}
        index={indexSeleccionado}
        paso={props.paso}
        ambiente={props.ambiente}
        contadorItems={props.contadorItems}
        setContadorItems={props.setContadorItems}
        temarioLength={props.temarioLength}
        portadas={props.portadas}
        navigation={props.navigation}
        secciones={secciones}
        setSecciones={setSecciones}
        contadorSecciones={setContadorSecciones}
        bloquearSiguiente={bloquearSiguiente}
      />
    );
  }

  return (
    <SafeAreaWrapper backgroundColor="#ffffff">
      
    <ImageBackground
      style={styles.background}
      source={require('../../assets/fondo-modal-agricultores-azul.png')}>
      <View style={styles.modal}>
        <View style={styles.contenedorNumero}>
          <View style={styles.numero}>
            <Text
              style={{
                fontFamily: 'Roboto-Bold',
                fontSize: wp('6%'),
                color: '#f5f5f0',
              }}>
              {props.paso}
            </Text>
          </View>
        </View>
        <View style={styles.bloqueContenido}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.titulo}>{props.titulo}</Text>
            <TouchableOpacity
              onPress={() => {
                toggleMute(!isMuted);
                if (isMuted) {
                  setForegroundVolume(0.1);
                } else {
                  setForegroundVolume(0.0);
                }
              }}
              activeOpacity={0.3}
              style={{
                backgroundColor: '#fa4616',
                // padding: 3,
                padding: wp('3%'),
                borderWidth: 2,
                borderColor: '#f5f5f0',
                borderRadius: wp('10%'),
                justifyContent: 'center',
                alignContent: 'center',
                elevation: 7,
                zIndex: 7,
                shadowColor: '#d6d6d6d',
                shadowOpacity: 0.3,
                shadowColor: 'black',
                marginHorizontal: wp('2%'),
              }}>
              <SimpleIcons
                name={isMuted? 'volume-2' : 'volume-off'}
                size={wp('4.5%')}
                color="#f5f5f0"
              />
            </TouchableOpacity>
          </View>

          <ScrollView
            persistentScrollbar={true}
            style={{ width: '95%', maxHeight: '45%' }}>
            <RenderHtml
              contentWidth={width}
              containerStyle={styles.text}
              tagsStyles={{
                p: styles.text,
                span: styles.text,
              }}
              source={{ html: props.contenido }}
            />
          </ScrollView>

          {/* <Text style={[styles.text, { fontWeight: 'bold' }]}> En la etiqueta se encuentra: </Text> */}

          <View style={styles.horizontalLine} />

          <View
            style={{
              width: '95%',
              height: '15%',
              overflow: 'hidden',
            }}>
            <Text style={[styles.text]}>
              Al dar clic en cada uno de los botones que aparecen en la
              etiqueta, podrás encontrar al detalle cada uno de sus componentes.
            </Text>
          </View>

          <ScrollView
            ref={refScrollView}
            style={{ marginTop: hp('2%'), width: '95%', height: '42%' }}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {props.portadas.map((item, index) => {
                return (
                  <Pressable
                    style={{ marginHorizontal: wp('2%') }}
                    key={index}
                    onPress={() => {
                      setIndexSeleccionado(index);
                      setItemSeleccionado(item);                     
                      setRenderPortada(true);
                      let auxSecciones = secciones.slice()
                      auxSecciones.push(item.cuerpo)
                      setSecciones(auxSecciones)
                              
                     
                    }}>
                    <View style={styles.containerImagen}>
                      <Image
                        source={require('../../assets/bloque.png')}
                        style={styles.icono}
                      />
                    </View>
                    <LinearGradient
                      style={[styles.button]}
                      colors={['#20397e', '#030b4b']}
                      start={{ x: 0.5, y: 0.3 }}>
                      <View>
                        <Text
                          style={{
                            marginTop: wp('8%'),
                            fontSize: wp('5%'),
                            color: 'white',
                            fontWeight: 'bold',
                          }}>
                          {item.cuerpo}
                        </Text>
                      </View>
                    </LinearGradient>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>

          <TouchableOpacity
            onPress={() => {
              setTimeout(
                () => {
                  if(refScrollView.current){
                    refScrollView.current.scrollTo({x: 0, y: 0, animated: false})
                  }
                },
                100,
              );
              if (props.contadorItems <= 0) {
                setForegroundVolume(0.0);
                props.navigation.push(
                  dataAmbientes[parseInt(props.ambiente) - 1].screenAmbiente,
                );
              } else {
                props.setContadorItems(props.contadorItems - 1);
              }
            }}>
            <LinearGradient
              colors={['#1ad17c', '#19ce79', '#099941']}
              start={{ x: 0.3, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              locations={[0, 0.7, 1]}
              style={[styles.regresarButton]}>
              <Text style={styles.regresarText}>
                <AntDesign name="left" size={wp('3%')} color="#f5f5f0" />{' '}
                Regresar
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'flex-end',
  },

  modal: {
    height: '95%',
    width: '90%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomWidth: 0,
    borderColor: '#00983a',
    backgroundColor: '#fff',
    borderWidth: wp('1%'),
    elevation: 10,
    zIndex: 10,
    flexDirection: 'row',
    paddingVertical: wp('5%'),
  },

  contenedorNumero: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '10%',
  },

  numero: {
    backgroundColor: '#fa4616',
    borderRadius: 300,
    alignItems: 'center',
    paddingHorizontal: wp('2.3%'),
    marginTop: hp('0.8%'),
  },

  button: {
    width: hp('18%'),
    height: wp('18%'),
    borderRadius: wp('3%'),
    alignItems: 'center',
    marginTop: wp('8%'),
    // marginRight: hp('3%'),
    backgroundColor: 'green',
    // overflow:'visible',
  },

  buttonText: {
    fontSize: wp('4%'),
    fontFamily: 'Roboto-Regular',
    color: '#f5f5f0',
    // marginHorizontal: wp('5%'),
  },

  titulo: {
    fontFamily: 'Roboto-Bold',
    color: '#00983a',
    fontSize: wp('5%'),
    marginBottom: hp('2%'),
  },

  contenido: {
    fontFamily: 'Roboto-Regular',
    color: '#6d6d6d',
    fontSize: wp('5%'),
    lineHeight: hp('4%'),
  },

  bloqueContenido: {
    width: '90%',
  },

  horizontalLine: {
    backgroundColor: '#bac5b9',
    height: hp('0.2%'),
    width: '95%',
    marginVertical: hp('1%'),
  },
  icono: {
    width: hp('3.5%'),
    height: hp('4.5%'),
    // flex:1,
    // resizeMode:'center'
  },
  containerImagen: {
    width: hp('7%'),
    height: hp('7%'),
    backgroundColor: 'white',
    position: 'absolute',
    // top: wp('-8%'),
    borderRadius: wp('100%'),
    borderWidth: wp('0.5%'),
    borderColor: '#20397e',
    elevation: 10,
    zIndex: 10,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {
    fontSize: wp('3.5%'),
    fontFamily: 'Roboto-Regular',
  },

  regresarButton: {
    borderRadius: 35,
    // padding: 5,
    padding: wp('1%'),
    marginTop: hp('1%'),
    alignSelf: 'flex-start',
    // marginHorizontal: wp('2%'),
  },

  regresarText: {
    // marginHorizontal: 5,
    marginHorizontal: wp('2%'),
    color: '#f5f5f0',
    fontFamily: 'Roboto-Regular',
    fontSize: wp('3.5%'),
  },
});
