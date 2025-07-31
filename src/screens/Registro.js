import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
// import ModalDropdown from 'react-native-modal-dropdown';
// import { CheckBox } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import CheckBox from '@react-native-community/checkbox';
import NetInfo from '@react-native-community/netinfo';
import { Button, Menu } from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  getAuth,
  getAutorizarPolitica,
  getAutorizarTerminosYCondiciones,
  getCiudadByDepartamento,
  getConsultarUsuarioTelefono,
  getCultivos,
  getDepartamentos,
  getTiposUsuario,
  postCrearUsuario
} from '../../api/api';
import CustomCheckbox from '../components/CustomCheckbox';
import SafeAreaWrapper from '../components/SafeAreaWrapper';

// export default class Registro extends React.Component {
export default function Registro(props) {
  // const tiposDeUsuario = [];
  const [tiposDeUsuarioCompletos, setTiposDeUsuarioCompletos] = useState([]);
  // const departamentos = [];
  const [departamentosCompletos, setDepartamentosCompletos] = useState([]);
  const [ciudadByDepartamento, setCiudadByDepartamento] = useState([]);
  const [ciudadByDepartamentoCompletos, setCiudadByDepartamentoCompletos] = useState([]);
  // const cultivos = [];
  const [cultivosCompletos, setCultivosCompletos] = useState([]);
  const [idDepartamento, setIdDepartamento] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [toggleCheckBoxDatos, setToggleCheckBoxDatos] = useState(false);
  const [toggleCheckBoxTerminos, setToggleCheckBoxTerminos] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState(null);
  const [departamentos2, setDepartamentos] = useState([]);
  const [departamento, setDepartamento] = useState([]);
  const [tiposUsuario, setTiposUsuario] = useState([]);
  const [tiposUsuarioDropdown, setTiposUsuarioDropdown] = useState([]);
  const [municipio2, setMunicipio2] = useState([]);
  const [municipio, setMunicipio] = useState([]);
  const [tiposCultivo, setTiposCultivo] = useState([]);
  const [cultivo, setCultivo] = useState([]);
  const [otroCultivo, setOtroCultivo] = useState(null);
  const [changeMunicipio, setChangeMunicipio] = useState(true);
  const [disabledMunicipio, setDisabledMunicipio] = useState(true);
  const [visible, setVisible] = useState(null);

  const hasUnsavedChanges = Boolean(name);

  useEffect(
    () =>
      props.navigation.addListener('beforeRemove', (e) => {
        if (!hasUnsavedChanges) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }
        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        Alert.alert(
          '¿Descartar cambios?',
          'Tienes cambios sin guardar. Si dejas la pantalla tus cambios se perderán',
          [
            { text: 'Cancelar', style: 'cancel', onPress: () => { } },
            {
              text: 'Descartar',
              style: 'destructive',
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () => props.navigation.dispatch(e.data.action),
            },
          ],
        );
      }),
    [props.navigation, hasUnsavedChanges],
  );

  let conexion = () => {
    Alert.alert(
      'Error de conexión',
      'No tienes conexión a internet. Puede que algunas opciones no se carguen correctamente. Intenta más tarde.',
      [
        {
          text: 'Cerrar',
          // onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
    );
  };

  const guardarNombre = async () => {
    try {
      await AsyncStorage.setItem('@nombre', name);
    } catch (e) {
      console.log('Failed to save the data to the storage');
    }
  };
  useEffect(() => {
    let tiposDeUsuario = [];
    NetInfo.fetch().then((state) => {
      if (state.isConnected == true) {
        getTiposUsuario().then((response) => {
          if (response == 'error de conexion') {
            // conexion();
          } else {
            setTiposDeUsuarioCompletos(response);
            for (let i = 0; i < response.length; i++) {
              tiposDeUsuario.push(response[i].nombre);
            }
            setTiposUsuario(tiposDeUsuario);
          }
        });
      } else {
        // conexion();
      }
    });
  }, []);
  useEffect(() => {
    let departamentos = [];
    setCiudadByDepartamento([]);
    NetInfo.fetch().then((state) => {
      if (state.isConnected == true) {
        getDepartamentos()
          .then((response) => {
            if (response == 'error de conexion') {
              conexion();
            } else {
              setDepartamentosCompletos(response);
              for (let i = 0; i < response.length; i++) {
                departamentos.push(response[i].nombre);
              }
              setDepartamentos(departamentos);
            }
          })
          .catch((err) => {
            console.log('error dptos', err);
          });
      } else {
        conexion();
      }
    });
  }, []);
  useEffect(() => {
    let cultivos = [];
    NetInfo.fetch().then((state) => {
      if (state.isConnected == true) {
        getCultivos().then((response) => {
          if (response == 'error de conexion') {
            conexion();
          } else {
            setCultivosCompletos(response);
            for (let i = 0; i < response.length; i++) {
              cultivos.push(response[i].nombre);
            }
            cultivos.splice(cultivos.indexOf('Otros'), 1);
            cultivos.splice(cultivos.length, 0, 'Otros');
            setTiposCultivo(cultivos);
          }
        });
      } else {
        conexion();
      }
    });
  }, []);
  // useEffect(() => {
  //   console.log('ciudadByDepartamento', ciudadByDepartamento)
  //   setMunicipio(ciudadByDepartamento);
  // }, [ciudadByDepartamento]);
  const onSubmitEditing = () => {
    if (!name) return;
    guardarNombre(name);
    // setName('');
  };
  const verificarUsuario = () => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected == true) {
        checkFormulario();
      } else {
        conexion();
      }
    });
  };
  const checkFormulario = () => {
    tipoUsuario == null ||
      departamento == null ||
      municipio == null ||
      name.length == 0 ||
      phone.length == 0 ||
      cultivo.length == 0
      ? Alert.alert(
        'Error en el formulario',
        'Todos los campos son requeridos',
        [
          {
            text: 'Cancelar',

            style: 'cancel',
          },
          {
            text: 'OK',
          },
        ],
      )
      : (() => { })(
        phone.length < 10
          ? Alert.alert(
            'Error en el formulario',
            'El teléfono debe contener 10 números',
            [
              {
                text: 'Cancelar',
                style: 'cancel',
              },
              {
                text: 'OK',
              },
            ],
          )
          : (() => { })(
            toggleCheckBoxDatos == false || toggleCheckBoxTerminos == false
              ? Alert.alert(
                'Error en el formulario',
                'Debe aceptar el tratamiento de datos y los términos y condiciones',
                [
                  {
                    text: 'Cancelar',
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                  },
                ],
              )
              : (() => { })(crearUsuario()),
          ),
      );
  };
  const crearUsuario = () => {
    getConsultarUsuarioTelefono(phone).then((response) => {
      response == true
        ? Alert.alert(
          'Error en el formulario',
          'El teléfono ya esta registrado',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'Iniciar sesión',
              onPress: () => props.navigation.navigate('InicioSesion'),
            },
          ],
        )
        : guardarUsuario();
    });
  };
  let guardarUsuario = () => {
    let idTipoDeUsuario = null;
    let idCiudad = null;
    let idCultivo = null;
    let cultivoSeleccionado = {};
    for (let i = 0; i < ciudadByDepartamentoCompletos.length; i++) {
      if (ciudadByDepartamentoCompletos[i].nombre == municipio2) {
        idCiudad = ciudadByDepartamentoCompletos[i].id;
      }
    }
    for (let i = 0; i < tiposDeUsuarioCompletos.length; i++) {
      if (tiposDeUsuarioCompletos[i].nombre == tipoUsuario) {
        idTipoDeUsuario = tiposDeUsuarioCompletos[i].id;
      }
    }
    for (let i = 0; i < cultivosCompletos.length; i++) {
      if (cultivosCompletos[i].nombre == cultivo) {
        idCultivo = cultivosCompletos[i].id;
      }
    }
    let cultivoConID = {
      cultivo: cultivo,
      cultivo_id: idCultivo,
    };
    let cultivoSinId = {
      otro_cultivo: otroCultivo,
    };
    cultivo == 'Otros'
      ? (cultivoSeleccionado = cultivoSinId)
      : (cultivoSeleccionado = cultivoConID);
    let usuario = {
      tipo_usuario: tipoUsuario,
      tipo_usuario_id: idTipoDeUsuario,
      cultivos: [cultivoSeleccionado],
      terminosyCondicionesAceptado: toggleCheckBoxTerminos,
      nombre: name,
      tratamientoDatosAceptado: toggleCheckBoxDatos,
      telefono_celular: phone,
      ciudad: municipio2,
      ciudad_id: idCiudad,
      departamento: departamento,
      departamento_id: idDepartamento,
    };
    NetInfo.fetch().then((state) => {
      if (state.isConnected == true) {
        postCrearUsuario(usuario).then((response) => {
          if (response == 'error de conexion') {
            conexion();
          } else {
            response.message == 'OK' ? iniciarSesion() : console.log('error');
          }
        });
      }
    });
  };
  // console.log('tiposUsuario', tiposUsuario)
  let iniciarSesion = () => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected == true) {
        getAuth(phone).then((response) => {
          if (response == 'error de conexion') {
            conexion();
          } else if (response.hasOwnProperty('error')) {
            if (response.error == 'Usuario no existe') {
              Alert.alert(
                'Error de validación',
                'Ha ocurrido un error tratando de ir al Home. Inténtalo nuevamente.',
                [
                  {
                    text: 'Cancelar',
                    style: 'cancel',
                  },
                  { text: 'OK' },
                ],
              );
            }
          } else if (response.hasOwnProperty('token')) {
            getAutorizarTerminosYCondiciones(response.token).then((response) => {
              console.log('terminos', response)
            })
            getAutorizarPolitica(response.token).then((response) => {
              console.log('politica', response)
            })
            getAutorizarPolitica
            AsyncStorage.setItem('token', response.token);
            AsyncStorage.getItem('token').then((value) => {
              //ejecutar metodos de getcuestionario y gettemario
              //spinner: estamos descargando datos importantes para ti

              props.navigation.navigate('MyDrawer');
              // props.navigation.navigate('Home');
            });
          }
        });
      } else {
        conexion();
      }
    });
  };

  return (
    <SafeAreaWrapper backgroundColor="#ffffff">
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.header}>
            <TouchableOpacity
              // onPress={() => this.props.navigation.navigate('Home')}>
              onPress={() => props.navigation.navigate('Home')}>
              <LinearGradient
                colors={['#1ad17c', '#19ce79', '#099941']}
                start={{ x: 0.3, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                locations={[0, 0.7, 1]}
                style={styles.regresarButton}>
                <Text style={styles.regresarText}>
                  <AntDesign name="left" size={wp('3%')} color="#f5f5f0" />{' '}
                  Regresar
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <Text style={styles.registroText}>Registro</Text>
          </View>

          <ScrollView style={{ marginBottom: hp('4%') }}>
            <Text style={styles.label}>Nombre:</Text>
            <TextInput
              style={styles.input}
              // onChangeText={(newName) => this.setState({name: newName})}
              onChangeText={(nombreUsuario) => setName(nombreUsuario.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ''))}
              value={name}
              onSubmitEditing={onSubmitEditing}
            />
            <Text style={styles.label}>Tipo de Usuario:</Text>
            {/* <ModalDropdown
                ref={(ref)=>this.mdTiposUsuario=ref}
                options={tiposUsuario}
                defaultValue=""
                // style={styles.input}
                style={{
                  width: '90%',
                  height: '100%',
                  // flexWrap: 'wrap',
                }}
                textStyle={styles.dropdownDefText}
                // dropdownStyle={styles.dropdownBox}
                dropdownStyle={styles.dropdownBoxTipoUsuario}
                dropdownTextStyle={styles.dropdownText}
                dropdownTextHighlightStyle={{ color: '#099941' }}
                // onSelect={(idx, value) => this.setState({tipoUsuario: value})}
                onSelect={(idx, value) => setTipoUsuario(value)}
              /> */}
            <View style={[styles.select]}>
                <Menu
                  visible={visible === 'tiposUsuario'}
                  onDismiss={() => setVisible(false)}
                  style={{width: '75%', maxHeight: 250, padding: 0, marginTop: 30}}
                  anchor={
                    <Button 
                      onPress={() => setVisible('tiposUsuario')} 
                      style={{ width: '100%', justifyContent: 'flex-start', minWidth: '90%'}}
                      contentStyle={{ justifyContent: 'flex-start', color: 'black'}}
                      labelStyle={{ color: 'black', fontSize: 16, fontFamily: 'Oxygen-Regular'}}
                    >
                      {tipoUsuario || ''}
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
                <AntDesign name="caretdown" size={wp('4%')} color="#bac5b9" onPress={()=>{
                  setVisible("tiposUsuario")
                  // if(this.mdTiposUsuario.show()){
                  //   this.mdTiposUsuario.show()
                  // }
                }} />
            </View>

            {/* </View> */}
            <Text style={styles.label}>Departamento:</Text>
            <View style={[styles.select]}>
              {/* <ModalDropdown
                ref={(ref)=>this.mdDepartamentos=ref}
                options={departamentos2}
                defaultValue=""
                // style={styles.input}
                style={{
                  width: '90%',
                  height: '100%',
                  // flexWrap: 'wrap',
                }}
                textStyle={styles.dropdownDefText}
                dropdownStyle={styles.dropdownBox}
                dropdownTextStyle={styles.dropdownText}
                dropdownTextHighlightStyle={{ color: '#099941' }}
                // onSelect={(idx, value) => this.setState({departamento: value})}
                onSelect={(idx, value) => {
                  setDepartamento(value);
                  this.idDepartamento = null;
                  this.ciudadByDepartamento = [];
                  for (let i = 0; i < this.departamentosCompletos.length; i++) {
                    if (this.departamentosCompletos[i].nombre == value) {
                      this.idDepartamento = this.departamentosCompletos[i].id;
                      getCiudadByDepartamento(this.idDepartamento)
                        .then((response) => {
                          if (response == 'error de conexion') {
                            setMunicipio([]);
                          } else {
                            this.ciudadByDepartamentoCompletos = response;
                            for (let i = 0; i < response.length; i++) {
                              this.ciudadByDepartamento.push(
                                response[i].nombre,
                              );
                            }
                            setChangeMunicipio(!changeMunicipio);
                            setDisabledMunicipio(false);
                            setMunicipio(this.ciudadByDepartamento);
                          }
                        })
                        .catch((err) => {
                          conexion();
                        });
                    }
                  }
                }}
              /> */}
              <Menu
                  visible={visible === 'departamento'}
                  onDismiss={() => setVisible(false)}
                  style={{width: '75%', maxHeight: 250, padding: 0, marginTop: 30}}
                  anchor={
                    <Button 
                      onPress={() => setVisible('departamento')} 
                      style={{ width: '100%', justifyContent: 'flex-start', minWidth: '90%'}}
                      contentStyle={{ justifyContent: 'flex-start', color: 'black'}}
                      labelStyle={{ color: 'black', fontSize: 16, fontFamily: 'Oxygen-Regular'}}
                    >
                      {departamento || ''}
                    </Button>
                  }
                >
                  <ScrollView>
                    {departamentos2.map((value, idx) => (
                      <Menu.Item
                        key={idx}
                        onPress={() => {
                          setDepartamento(value);
                          // this.idDepartamento = null;
                          setCiudadByDepartamento([]);
                          for (let i = 0; i < departamentosCompletos.length; i++) {
                            if (departamentosCompletos[i].nombre == value) {
                              setIdDepartamento(departamentosCompletos[i].id);
                              getCiudadByDepartamento(departamentosCompletos[i].id)
                                .then((response) => {
                                  if (response == 'error de conexion') {
                                    setMunicipio([]);
                                  } else {
                                    setCiudadByDepartamentoCompletos(response);
                                    const ciudades = response?.length > 0 ? response.map(ciudad => ciudad.nombre) : [];
                                    setCiudadByDepartamento(ciudades);
                                    setChangeMunicipio(!changeMunicipio);
                                    setDisabledMunicipio(false);
                                    setMunicipio(ciudades);
                                    setMunicipio2([])
                                  }
                                })
                                .catch((err) => {
                                  conexion();
                                });
                            }
                          }
                          setVisible(null);
                        }}
                        title={value}
                      />
                    ))}
                  </ScrollView>
                </Menu>
                <AntDesign name="caretdown" size={wp('4%')} color="#bac5b9" onPress={()=>{
                  setVisible('departamento')
                  // if(this.mdDepartamentos.show()){
                  //   this.mdDepartamentos.show()
                  // }
                }} />
            </View>

            <Text style={styles.label}>Municipio:</Text>
            <View style={[styles.select, {opacity: disabledMunicipio ? 0.5 : 1}]}>
              {/* {changeMunicipio ? (
                <ModalDropdown
                ref={(ref)=>this.mdMunicipios=ref}
                  // options={this.ciudadByDepartamento}
                  disabled={disabledMunicipio}
                  options={municipio}
                  defaultValue=""
                  style={{ width: '90%' }}
                  textStyle={styles.dropdownDefText}
                  dropdownStyle={styles.dropdownBox}
                  dropdownTextStyle={styles.dropdownText}
                  dropdownTextHighlightStyle={{ color: '#099941' }}
                  // onSelect={(idx, value) => this.setState({municipio: value})}
                  onSelect={(idx, value) => setMunicipio2(value)}
                />
              ) : null}

              {!changeMunicipio ? (
                <ModalDropdown
                  // options={this.ciudadByDepartamento}
                  disabled={disabledMunicipio}
                  options={municipio}
                  defaultValue=""
                  style={{ width: '90%' }}
                  textStyle={styles.dropdownDefText}
                  dropdownStyle={styles.dropdownBox}
                  dropdownTextStyle={styles.dropdownText}
                  dropdownTextHighlightStyle={{ color: '#099941' }}
                  // onSelect={(idx, value) => this.setState({municipio: value})}
                  onSelect={(idx, value) => setMunicipio2(value)}
                />
              ) : null} */}

                <Menu
                  visible={visible === 'municipio'}
                  onDismiss={() => setVisible(false)}
                  style={{width: '75%', maxHeight: 250, padding: 0, marginTop: 30}}
                  anchor={
                    <Button 
                      disabled={disabledMunicipio}
                      onPress={() => !disabledMunicipio && setVisible('municipio')} 
                      style={{ 
                        width: '100%', 
                        justifyContent: 'flex-start', 
                        minWidth: '90%',
                        opacity: disabledMunicipio ? 0.5 : 1
                      }}
                      contentStyle={{ justifyContent: 'flex-start', color: 'black'}}
                      labelStyle={{ 
                        color: disabledMunicipio ? '#999' : 'black', 
                        fontSize: 16, 
                        fontFamily: 'Oxygen-Regular'
                      }}
                    >
                      {municipio2 || ''}
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

                <AntDesign name="caretdown" size={wp('4%')} color="#bac5b9" onPress={()=>{
                  setVisible('municipio')
                  // if(this.mdMunicipios){
                  //   this.mdMunicipios.show()
                  // }
                }} />
            </View>

            <Text style={styles.label}>Cultivo:</Text>

            <View style={[styles.select]}>
              {/* <ModalDropdown
              ref={(ref)=>this.mdCultivos=ref}
                options={tiposCultivo}
                defaultValue=""
                // style={styles.input}
                style={{
                  width: '90%',
                  height: '100%',
                  // flexWrap: 'wrap',
                }}
                textStyle={styles.dropdownDefText}
                dropdownStyle={styles.dropdownBox}
                dropdownTextStyle={styles.dropdownText}
                dropdownTextHighlightStyle={{ color: '#099941' }}
                // onSelect={(idx, value) => this.setState({municipio: value})}
                onSelect={(idx, value) => setCultivo(value)}
              /> */}
                <Menu
                  visible={visible === 'cultivo'}
                  disabled={disabledMunicipio}
                  onDismiss={() => setVisible(false)}
                  style={{width: '75%', maxHeight: 200, padding: 0, marginTop: 30}}
                  anchor={
                    <Button 
                      onPress={() => setVisible('cultivo')} 
                      style={{ width: '100%', justifyContent: 'flex-start', minWidth: '90%'}}
                      contentStyle={{ justifyContent: 'flex-start', color: 'black'}}
                      labelStyle={{ color: 'black', fontSize: 16, fontFamily: 'Oxygen-Regular'}}
                    >
                      {cultivo || ''}
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
                <AntDesign name="caretdown" size={wp('4%')} color="#bac5b9" onPress={()=>{
                  setVisible('cultivo')
                  // if(this.mdCultivos){
                  //   this.mdCultivos.show()
                  // }
                }} />
            </View>

            {cultivo == 'Otros' ? (
              <View>
                <Text style={styles.label}>Otro cultivo:</Text>
                <TextInput
                  style={styles.input}
                  // onChangeText={(otroCultivo) => this.setState({cultivo: otroCultivo})}
                  onChangeText={(otroCultivo) => setOtroCultivo(otroCultivo)}
                />
              </View>
            ) : null}

            <Text style={styles.label}>Teléfono (celular):</Text>
            <TextInput
              keyboardType="number-pad"
              returnKeyType='done'
              maxLength={10}
              style={styles.input}
              onChangeText={(newPhone) =>
                // this.setState({phone: newPhone.replace(/[^0-9]/g, '')})
                setPhone(newPhone.replace(/[^0-9]/g, ''))
              } //al guardar el número elimina los caracteres no numericos
            />

            <ScrollView horizontal={true}>
              <ScrollView
                showsVerticalScrollIndicator={true}
                nestedScrollEnabled={true}
                style={{ marginTop: '10%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  {/* <CheckBox
                    value={toggleCheckBoxDatos}
                    onChange={() =>setToggleCheckBoxDatos(!toggleCheckBoxDatos)}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 8,
                      padding: 0,
                      margin: 0,
                      marginRight: 10,
                      borderColor: 'gray',
                    }}
                  /> */}

                <CustomCheckbox 
                  checked={toggleCheckBoxDatos} 
                  onPress={() => setToggleCheckBoxDatos(!toggleCheckBoxDatos)}
                  size={24}
                  color="#4CAF50"
                  uncheckedColor="#BDBDBD"
                  borderRadius={4}
                />

                  {/* <CheckBox
                    center
                    // textStyle={styles.checkBoxText}
                    containerStyle={{
                      padding: 0,
                      margin: 0,
                      backgroundColor: 'transparent',
                      borderColor: 'transparent',
                    }}
                    // title="Autorizar el tratamiento de datos"
                    checkedIcon={
                      <MaterialIcon
                        name="checkbox-marked"
                        size={wp('5%')}
                        color="green"
                      />
                    }
                    uncheckedIcon={
                      <MaterialIcon
                        name="checkbox-blank"
                        size={wp('5%')}
                        color="#e5e5e5"
                      />
                    }
                    // checked={this.state.toggleCheckBox}
                    checked={toggleCheckBoxDatos}
                    onPress={() =>
                      // this.setState({toggleCheckBox: !this.state.toggleCheckBox})
                      setToggleCheckBoxDatos(!toggleCheckBoxDatos)
                    }
                  /> */}

                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text style={styles.checkBoxText}>Autorizar el </Text>
                    <TouchableOpacity
                      onPress={() => props.navigation.navigate('Privacidad')}>
                      <Text
                        style={[
                          styles.checkBoxText,
                          { fontWeight: 'bold', flex: 1 },
                        ]}>
                        tratamiento de datos
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  {/* <CheckBox
                    value={toggleCheckBoxTerminos}
                    onChange={() =>setToggleCheckBoxTerminos(!toggleCheckBoxTerminos)}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 8,
                      padding: 0,
                      margin: 0,
                      marginRight: 10,
                      borderColor: 'gray',
                    }}
                  /> */}

                  <CustomCheckbox 
                  checked={toggleCheckBoxTerminos} 
                  onPress={() => setToggleCheckBoxTerminos(!toggleCheckBoxTerminos)}
                  size={24}
                  color="#4CAF50"
                  uncheckedColor="#BDBDBD"
                  borderRadius={4}
                />
                  {/* <CheckBox
                    // title=""
                    // textStyle={styles.checkBoxText}
                    center
                    containerStyle={{
                      padding: 0,
                      margin: 0,
                      backgroundColor: 'transparent',
                      borderColor: 'transparent',
                    }}
                    checkedIcon={
                      <MaterialIcon
                        name="checkbox-marked"
                        size={wp('5%')}
                        color="green"
                      />
                    }
                    uncheckedIcon={
                      <MaterialIcon
                        name="checkbox-blank"
                        size={wp('5%')}
                        color="#e5e5e5"
                      />
                    }
                    // checked={this.state.toggleCheckBox}
                    checked={toggleCheckBoxTerminos}
                    onPress={() =>
                      // this.setState({toggleCheckBox: !this.state.toggleCheckBox})
                      setToggleCheckBoxTerminos(!toggleCheckBoxTerminos)
                    }
                  /> */}
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text style={styles.checkBoxText}>Autorizar </Text>
                    <TouchableOpacity
                      onPress={() => props.navigation.navigate('Terminos')}>
                      <Text
                        style={[
                          styles.checkBoxText,
                          { fontWeight: 'bold', flex: 1 },
                        ]}>
                        términos y condiciones
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </ScrollView>

            <TouchableOpacity
              style={styles.continuarButton}
              // onPress={() => this.setState({display: true})}>
              onPress={() => {
                verificarUsuario();
              }}>
              <Text style={styles.continuarText}>Continuar</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
    </SafeAreaWrapper>
  );
}
// }

const styles = StyleSheet.create({
  container: {
    // padding: 32,
    padding: wp('6%'),
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  regresarButton: {
    borderRadius: 25,
    // padding: 5,
    padding: wp('1%'),
  },

  regresarText: {
    // marginHorizontal: 5,
    marginHorizontal: wp('2%'),
    color: '#f5f5f0',
    fontFamily: 'Roboto-Regular',
    fontSize: wp('3%'),
  },
  registroText: {
    color: '#2d4181',
    fontFamily: 'Oxygen-Bold',
    // fontSize: 18,
    fontSize: wp('4.5%'),
  },
  label: {
    color: '#6d6d6d',
    fontFamily: 'Oxygen-Regular',
    // fontSize: 14,
    fontSize: wp('4%'),
    marginTop: '4%',
    marginBottom: '2%',
    letterSpacing: 0.8,
    fontWeight: 'normal',
  },

  checkBoxText: {
    color: '#6d6d6d',
    fontFamily: 'Oxygen-Regular',
    // fontSize: 14,
    fontSize: wp('4%'),
    letterSpacing: 0.8,
    fontWeight: 'normal',
  },

  input: {
    // padding: 3,
    padding: wp('1%'),
    borderColor: '#f0f0f0',
    backgroundColor: '#e5e5e5',
    borderRadius: 40,
    borderWidth: 1,
    fontFamily: 'Oxygen-Regular',
    // fontSize: 16,
    fontSize: 16,
    paddingLeft: 20,
    // paddingLeft: wp('4%'),
    height: 40,
  },
  select: {
    // padding: 3,
    // padding: wp('1%'),
    borderColor: '#f0f0f0',
    backgroundColor: '#e5e5e5',
    borderRadius: 40,
    borderWidth: 1,
    fontFamily: 'Oxygen-Regular',
    // fontSize: 16,
    fontSize: wp('5%'),
    // paddingLeft: 10,
    // paddingLeft: wp('4%'),
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 0,
  },

  dropdownDefText: {
    fontFamily: 'Oxygen-Regular',
    // fontSize: 16,
    fontSize: wp('4%'),
    // padding: 3,
    padding: wp('1%'),
  },
  dropdownBox: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e5e5e5',
    width: wp('80%'),
    // height: '30%',
    height: wp('32%'),
  },

  dropdownBoxTipoUsuario: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e5e5e5',
    width: wp('80%'),
    // height: '30%',
    height: wp('47%'),
  },

  dropdownText: {
    borderRadius: 10,
    fontFamily: 'Oxygen-Regular',
    // fontSize: 16,
    fontSize: wp('4%'),
    // padding: 5,
    padding: wp('2%'),
  },

  continuarButton: {
    backgroundColor: '#099941',
    padding: 6,
    borderRadius: 40,
    alignItems: 'center',
    marginVertical: '3%',
  },

  continuarText: {
    color: '#f5f5f0',
    fontFamily: 'Roboto-Regular',
    // fontSize: 16,
    fontSize: wp('4.5%'),
  },
  alerta: {
    color: 'red',
    // fontSize: 12,
    fontSize: wp('3%'),
  },
});