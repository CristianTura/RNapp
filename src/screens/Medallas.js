import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getConsultarUsuario } from '../../api/api';
import data from '../../data/dataMedallas';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import Loading from '../screens/Loading';



export default function Perfil(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [textoModal, setTextoModal] = React.useState(false);
  const [imagenModal, setImagenModal] = React.useState(false);
  const [medallaModal, setMedallaModal] = React.useState(false);
  const [urlImagen, setUrlImagen] = React.useState(false);
  const [medalla1, setMedalla1] = React.useState(false);
  const [medalla2, setMedalla2] = React.useState(false);
  const [medalla3, setMedalla3] = React.useState(false);
  const [medalla4, setMedalla4] = React.useState(false);
  const [medalla5, setMedalla5] = React.useState(false);
  const [medalla6, setMedalla6] = React.useState(false);
  const [medalla7, setMedalla7] = React.useState(false);
  const [medalla8, setMedalla8] = React.useState(false);
  const [medalla9, setMedalla9] = React.useState(false);
  const [medalla10, setMedalla10] = React.useState(false);
  const [medalla11, setMedalla11] = React.useState(false);
  const [medalla12, setMedalla12] = React.useState(false);
  const [medalla13, setMedalla13] = React.useState(false);
  const [medalla14, setMedalla14] = React.useState(false);
  const [medalla15, setMedalla15] = React.useState(false);
  const [medalla16, setMedalla16] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  }, [isLoading]);

  React.useEffect(() => {
    AsyncStorage.getItem('token').then((token) => {
      getConsultarUsuario(token).then((response) => {
        for (let i = 0; i < response.medallas.length; i++) {
          if (response.medallas[i].medalla == 1) {
            setMedalla1(true);
          }
          if (response.medallas[i].medalla == 2) {
            setMedalla2(true);
          }

          if (response.medallas[i].medalla == 3) {
            setMedalla3(true);
          }

          if (response.medallas[i].medalla == 4) {
            setMedalla4(true);
          }

          if (response.medallas[i].medalla == 5) {
            setMedalla5(true);
          }

          if (response.medallas[i].medalla == 6) {
            setMedalla6(true);
          }

          if (response.medallas[i].medalla == 7) {
            setMedalla7(true);
          }

          if (response.medallas[i].medalla == 8) {
            setMedalla8(true);
          }
          if (response.medallas[i].medalla == 9) {
            setMedalla9(true);
          }

          if (response.medallas[i].medalla == 10) {
            setMedalla10(true);
          }

          if (response.medallas[i].medalla == 11) {
            setMedalla11(true);
          }

          if (response.medallas[i].medalla == 12) {
            setMedalla12(true);
          }

          if (response.medallas[i].medalla == 13) {
            setMedalla13(true);
          }

          if (response.medallas[i].medalla == 14) {
            setMedalla14(true);
          }

          if (response.medallas[i].medalla == 15) {
            setMedalla15(true);
          }

          if (response.medallas[i].medalla == 16) {
            setMedalla16(true);
          }
        }
        // setIsLoading(false);
      });
    });
  }, []);


  function ProfileScreen({navigation}) {
    React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        alert('Screen is focused');
        // The screen is focused
        // Call any action
      });

      // Return the function to unsubscribe from the event so it gets removed on unmount
      return unsubscribe;
    }, []);

    return <View />;
  }

  function Medalla1() {
    if (!medalla1) {
      return (
        <TouchableOpacity
          style={styles.medalla}
          onPress={() =>
            abrirModal(
              'Responde todas las preguntas de la temática agricultores.',
              medalla1,
              2,
            )
          }>
          <Image style={styles.imagen} source={data[0].imgPath} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.medalla}
          onPress={() =>
            abrirModal(
              'Responde todas las preguntas de la temática agricultores.',
              medalla1,
              1,
            )
          }>
          <Image style={styles.imagen} source={data[0].imgPathCompleto} />
        </TouchableOpacity>
      );
    }
  }

  function Medalla2() {
    if (!medalla2) {
      return (
        <TouchableOpacity
          style={styles.medalla}
          onPress={() =>
            abrirModal(
              'Responde todas las preguntas correctamente en la temática agricultores en el primer intento.',
              medalla2,
              4,
            )
          }>
          <Image style={styles.imagen} source={data[1].imgPath} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.medalla}
          onPress={() =>
            abrirModal(
              'Responde todas las preguntas correctamente en la temática agricultores en el primer intento.',
              medalla2,
              3,
            )
          }>
          <Image style={styles.imagen} source={data[1].imgPathCompleto} />
        </TouchableOpacity>
      );
    }
  }

  function Medalla3() {
    if (!medalla3) {
      return (
        <TouchableOpacity
          style={styles.medalla}
          onPress={() =>
            abrirModal(
              'Responde todas las preguntas de la temática abejas.',
              medalla3,
              6,
            )
          }>
          <Image style={styles.imagen} source={data[2].imgPath} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.medalla}
          onPress={() =>
            abrirModal(
              'Responde todas las preguntas de la temática abejas.',
              medalla3,
              5,
            )
          }>
          <Image style={styles.imagen} source={data[2].imgPathCompleto} />
        </TouchableOpacity>
      );
    }
  }

  function Medalla4() {
    if (!medalla4) {
      return (
        <TouchableOpacity
          style={styles.medalla}
          onPress={() =>
            abrirModal(
              'Responde todas las preguntas de forma correcta en la temática abejas, en el primer intento.',
              medalla4,
              8,
            )
          }>
          <Image style={styles.imagen} source={data[3].imgPath} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.medalla}
          onPress={() =>
            abrirModal(
              'Responde todas las preguntas de forma correcta en la temática abejas, en el primer intento.',
              medalla4,
              7,
            )
          }>
          <Image style={styles.imagen} source={data[3].imgPathCompleto} />
        </TouchableOpacity>
      );
    }
  }

  function Medalla5() {
    if (!medalla5) {
      return (
        <TouchableOpacity
          style={styles.medalla}
          onPress={() =>
            abrirModal(
              'Responde todas las preguntas de la temática organismos acuáticos.',
              medalla5,
              10,
            )
          }>
          <Image style={styles.imagen} source={data[4].imgPath} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.medalla}
          onPress={() =>
            abrirModal(
              'Responde todas las preguntas de la temática organismos acuáticos.',
              medalla5,
              9,
            )
          }>
          <Image style={styles.imagen} source={data[4].imgPathCompleto} />
        </TouchableOpacity>
      );
    }
  }

  function Medalla6() {
    if (!medalla6) {
      return (
        <TouchableOpacity
          style={styles.medalla}
          onPress={() =>
            abrirModal(
              'Responde todas las preguntas de forma correcta en la temática organismos acuáticos, en el primer intento.',
              medalla6,
              12,
            )
          }>
          <Image style={styles.imagen} source={data[5].imgPath} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.medalla}
          onPress={() =>
            abrirModal(
              'Responde todas las preguntas de forma correcta en la temática organismos acuáticos, en el primer intento.',
              medalla6,
              11,
            )
          }>
          <Image style={styles.imagen} source={data[5].imgPathCompleto} />
        </TouchableOpacity>
      );
    }
  }

  function Medalla7() {
    if (!medalla7) {
      return (
        <TouchableOpacity
          style={styles.medalla}
          onPress={() =>
            abrirModal('Completa 3 temáticas al 100%.', medalla7, 14)
          }>
          <Image style={styles.imagen} source={data[6].imgPath} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.medalla}
          onPress={() =>
            abrirModal('Completa 3 temáticas al 100%.', medalla7, 13)
          }>
          <Image style={styles.imagen} source={data[6].imgPathCompleto} />
        </TouchableOpacity>
      );
    }
  }

  function Medalla8() {
    if (!medalla8) {
      return (
        <TouchableOpacity
          style={styles.medalla}
          onPress={() =>
            abrirModal(
              'Responde todas las preguntas de la temática Aves.',
              medalla8,
              16,
            )
          }>
          <Image style={styles.imagen} source={data[7].imgPath} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.medalla}
          onPress={() =>
            abrirModal(
              'Responde todas las preguntas de la temática Aves.',
              medalla8,
              15,
            )
          }>
          <Image style={styles.imagen} source={data[7].imgPathCompleto} />
        </TouchableOpacity>
      );
    }
  }

  function Medalla9() {
    if (!medalla9) {
      return (
        <TouchableOpacity
          style={styles.medalla}
          onPress={() =>
            abrirModal(
              'Responde todas las preguntas de forma correcta en la temática aves, en el primer intento.',
              medalla9,
              18,
            )
          }>
          <Image style={styles.imagen} source={data[8].imgPath} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.medalla}
          onPress={() =>
            abrirModal(
              'Responde todas las preguntas de forma correcta en la temática aves, en el primer intento.',
              medalla9,
              17,
            )
          }>
          <Image style={styles.imagen} source={data[8].imgPathCompleto} />
        </TouchableOpacity>
      );
    }
  }

  function Medalla10() {
    if (!medalla10) {
      return (
        <TouchableOpacity
          style={styles.medalla}
          onPress={() => abrirModal('Completa 4 temáticas.', medalla10, 20)}>
          <Image style={styles.imagen} source={data[9].imgPath} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.medalla}
          onPress={() => abrirModal('Completa 4 temáticas.', medalla10, 19)}>
          <Image style={styles.imagen} source={data[9].imgPathCompleto} />
        </TouchableOpacity>
      );
    }
  }

  function Medalla11() {
    if (!medalla11) {
      return (
        <TouchableOpacity
          style={styles.medalla}
          onPress={() =>
            abrirModal(
              'Ingresa en la temática transportadores/distribuidores.',
              medalla11,
              22,
            )
          }>
          <Image style={styles.imagen} source={data[10].imgPath} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.medalla}
          onPress={() =>
            abrirModal(
              'Ingresa en la temática transportadores/distribuidores.',
              medalla11,
              21,
            )
          }>
          <Image style={styles.imagen} source={data[10].imgPathCompleto} />
        </TouchableOpacity>
      );
    }
  }

  function Medalla12() {
    if (!medalla12) {
      return (
        <TouchableOpacity
          style={styles.medalla}
          onPress={() =>
            abrirModal(
              'Responde todas las preguntas de la temática transportadores/distribuidores.',
              medalla12,
              24,
            )
          }>
          <Image style={styles.imagen} source={data[11].imgPath} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.medalla}
          onPress={() =>
            abrirModal(
              'Responde todas las preguntas de la temática transportadores/distribuidores.',
              medalla12,
              23,
            )
          }>
          <Image style={styles.imagen} source={data[11].imgPathCompleto} />
        </TouchableOpacity>
      );
    }
  }

  function Medalla13() {
    if (!medalla13) {
      return (
        <TouchableOpacity
          style={styles.medalla}
          onPress={() =>
            abrirModal(
              'Responde todas las preguntas de forma correcta en la temática transportadores/distribuidores, en el primer intento.',
              medalla13,
              26,
            )
          }>
          <Image style={styles.imagen} source={data[12].imgPath} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.medalla}
          onPress={() =>
            abrirModal(
              'Responde todas las preguntas de forma correcta en la temática transportadores/distribuidores, en el primer intento.',
              medalla13,
              25,
            )
          }>
          <Image style={styles.imagen} source={data[12].imgPathCompleto} />
        </TouchableOpacity>
      );
    }
  }

  function Medalla14() {
    if (!medalla14) {
      return (
        <TouchableOpacity
          style={styles.medalla}
          onPress={() =>
            abrirModal('Completa TODAS las temáticas al 100% ', medalla14, 28)
          }>
          <Image style={styles.imagen} source={data[13].imgPath} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.medalla}
          onPress={() =>
            abrirModal('Completa TODAS las temáticas al 100% ', medalla14, 27)
          }>
          <Image style={styles.imagen} source={data[13].imgPathCompleto} />
        </TouchableOpacity>
      );
    }
  }

  function Medalla15() {
    if (!medalla15) {
      return (
        <TouchableOpacity
          style={styles.medalla}
          onPress={() =>
            abrirModal(
              'Responde todas las preguntas de forma correcta en las temáticas: Agricultores - Abejas - Organismos acuáticos - Aves.  ',
              medalla15,
              30,
            )
          }>
          <Image style={styles.imagen} source={data[14].imgPath} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.medalla}
          onPress={() =>
            abrirModal(
              'Responde todas las preguntas de forma correcta en las temáticas: Agricultores - Abejas - Organismos acuáticos - Aves.  ',
              medalla15,
              29,
            )
          }>
          <Image style={styles.imagen} source={data[14].imgPathCompleto} />
        </TouchableOpacity>
      );
    }
  }

  function Medalla16() {
    if (!medalla16) {
      return (
        <TouchableOpacity
          style={styles.medalla}
          onPress={() =>
            abrirModal(
              'Ingresa y revisa los contenidos de las pestañas: actualidad, noticias de interés y nosotros',
              medalla16,
              32,
            )
          }>
          <Image style={styles.imagen} source={data[15].imgPath} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.medalla}
          onPress={() =>
            abrirModal(
              'Ingresa y revisa los contenidos de las pestañas: actualidad, noticias de interés y nosotros',
              medalla16,
              31,
            )
          }>
          <Image style={styles.imagen} source={data[15].imgPathCompleto} />
        </TouchableOpacity>
      );
    }
  }

  const abrirModal = (texto, imagen, numeroImagen) => {
    setMedallaModal(numeroImagen);
    setImagenModal(imagen);
    setTextoModal(texto);
    setModalVisible(true);
  };

  function MedallaModalFunction() {
    // console.log(medallaModal);
    switch (medallaModal) {
      case 1:
        return (
          <View style={styles.imagenModal2}>
            <Image
              style={{flex: 1, resizeMode: 'contain', alignSelf: 'center'}}
              source={data[0].imgPathCompleto}
            />
          </View>
        );
      case 2:
        return (
          <View style={styles.imagenModal2}>
            <Image
              style={{flex: 1, resizeMode: 'contain', alignSelf: 'center'}}
              source={data[0].imgPath}
            />
          </View>
        );
      case 3:
        return (
          <View style={styles.imagenModal2}>
            <Image
              style={{flex: 1, resizeMode: 'contain', alignSelf: 'center'}}
              source={data[1].imgPathCompleto}
            />
          </View>
        );
      case 4:
        return (
          <View style={styles.imagenModal2}>
            <Image
              style={{flex: 1, resizeMode: 'contain', alignSelf: 'center'}}
              source={data[1].imgPath}
            />
          </View>
        );
      case 5:
        return (
          <View style={styles.imagenModal2}>
            <Image
              style={{flex: 1, resizeMode: 'contain', alignSelf: 'center'}}
              source={data[2].imgPathCompleto}
            />
          </View>
        );
      case 6:
        return (
          <View style={styles.imagenModal2}>
            <Image
              style={{flex: 1, resizeMode: 'contain', alignSelf: 'center'}}
              source={data[2].imgPath}
            />
          </View>
        );
      case 7:
        return (
          <View style={styles.imagenModal2}>
            <Image
              style={{flex: 1, resizeMode: 'contain', alignSelf: 'center'}}
              source={data[3].imgPathCompleto}
            />
          </View>
        );
      case 8:
        return (
          <View style={styles.imagenModal2}>
            <Image
              style={{flex: 1, resizeMode: 'contain', alignSelf: 'center'}}
              source={data[3].imgPath}
            />
          </View>
        );
      case 9:
        return (
          <View style={styles.imagenModal2}>
            <Image
              style={{flex: 1, resizeMode: 'contain', alignSelf: 'center'}}
              source={data[4].imgPathCompleto}
            />
          </View>
        );
      case 10:
        return (
          <View style={styles.imagenModal2}>
            <Image
              style={{flex: 1, resizeMode: 'contain', alignSelf: 'center'}}
              source={data[4].imgPath}
            />
          </View>
        );
      case 11:
        return (
          <View style={styles.imagenModal2}>
            <Image
              style={{flex: 1, resizeMode: 'contain', alignSelf: 'center'}}
              source={data[5].imgPathCompleto}
            />
          </View>
        );
      case 12:
        return (
          <View style={styles.imagenModal2}>
            <Image
              style={{flex: 1, resizeMode: 'contain', alignSelf: 'center'}}
              source={data[5].imgPath}
            />
          </View>
        );
      case 13:
        return (
          <View style={styles.imagenModal2}>
            <Image
              style={{flex: 1, resizeMode: 'contain', alignSelf: 'center'}}
              source={data[6].imgPathCompleto}
            />
          </View>
        );
      case 14:
        return (
          <View style={styles.imagenModal2}>
            <Image
              style={{flex: 1, resizeMode: 'contain', alignSelf: 'center'}}
              source={data[6].imgPath}
            />
          </View>
        );
      case 15:
        return (
          <View style={styles.imagenModal2}>
            <Image
              style={{flex: 1, resizeMode: 'contain', alignSelf: 'center'}}
              source={data[7].imgPathCompleto}
            />
          </View>
        );
      case 16:
        return (
          <View style={styles.imagenModal2}>
            <Image
              style={{flex: 1, resizeMode: 'contain', alignSelf: 'center'}}
              source={data[7].imgPath}
            />
          </View>
        );
      case 17:
        return (
          <View style={styles.imagenModal2}>
            <Image
              style={{flex: 1, resizeMode: 'contain', alignSelf: 'center'}}
              source={data[8].imgPathCompleto}
            />
          </View>
        );
      case 18:
        return (
          <View style={styles.imagenModal2}>
            <Image
              style={{flex: 1, resizeMode: 'contain', alignSelf: 'center'}}
              source={data[8].imgPath}
            />
          </View>
        );
      case 19:
        return (
          <View style={styles.imagenModal2}>
            <Image
              style={{flex: 1, resizeMode: 'contain', alignSelf: 'center'}}
              source={data[9].imgPathCompleto}
            />
          </View>
        );
      case 20:
        return (
          <View style={styles.imagenModal2}>
            <Image
              style={{flex: 1, resizeMode: 'contain', alignSelf: 'center'}}
              source={data[9].imgPath}
            />
          </View>
        );
      case 21:
        return (
          <View style={styles.imagenModal2}>
            <Image
              style={{flex: 1, resizeMode: 'contain', alignSelf: 'center'}}
              source={data[10].imgPathCompleto}
            />
          </View>
        );
      case 22:
        return (
          <View style={styles.imagenModal2}>
            <Image
              style={{flex: 1, resizeMode: 'contain', alignSelf: 'center'}}
              source={data[10].imgPath}
            />
          </View>
        );
      case 23:
        return (
          <View style={styles.imagenModal2}>
            <Image
              style={{flex: 1, resizeMode: 'contain', alignSelf: 'center'}}
              source={data[11].imgPathCompleto}
            />
          </View>
        );
      case 24:
        return (
          <View style={styles.imagenModal2}>
            <Image
              style={{flex: 1, resizeMode: 'contain', alignSelf: 'center'}}
              source={data[11].imgPath}
            />
          </View>
        );
      case 25:
        return (
          <View style={styles.imagenModal2}>
            <Image
              style={{flex: 1, resizeMode: 'contain', alignSelf: 'center'}}
              source={data[12].imgPathCompleto}
            />
          </View>
        );
      case 26:
        return (
          <View style={styles.imagenModal2}>
            <Image
              style={{flex: 1, resizeMode: 'contain', alignSelf: 'center'}}
              source={data[12].imgPath}
            />
          </View>
        );
      case 27:
        return (
          <View style={styles.imagenModal2}>
            <Image
              style={{flex: 1, resizeMode: 'contain', alignSelf: 'center'}}
              source={data[13].imgPathCompleto}
            />
          </View>
        );
      case 28:
        return (
          <View style={styles.imagenModal2}>
            <Image
              style={{flex: 1, resizeMode: 'contain', alignSelf: 'center'}}
              source={data[13].imgPath}
            />
          </View>
        );
      case 29:
        return (
          <View style={styles.imagenModal2}>
            <Image
              style={{flex: 1, resizeMode: 'contain', alignSelf: 'center'}}
              source={data[14].imgPathCompleto}
            />
          </View>
        );
      case 30:
        return (
          <View style={styles.imagenModal2}>
            <Image
              style={{flex: 1, resizeMode: 'contain', alignSelf: 'center'}}
              source={data[14].imgPath}
            />
          </View>
        );
      case 31:
        return (
          <View style={styles.imagenModal2}>
            <Image
              style={{flex: 1, resizeMode: 'contain', alignSelf: 'center'}}
              source={data[15].imgPathCompleto}
            />
          </View>
        );
      case 32:
        return (
          <View style={styles.imagenModal2}>
            <Image
              style={{flex: 1, resizeMode: 'contain', alignSelf: 'center'}}
              source={data[15].imgPath}
            />
          </View>
        );
      default:
        return (
          <View style={styles.imagenModal2}>
            {' '}
            <Image
              style={{flex: 1, resizeMode: 'contain', alignSelf: 'center'}}
              source={require('../../assets/m2a.png')}
            />{' '}
          </View>
        );
    }
  }

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <SafeAreaWrapper backgroundColor='#f5f5f0'>
    <View style={styles.container}>
      <View>
        <LinearGradient
          style={styles.background1}
          colors={['#2d71b0', '#20397e']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}>
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                // Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  {imagenModal ? (
                    <Image
                      style={styles.imagenModal}
                      source={require('../../assets/confetie.png')}
                    />
                  ) : null}

                  {<MedallaModalFunction />}

                  <View style={styles.horizontalLine1} />
                  <Text style={styles.modalText}>{textoModal}</Text>
                  <LinearGradient
                    colors={['#1ad17c', '#19ce79', '#099941']}
                    start={{x: 0.3, y: 0.5}}
                    end={{x: 1, y: 0.5}}
                    locations={[0, 0.7, 1]}
                    style={styles.regresarButton}>
                    <TouchableOpacity
                      onPress={() => setModalVisible(!modalVisible)}>
                      <Text style={styles.regresarText}>
                        <AntDesign
                          name="left"
                          size={wp('3%')}
                          color="#f5f5f0"
                        />{' '}
                        Regresar
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </Modal>
          </View>
        </LinearGradient>

        <LinearGradient
          style={styles.background2}
          colors={['#afd9ef', '#ffffff']}
          end={{x: 0.5, y: 0.4}}>
          <View style={styles.cabeceraScroll}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // marginLeft: 8,
              }}>
              <View style={styles.horizontalLine} />
            </View>
            <View style={styles.subtitulo}>
              <Text style={styles.subtituloText}>Medallas Obtenidas</Text>
            </View>
          </View>

          <ScrollView style={styles.bodyScroll}>
            <View style={styles.contendorMedallas1}>
              <Medalla1></Medalla1>
              <Medalla2></Medalla2>
              <Medalla3></Medalla3>
              <Medalla4></Medalla4>
            </View>
            <View style={styles.contendorMedallas1}>
              <Medalla5></Medalla5>
              <Medalla6></Medalla6>
              <Medalla7></Medalla7>
              <Medalla8></Medalla8>
            </View>
            <View style={styles.contendorMedallas1}>
              <Medalla9></Medalla9>
              <Medalla10></Medalla10>
              <Medalla11></Medalla11>
              <Medalla12></Medalla12>
            </View>
            <View style={styles.contendorMedallas1}>
              <Medalla13></Medalla13>
              <Medalla14></Medalla14>
              <Medalla15></Medalla15>
              <Medalla16></Medalla16>
            </View>
          </ScrollView>
        </LinearGradient>
      </View>

      <View style={styles.header}>
        <View style={{width: wp('45%'), height: wp('16%')}}>
          <ImageBackground
            style={styles.logo}
            source={require('../../assets/logoHorizontal.png')}
          />
        </View>

        <View>
          <Text
            style={{
              fontFamily: 'Oxygen-Bold',
              fontSize: wp('5%'),
              color: '#f5f5f0',
              paddingLeft: wp('26%'),
            }}>
            Perfil
          </Text>
        </View>
      </View>
      {isLoading && <Loading />}
    </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#20397e',
    alignItems: 'center',
  },
  background1: {
    width: '100%',
    height: '20%',
    opacity: 1,
  },
  background2: {
    height: '80%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
  cabeceraScroll: {
    height: hp('15%'),
    width: wp('100%'),
  },

  horizontalLine: {
    flex: 1,
    height: hp('1%'),
    backgroundColor: '#20397e',
    marginLeft: wp('6%'),
    marginRight: wp('80%'),
    marginTop: hp('5%'),
  },

  horizontalLine1: {
    marginVertical: hp('3%'),
    width: wp('10%'),
    height: hp('1%'),
    backgroundColor: '#20397e',
  },
  subtituloText: {
    fontFamily: 'Roboto-Light',
    // fontSize: 20,
    fontSize: wp('6%'),
    color: '#00983a',
    marginTop: hp('2%'),
    marginLeft: wp('7%'),
  },
  bodyScroll: {
    marginBottom: hp('1%'),
  },
  contendorMedallas1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    justifyContent: 'space-between',
    marginVertical: hp('2%'),
    marginHorizontal: hp('2%'),
  },
  medalla: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('18%'),
    height: wp('18%'),
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
  },
  imagen: {
    // padding: 5,
    flex: 1,
    resizeMode: 'contain',
    width: wp('18%'),
    height: wp('18%'),
  },
  imagenModal: {
    position: 'absolute',
    // top: -40,
    // resizeMode: 'center',
    width: wp('68%'),
    height: hp('20%'),
    overflow: 'hidden',
  },
  imagenModal2: {
    // borderRadius: 300,
    resizeMode: 'center',
    width: wp('18%'),
    height: wp('18%'),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: wp('70%'),
    borderWidth: 2,
    borderColor: '#00983A',
    marginTop: hp('25%'),
    backgroundColor: 'white',
    borderRadius: 20,
    // padding: 30,
    padding: wp('5%'),
    // paddingTop: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    // padding: 10,
    padding: wp('2%'),
    elevation: 2,
  },
  buttonClose: {
    flexDirection: 'row',
    backgroundColor: '#099941',
    // padding: 6,
    padding: wp('1%'),
    borderRadius: 40,
    alignItems: 'center',
    marginVertical: hp('3%'),
  },
  textStyle: {
    color: '#f5f5f0',
    fontFamily: 'Roboto-Regular',
    fontSize: wp('4.5%'),
  },
  modalText: {
    marginBottom: hp('2%'),
    textAlign: 'center',
    fontSize: wp('4%'),
    fontFamily: 'Roboto-Regular',
    color: '#7c7d7d',
  },
  regresarButton: {
    borderRadius: 25,
    padding: wp('1%'),
  },
  regresarText: {
    marginHorizontal: wp('2%'),
    color: '#f5f5f0',
    fontFamily: 'Roboto-Regular',
    fontSize: wp('3%'),
  },
  contenedorImagenesModal: {
    flexDirection: 'row',
    resizeMode: 'center',
    justifyContent: 'center',
  },
});
