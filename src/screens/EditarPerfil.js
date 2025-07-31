import NetInfo from '@react-native-community/netinfo';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  getCiudadByDepartamento,
  getConsultarUsuario,
  getCultivos,
  getDepartamentos,
  getTiposUsuario,
  postCargarImagenBase64,
  postCrearUsuario,
} from '../../api/api';
import PerfilHeader from '../components/PerfilHeader';
// import BottomSheet from 'reanimated-bottom-sheet';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAvoidingView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialComIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import ImagePicker from 'react-native-image-crop-picker';
import { Platform } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Button, Menu } from 'react-native-paper';
import SafeAreaWrapper from '../components/SafeAreaWrapper';

export default function EditarPerfil(props) {
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [tipoUsuarioID, setTipoUsuarioID] = React.useState(null);
  const [cultivoID, setCultivoID] = React.useState(null);
  const [cultivosID, setCultivosID] = React.useState(null);
  const [tipoUsuario, setTipoUsuario] = React.useState(null);
  const [departamentos2, setDepartamentos] = React.useState([]);
  const [departamento, setDepartamento] = React.useState([]);
  const [departamentoID, setDepartamentoID] = React.useState(null);
  const [tiposUsuario, setTiposUsuario] = React.useState([]);
  const [municipio2, setMunicipio2] = React.useState([]);
  const [municipio, setMunicipio] = React.useState([]);
  const [municipioID, setMunicipioID] = React.useState(null);
  const [tiposCultivo, setTiposCultivo] = React.useState([]);
  const [cultivo, setCultivo] = React.useState([]);
  const [otroCultivo, setOtroCultivo] = React.useState(null);
  const [editableCultivo, setEditableCultivo] = React.useState(false);
  const [imgTempPath, setImgTempPath] = React.useState(null);
  const [usuarioID, setUsuarioID] = React.useState(null);
  const [foto, setFoto] = React.useState(null);
  const [ciudadByDepartamento, setCiudadByDepartamento] = useState([]);
  const [tiposDeUsuario, setTiposDeUsuario] = useState([]);
  const [terminosyCondiciones, setTerminosyCondiciones] = useState(false);
  const [tratamientoDatos, setTratamientoDatos] = useState(false);
  const [visible, setVisible] = useState(false);
  const opacity = useSharedValue(1);
  const [imageBase64, setImageBase64] = useState(null);

  const sheetRef = useRef(null);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      alignItems: 'center',
    };
  });

  // useEffect(() => {
  //   opacity.value = withTiming(1, { duration: 500 });
  // }, []);

  const checkFormulario = () => {
    tipoUsuario == null ||
    departamento == null ||
    municipio2 == null ||
    cultivo == null ||
    name.length == 0 ||
    phone.length == 0 ||
    (cultivo == 'Otros' &&
      (otroCultivo != null ? otroCultivo.length == 0 : otroCultivo == null))
      ? Alert.alert(
          'Error en el formulario',
          'Todos los campos son requeridos',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {text: 'OK'},
          ],
        )
      : (() => {})(
          phone.length < 10
            ? Alert.alert(
                'Error en el formulario',
                'El teléfono debe contener 10 números',
                [
                  {
                    text: 'Cancelar',
                    style: 'cancel',
                  },
                  {text: 'OK'},
                ],
              )
            : actualizarUsuario(),
        );
  };

  let conexion = () => {
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

  useEffect(() => {
    const tiposDeUsuarioTemp = [];
    NetInfo.fetch().then((state) => {
      if (state.isConnected == true) {
        getTiposUsuario().then((response) => {
          if (response == 'error de conexion') {
            conexion();
          } else {
            this.tiposDeUsuarioCompletos = response;
            for (let i = 0; i < response.length; i++) {
              tiposDeUsuarioTemp.push(response[i].nombre);
            }
            setTiposUsuario(tiposDeUsuarioTemp);
          }
        });
      } else {
        conexion();
      }
    });
  }, []);

  useEffect(() => {
    const departamentosTemp = [];
    setCiudadByDepartamento([]);
    NetInfo.fetch().then((state) => {
      if (state.isConnected == true) {
        getDepartamentos()
          .then((response) => {
            if (response == 'error de conexion') {
              conexion();
            } else {
              departamentosCompletos = response;
              for (let i = 0; i < response.length; i++) {
                departamentosTemp.push(response[i].nombre);
              }
              setDepartamentos(departamentosTemp);
            }
          })
          .catch((err) => {
            conexion();
          });
      } else {
        conexion();
      }
    });
  }, []);

  useEffect(() => {
    const cultivosTemp = [];
    NetInfo.fetch().then((state) => {
      if (state.isConnected == true) {
        getCultivos().then((response) => {
          if (response == 'error de conexion') {
            conexion();
          } else {
            cultivosCompletos = response;
            for (let i = 0; i < response.length; i++) {
              cultivosTemp.push(response[i].nombre);
            }
            cultivosTemp.splice(cultivosTemp.indexOf('Otros'), 1);
            cultivosTemp.splice(cultivosTemp.length, 0, 'Otros');
            setTiposCultivo(cultivosTemp);
          }
        });
      } else {
        conexion();
      }
    });
  }, []);

  useEffect(() => {
    setMunicipio(ciudadByDepartamento);
  }, [ciudadByDepartamento]);

  // MÉTODO CONSULTAR USUARIO
  useEffect(() => {
    NetInfo.fetch().then((state) => {
      AsyncStorage.getItem('token').then((token) => {
        if (state.isConnected == true) {
          getConsultarUsuario(token).then((response) => {
            if (response == 'error de conexion') {
              // conexion();
            } else {
              setName(response.cultivos[0].usuario.split('null')[0]);
              setPhone(response.telefono_celular);
              setDepartamento(response.departamento);
              setMunicipio2(response.ciudad);
              setMunicipioID(response.ciudad_id);
              setCultivo(response.cultivos[0].cultivo);
              setTipoUsuario(response.tipo_usuario);
              setUsuarioID(response.id);
              setTipoUsuarioID(response.tipo_usuario_id);
              setCultivosID(response.cultivos[0].id);
              setCultivoID(response.cultivos[0].cultivo_id);
              setDepartamentoID(response.departamento_id);
              setFoto(response.foto);
              setTerminosyCondiciones(response.terminosyCondicionesAceptado);
              setTratamientoDatos(response.tratamientoDatosAceptado);
              if (response.cultivos[0].otro_cultivo) {
                setOtroCultivo(response.cultivos[0].otro_cultivo);
                setCultivo('Otros');
              }
            }
          });
        } else {
          conexion();
        }
      });
    });
  }, [props]);

  // CONTENIDO DEL BOTTOM SHEET
  const renderContent = () => (
    <View style={styles.bottomSheet}>
      {/* <View style={styles.panelHeader}>
        <View style={styles.horizontalLine} />
      </View> */}
      <View style={{alignItems: 'center'}}>
        <Text style={styles.titulo}>Subir foto</Text>
        <Text style={styles.subtitulo}>Elige tu foto de perfil</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={takePhotoFromCamera}>
        <Text style={styles.buttonText}>Tomar la foto</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={choosePhotoFromLibrary}>
        <Text style={styles.buttonText}>Elegir de la galería</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => sheetRef.current.close()}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );

  // const fall = new Animated.Value(1);

  // TOMAR FOTO DE LA CAMARA O ESCOGER DE GALERÍA

  // const takePhotoFromCamera = () => {
  //   ImagePicker.openCamera({
  //     width: 227,
  //     height: 224,
  //     cropping: true,
  //     includeBase64: true,
  //   }).then((image) => {
  //     setImgTempPath(image.path);
  //     this.sheetRef.current.snapTo(2);
  //     this.imageBase64 = 'data:' + image.mime + ';base64,' + image.data;
  //   });
  // };

  const takePhotoFromCamera = () => {
    launchCamera({
      mediaType:'photo',
      quality:0.8,
      includeBase64:true,
      maxWidth: 227,
      maxHeight: 224,
    },(image)=>{
      if(image.didCancel){
        console.log('operation cancelled by the user')
      } else {
        console.log('image object from launch cam',image)
        setImgTempPath(image.assets[0].uri);
        // sheetRef.current.snapToIndex(2);
        sheetRef.current.close();
        setImageBase64('data:' + image.assets[0].type + ';base64,' + image.assets[0].base64);
      }
      
    })
  }

  // const choosePhotoFromLibrary = () => {
  //   ImagePicker.openPicker({
  //     width: 227,
  //     height: 224,
  //     cropping: true,
  //     includeBase64: true,
  //   }).then((image) => {
  //     setImgTempPath(image.path);
  //     this.sheetRef.current.snapTo(2);
  //     this.imageBase64 = 'data:' + image.mime + ';base64,' + image.data;
  //   });
  // };

  const choosePhotoFromLibrary = () => {
    console.log('se ejecuto metodo de choose photo from lib')
    launchImageLibrary({
      mediaType:'photo',
      quality:0.8,
      includeBase64:true,
      maxWidth: 227,
      maxHeight: 224,
    },(image)=>{
      if(image.didCancel){
        console.log('operation cancelled by the user')
        
      }
      else{
        console.log('image object',image)
      setImgTempPath(image.assets[0].uri);
      // sheetRef.current.snapToIndex(-1);
      sheetRef.current.close();
      setImageBase64('data:' + image.assets[0].type + ';base64,' + image.assets[0].base64);
      }
      // else {
      //   Alert.alert(
      //     'Foto de perfil',
      //     'Ocurrió un error al subir tu foto de perfil. Inténtalo nuevamente.',
      //     [
      //       {
      //         text: 'Cerrar',
      //         style: 'cancel',
      //       },
      //     ],
      //   );
      // }
    })
  }

  // FUNCIÓN CARGAR IMAGEN BASE64
  const cargarImagenBase64 = () => {
    AsyncStorage.getItem('token').then((token) => {
      // this.imgPath = '';
      NetInfo.fetch().then((state) => {
        if (state.isConnected == true) {
          postCargarImagenBase64(token, imageBase64).then((response) => {
            if (response == 'error de conexion') {
              conexion();
            } else {
              if (this.ciudadByDepartamentoCompletos) {
                for (
                  let i = 0;
                  i < this.ciudadByDepartamentoCompletos.length;
                  i++
                ) {
                  if (
                    this.ciudadByDepartamentoCompletos[i].nombre == municipio2
                  ) {
                    this.municipioID = this.ciudadByDepartamentoCompletos[i].id;
                  }
                }
              } else {
                this.municipioID = municipioID;
              }

              for (let i = 0; i < this.tiposDeUsuarioCompletos.length; i++) {
                if (this.tiposDeUsuarioCompletos[i].nombre == tipoUsuario) {
                  this.tipoUsuarioID = this.tiposDeUsuarioCompletos[i].id;
                }
              }

              for (let i = 0; i < this.cultivosCompletos.length; i++) {
                if (this.cultivosCompletos[i].nombre == cultivo) {
                  this.cultivoID = this.cultivosCompletos[i].id;
                }
              }

              // if (cultivo == 'Otros') {
              //   this.cultivoID = null;
              // } else {
              //   setOtroCultivo(null);
              // }

              this.usuarioActualizado = {
                apellidos: null,
                foto64: null,
                tipo_usuario_id: this.tipoUsuarioID,
                cultivos: [
                  {
                    cultivo: cultivo,
                    usuario_id: usuarioID,
                    usuario: name,
                    otro_cultivo: cultivo == 'Otros' ? otroCultivo : null,
                    id: cultivosID,
                    cultivo_id: cultivo == 'Otros' ? null : this.cultivoID,
                  },
                ],
                terminosyCondicionesAceptado: this.terminosyCondiciones,
                // fecha_creacion: 'string',
                nombre: name,
                foto: response,
                tratamientoDatosAceptado: this.tratamientoDatos,
                telefono_celular: phone,
                ciudad: municipio2,
                ciudad_id: this.municipioID,
                departamento: departamento,
                // departamento_id: this.idDepartamento,
                id: usuarioID,
                tipo_usuario: tipoUsuario,
              };
              postCrearUsuario(this.usuarioActualizado).then((result) => {
                if (result == 'error de conexion') {
                  conexion();
                } else {
                  Alert.alert(
                    'Mensaje de Confirmación',
                    'Los campos han sido actualizados con exito',
                    [{text: 'OK'}],
                  );
                }
              });
            }
          });
        } else {
          conexion();
        }
      });
    });
  };

  // ACTUALIZAR USUARIO

  const actualizarUsuario = () => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected == true) {
        if (imageBase64) {
          cargarImagenBase64();
        } else {
          if (this.ciudadByDepartamentoCompletos) {
            for (
              let i = 0;
              i < this.ciudadByDepartamentoCompletos.length;
              i++
            ) {
              if (this.ciudadByDepartamentoCompletos[i].nombre == municipio2) {
                this.municipioID = this.ciudadByDepartamentoCompletos[i].id;
              }
            }
          } else {
            this.municipioID = municipioID;
          }

          for (let i = 0; i < this.tiposDeUsuarioCompletos.length; i++) {
            if (this.tiposDeUsuarioCompletos[i].nombre == tipoUsuario) {
              this.tipoUsuarioID = this.tiposDeUsuarioCompletos[i].id;
            }
          }

          for (let i = 0; i < this.cultivosCompletos.length; i++) {
            if (this.cultivosCompletos[i].nombre == cultivo) {
              this.cultivoID = this.cultivosCompletos[i].id;
            }
          }

          // if (cultivo == 'Otros') {
          //   this.cultivoID = null;
          // } else {
          //   setOtroCultivo(null);
          // }

          this.usuarioActualizado = {
            apellidos: null,
            foto64: null,
            tipo_usuario_id: this.tipoUsuarioID,
            cultivos: [
              {
                cultivo: cultivo,
                usuario_id: usuarioID,
                usuario: name,
                otro_cultivo: cultivo == 'Otros' ? otroCultivo : null,
                id: cultivosID,
                cultivo_id: cultivo == 'Otros' ? null : this.cultivoID,
              },
            ],
            terminosyCondicionesAceptado: this.terminosyCondiciones,
            // fecha_creacion: 'string',
            nombre: name,
            foto: foto,
            tratamientoDatosAceptado: this.tratamientoDatos,
            telefono_celular: phone,
            ciudad: municipio2,
            ciudad_id: this.municipioID,
            departamento: departamento,
            // departamento_id: this.idDepartamento,
            id: usuarioID,
            tipo_usuario: tipoUsuario,
          };

          postCrearUsuario(this.usuarioActualizado).then((response) => {
            if (response == 'error de conexion') {
              conexion();
            } else {
              Alert.alert(
                'Mensaje de Confirmación',
                'Los campos han sido actualizados con exito',
                [{text: 'OK'}],
              );
            }
          });
        }
      } else {
        conexion();
      }
    });
  };

  const bottomSheetRef = useRef(null);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    if(index === -1) opacity.value = withTiming( 1, { duration: 300 });
  }, []);
  
  return (
    <SafeAreaWrapper backgroundColor="#ffffff">
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled={true}
      style={{flex: 1}}
    >
      <BottomSheetModalProvider>
        <ScrollView style={{flex:1}}>
          <View style={styles.container}>
            <BottomSheetModal
              ref={sheetRef}
              onChange={handleSheetChanges}
              index={0}
            >
              <BottomSheetView style={styles.contentContainer}>
                {renderContent()}
              </BottomSheetView>
            </BottomSheetModal>

            <Animated.View style={animatedStyle} >
              <View
                style={{
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  overflow: 'hidden',
                  backgroundColor: '#fff',
                }}>
                <LinearGradient
                  style={styles.background1}
                  colors={['#2d71b0', '#20397e']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}></LinearGradient>

                <View style={styles.background2}></View>
              </View>

              <View style={styles.header}>
                <View
                  style={{
                    width: wp('45%'),
                    height: wp('16%'),
                    marginRight: wp('12%'),
                  }}>
                  <ImageBackground
                    style={styles.logo}
                    source={require('../../assets/logoHorizontal.png')}
                  />
                </View>

                <View>
                  <Text
                    style={{
                      fontFamily: 'Oxygen-Bold',
                      // fontSize: 18,
                      fontSize: wp('4.5%'),
                      color: '#f5f5f0',
                      paddingLeft: wp('16%'),
                    }}>
                    Perfil
                  </Text>
                </View>
              </View>

              <View
                style={{
                  position: 'absolute',
                  marginTop: hp('20%'),
                  height: hp('65%'),
                }}>
                <PerfilHeader
                  disabled={Platform.OS=='android' && Platform.Version<=25}
                  ocultarSaludo={true}
                  perfilStyle={{
                    flexDirection: 'column-reverse',
                    alignItems: 'center',
                  }}
                  avatarSize={wp('25%')}
                  textColor="#00983a"
                  textSize={wp('6%')}
                  isEnabled={false}
                  sheetRef={sheetRef}
                  imgTempPath={imgTempPath}
                  opacity={opacity}
                />

                <ScrollView
                  nestedScrollEnabled={true}
                  persistentScrollbar={true}
                  style={{height: hp('30%')}}>
                  <View style={styles.inputContainer}>
                    <Ionicons name="person-outline" style={styles.icons} />
                    <TextInput
                      style={styles.input}
                      placeholder="Nombre"
                      value={name}
                      onChangeText={(otroNombre) => setName(otroNombre)}
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Feather name="phone" style={styles.icons} />
                    <TextInput
                      style={styles.input}
                      placeholder="Celular"
                      keyboardType="number-pad"
                      returnKeyType='done'
                      value={phone}
                      onChangeText={(otroTelefono) => setPhone(otroTelefono)}
                    />
                  </View>

                  <View style={[styles.inputContainer]}>
                    <Feather name="users" style={styles.icons} />
                    <Menu
                      visible={visible === 'tipoUsuario'}
                      onDismiss={() => setVisible(false)}
                      style={{width: '75%', maxHeight: 200, padding: 0, marginTop: 30}}
                      anchor={
                        <Button 
                          onPress={() => setVisible('tipoUsuario')} 
                          style={{ justifyContent: 'flex-start'}}
                          contentStyle={{ justifyContent: 'flex-start', color: 'black', height: 25}}
                          labelStyle={{...styles.dropdownDefText, height: 21, padding: 0}}
                        >
                          {tipoUsuario? tipoUsuario.toString(): ''}
                        </Button>
                      }
                    >
                      <ScrollView>
                        {tiposUsuario.map((tipo, idx) => (
                          <Menu.Item
                            key={idx}
                            onPress={() => {
                              setTipoUsuario(tipo);
                              setVisible(null);
                            }}
                            title={tipo}
                          />
                        ))}
                      </ScrollView>
                    </Menu>
                    <AntDesign name="caretdown" size={wp('4%')} color="#bac5b9" style={{paddingBottom: 3}} 
                      onPress={()=>{setVisible('tipoUsuario')}} />
                  </View>

                  <View style={[styles.inputContainer]}>
                    <Ionicons name="location-outline" style={styles.icons} />
                    <Menu
                      visible={visible === 'departamento'}
                      onDismiss={() => setVisible(false)}
                      style={{width: '75%', maxHeight: 200, padding: 0, marginTop: 30}}
                      anchor={
                        <Button 
                          onPress={() => setVisible('departamento')} 
                          style={{ justifyContent: 'flex-start'}}
                          contentStyle={{ justifyContent: 'flex-start', color: 'black', height: 25}}
                          labelStyle={{...styles.dropdownDefText, height: 21, padding: 0}}
                        >
                          {departamento? departamento.toString(): ''}
                        </Button>
                      }
                    >
                      <ScrollView>
                        {departamentos2.map((value, idx) => (
                          <Menu.Item
                            key={idx}
                            onPress={() => {
                              setDepartamento(value);
                              // Busca el id del departamento seleccionado
                              const departamentoObj = departamentosCompletos.find(dep => dep.nombre === value);
                              if (departamentoObj) {
                                getCiudadByDepartamento(departamentoObj.id)
                                  .then((response) => {
                                    if (response === 'error de conexion') {
                                      setMunicipio([]);
                                      setCiudadByDepartamento([]);
                                    } else {
                                      const ciudades = response.map(ciudad => ciudad.nombre);
                                      setCiudadByDepartamento(ciudades);
                                      setMunicipio(ciudades);
                                    }
                                  })
                                  .catch((err) => {
                                    conexion();
                                  });
                              }
                              setVisible(null);
                            }}
                            title={value}
                          />
                        ))}
                      </ScrollView>
                    </Menu>
                    <AntDesign name="caretdown" size={wp('4%')} color="#bac5b9" style={{paddingBottom: 3}} onPress={()=>{
                      setVisible('departamento')
                    }} />
                  </View>

                  <View style={[styles.inputContainer]}>
                    <Ionicons name="location-outline" style={styles.icons} />
                    <Menu
                      visible={visible === 'municipio'}
                      onDismiss={() => setVisible(false)}
                      style={{width: '75%', maxHeight: 200, padding: 0, marginTop: 30}}
                      anchor={
                        <Button 
                          onPress={() => setVisible('municipio')} 
                          style={{ justifyContent: 'flex-start'}}
                          contentStyle={{ justifyContent: 'flex-start', color: 'black', height: 25}}
                          labelStyle={{...styles.dropdownDefText, height: 21, padding: 0}}
                        >
                          {municipio2? municipio2.toString(): ''}
                        </Button>
                      }
                    >
                      <ScrollView>
                        {municipio.map((tipo, idx) => (
                          <Menu.Item
                            key={idx}
                            onPress={() => {
                              setMunicipio2(tipo);
                              setVisible(null);
                            }}
                            title={tipo}
                          />
                        ))}
                      </ScrollView>
                    </Menu>
                    <AntDesign name="caretdown" size={wp('4%')} color="#bac5b9" style={{paddingBottom: 3}} 
                      onPress={()=>{setVisible('municipio')}} />
                  </View>

                  <View style={[styles.inputContainer]}>
                    <MaterialComIcons name="tree-outline" style={styles.icons} />
                    <Menu
                      visible={visible === 'cultivo'}
                      onDismiss={() => setVisible(false)}
                      style={{width: '75%', maxHeight: 200, padding: 0, marginTop: 30}}
                      anchor={
                        <Button 
                          onPress={() => setVisible('cultivo')} 
                          style={{ justifyContent: 'flex-start'}}
                          contentStyle={{ justifyContent: 'flex-start', color: 'black', height: 25}}
                          labelStyle={{...styles.dropdownDefText, height: 21, padding: 0}}
                        >
                          {cultivo? cultivo.toString(): ''}
                        </Button>
                      }
                    >
                      <ScrollView>
                        {tiposCultivo.map((tipo, idx) => (
                          <Menu.Item
                            key={idx}
                            onPress={() => {
                              setCultivo(tipo);
                              setVisible(null);
                            }}
                            title={tipo}
                          />
                        ))}
                      </ScrollView>
                    </Menu>
                    <AntDesign name="caretdown" size={wp('4%')} color="#bac5b9" style={{paddingBottom: 3}} 
                      onPress={()=>{setVisible('cultivo')}} />
                  </View>

                  {cultivo == 'Otros'? <View style={styles.inputContainer}>
                    <MaterialIcons name="emoji-nature" style={styles.icons} />
                    <TextInput
                      value={otroCultivo}
                      placeholderTextColor= '#7c7d7d'
                      placeholder="Otro cultivo"
                      style={styles.input}
                      onChangeText={(otroCultivo) => setOtroCultivo(otroCultivo)}
                    />
                  </View> 
                  : null 
                  }
                  
                </ScrollView>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => checkFormulario()}>
                  <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        </ScrollView>
      </BottomSheetModalProvider>
    </KeyboardAvoidingView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  background1: {
    width: wp('100%'),
    height: hp('18%'),
    opacity: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  background2: {
    height: hp('80%'),
    backgroundColor: '#ffffff',
  },

  header: {
    position: 'absolute',
    marginTop: hp('4%'),
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logo: {
    flex: 1,
    resizeMode: 'contain',
  },

  button: {
    backgroundColor: '#099941',
    padding: 6,
    borderRadius: 40,
    alignItems: 'center',
    marginVertical: '3%',
  },

  buttonText: {
    color: '#f5f5f0',
    fontFamily: 'Roboto-Regular',
    // fontSize: 16,
    fontSize: wp('4.5%'),
  },

  dropdownDefText: {
    fontFamily: 'Roboto-Regular',
    color: '#7c7d7d',
    fontSize: wp('5%'),
    paddingVertical: 0,
    padding: wp('1%'),
  },
  dropdownBox: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e5e5e5',
    width: wp('80%'),
    height: hp('30%'),
  },

  dropdownText: {
    borderRadius: 10,
    fontFamily: 'Oxygen-Regular',
    fontSize: wp('4%'),
    padding: wp('2%'),
  },

  bottomSheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopColor: '#d6d6d6',
    borderTopWidth: wp('0.1%'),
    width: wp('95%'),
    height: hp('50%'),
    shadowColor: '333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 1.0,
    elevation: 20,
    alignSelf: 'center',
    padding: wp('5%'),
    backgroundColor: '#f5f5f0',
    paddingTop: wp('8%'),
    shadowColor: '#000000',
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  panelHeader: {
    alignItems: 'center',
  },
  horizontalLine: {
    width: wp('7%'),
    height: hp('1%'),
    // borderRadius: 4,
    backgroundColor: '#20397e',
    marginBottom: hp('2%'),
  },

  titulo: {
    fontFamily: 'Roboto-Bold',
    color: '#00983a',
    fontSize: wp('5%'),
  },

  subtitulo: {
    fontFamily: 'Roboto-Regular',
    fontSize: wp('4%'),
    color: '#7c7d7d',
    marginBottom:hp('4%'),
  },

  inputContainer: {
    flexDirection: 'row',
    borderBottomColor: '#e6e6e6',
    borderBottomWidth: wp('0.5%'),
    alignItems: 'center',
    width: wp('85%'),
    marginVertical: hp('1.5%'),
  },

  icons: {
    fontSize: wp('6%'),
    color: '#7c7d7d',
  },

  input: {
    fontFamily: 'Roboto-Regular',
    color: '#7c7d7d',
    fontSize: wp('5%'),
    paddingVertical: 0,
  },
});
