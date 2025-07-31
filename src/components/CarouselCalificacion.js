import React from 'react';
import data from '../../data/dataProgreso';
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  ImageBackground,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUltimoTestPresentado} from '../../api/api';

const CarouselCalificacion = ({
  navigation,
  calificacion1Test,
  calificacion2Test,
  calificacion3Test,
  calificacion4Test,
  calificacion5Test,
  setCalificacion1Test,
  setCalificacion2Test,
  setCalificacion3Test,
  setCalificacion4Test,
  setCalificacion5Test,
}) => {
  // const [calificacion1Test, setCalificacion1Test] = React.useState(0);
  // const [calificacion2Test, setCalificacion2Test] = React.useState(0);
  // const [calificacion3Test, setCalificacion3Test] = React.useState(0);
  // const [calificacion4Test, setCalificacion4Test] = React.useState(0);
  // const [calificacion5Test, setCalificacion5Test] = React.useState(0);

  const [testPresentados1, setTestPresentados1] = React.useState([]);
  const [testPresentados2, setTestPresentados2] = React.useState([]);
  const [testPresentados3, setTestPresentados3] = React.useState([]);
  const [testPresentados4, setTestPresentados4] = React.useState([]);
  const [testPresentados5, setTestPresentados5] = React.useState([]);

  React.useEffect(() => {
    promedioUltimoTestAgricultores();
    promedioUltimoTestAbejas();
    promedioUltimoTestAcuaticos();
    promedioUltimoTestAves();
    promedioUltimoTestTransportadores();
  }, []);

  const promedioUltimoTestAgricultores = () => {
    AsyncStorage.getItem('token').then((value) => {
      const token = value;
      let arrayUltimaCalificacion = [];
      let arrayUltimoTest = new Array(9).fill({});
      for (let i = 1; i <= 9; i++) {
        getUltimoTestPresentado(1, i, token).then((response) => {
          if (
            response.calificacion != undefined ||
            response.calificacion != null
          ) {
            arrayUltimaCalificacion.push(response.calificacion);
            arrayUltimoTest.splice(i - 1, 1, response);
            setTestPresentados1(arrayUltimoTest);
            let sum = arrayUltimaCalificacion.reduce(
              (previous, current) => (current += previous),
            );
            let avg = Math.round(sum / arrayUltimaCalificacion.length);
            setCalificacion1Test(avg);
          } else {
            arrayUltimaCalificacion.push(0);
            let sum = arrayUltimaCalificacion.reduce(
              (previous, current) => (current += previous),
            );
            let avg = Math.round(sum / arrayUltimaCalificacion.length);
            setCalificacion1Test(avg);
          }
        });
      }
    });
  };

  const promedioUltimoTestAbejas = () => {
    AsyncStorage.getItem('token').then((value) => {
      const token = value;
      let arrayUltimaCalificacion = [];
      let arrayUltimoTest = new Array(7).fill({});
      for (let i = 1; i <= 7; i++) {
        getUltimoTestPresentado(2, i, token).then((response) => {
          if (
            response.calificacion != undefined ||
            response.calificacion != null
          ) {
            arrayUltimaCalificacion.push(response.calificacion);
            arrayUltimoTest.splice(i - 1, 1, response);
            setTestPresentados2(arrayUltimoTest);
            let sum = arrayUltimaCalificacion.reduce(
              (previous, current) => (current += previous),
            );
            let avg = Math.round(sum / arrayUltimaCalificacion.length);
            setCalificacion2Test(avg);
          } else {
            arrayUltimaCalificacion.push(0);
            let sum = arrayUltimaCalificacion.reduce(
              (previous, current) => (current += previous),
            );
            let avg = Math.round(sum / arrayUltimaCalificacion.length);
            setCalificacion2Test(avg);
          }
        });
      }
    });
  };

  const promedioUltimoTestAcuaticos = () => {
    AsyncStorage.getItem('token').then((value) => {
      const token = value;
      let arrayUltimaCalificacion = [];
      let arrayUltimoTest = new Array(6).fill({});
      for (let i = 1; i <= 6; i++) {
        getUltimoTestPresentado(3, i, token).then((response) => {
          if (
            response.calificacion != undefined ||
            response.calificacion != null
          ) {
            arrayUltimaCalificacion.push(response.calificacion);
            arrayUltimoTest.splice(i - 1, 1, response);
            setTestPresentados3(arrayUltimoTest);
            let sum = arrayUltimaCalificacion.reduce(
              (previous, current) => (current += previous),
            );
            let avg = Math.round(sum / arrayUltimaCalificacion.length);
            setCalificacion3Test(avg);
          } else {
            arrayUltimaCalificacion.push(0);
            let sum = arrayUltimaCalificacion.reduce(
              (previous, current) => (current += previous),
            );
            let avg = Math.round(sum / arrayUltimaCalificacion.length);
            setCalificacion3Test(avg);
          }
        });
      }
    });
  };

  const promedioUltimoTestAves = () => {
    AsyncStorage.getItem('token').then((value) => {
      const token = value;
      let arrayUltimaCalificacion = [];
      let arrayUltimoTest = new Array(5).fill({});
      for (let i = 1; i <= 5; i++) {
        getUltimoTestPresentado(4, i, token).then((response) => {
          if (
            response.calificacion != undefined ||
            response.calificacion != null
          ) {
            arrayUltimaCalificacion.push(response.calificacion);
            arrayUltimoTest.splice(i - 1, 1, response);
            setTestPresentados4(arrayUltimoTest);
            let sum = arrayUltimaCalificacion.reduce(
              (previous, current) => (current += previous),
            );
            let avg = Math.round(sum / arrayUltimaCalificacion.length);
            setCalificacion4Test(avg);
          } else {
            arrayUltimaCalificacion.push(0);
            let sum = arrayUltimaCalificacion.reduce(
              (previous, current) => (current += previous),
            );
            let avg = Math.round(sum / arrayUltimaCalificacion.length);
            setCalificacion4Test(avg);
          }
        });
      }
    });
  };

  const promedioUltimoTestTransportadores = () => {
    AsyncStorage.getItem('token').then((value) => {
      const token = value;
      let arrayUltimaCalificacion = [];
      let arrayUltimoTest = new Array(9).fill({});
      for (let i = 1; i <= 9; i++) {
        getUltimoTestPresentado(5, i, token).then((response) => {
          if (
            response.calificacion != undefined ||
            response.calificacion != null
          ) {
            arrayUltimaCalificacion.push(response.calificacion);
            arrayUltimoTest.splice(i - 1, 1, response);
            setTestPresentados5(arrayUltimoTest);
            let sum = arrayUltimaCalificacion.reduce(
              (previous, current) => (current += previous),
            );
            let avg = Math.round(sum / arrayUltimaCalificacion.length);
            setCalificacion5Test(avg);
          } else {
            arrayUltimaCalificacion.push(0);
            let sum = arrayUltimaCalificacion.reduce(
              (previous, current) => (current += previous),
            );
            let avg = Math.round(sum / arrayUltimaCalificacion.length);
            setCalificacion5Test(avg);
          }
        });
      }
    });
  };

  const CarouselProgresoItem = ({
    item,
    index,
    calificacionTest,
    testPresentado,
  }) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.container}
        disabled={!Boolean(testPresentado[0])} //probando cualquier ubicacion del objeto para ver si hay alguna información
        onPress={() => {
            navigation.navigate('RespuestasCuestionario', {
            testPresentado: testPresentado,
            nombreAmbiente: item.text,
            calificacionTest:calificacionTest,
          });
        }}>
        <ImageBackground
          style={[styles.image, {flex: 1}]}
          source={calificacionTest >= 80 ? item.imgPathCompleto : item.imgPath}>
          <Text
            style={{
              color: calificacionTest >= 80 ? '#fff' : '#7E7E7E',
              fontFamily: 'Roboto-Bold',
              // fontSize: 35,
              fontSize: wp('10%'),
              marginTop: '98%',
              textAlign: 'center',
            }}>
            {calificacionTest}%
          </Text>
          <Text
            style={{
              color: calificacionTest >= 80 ? '#fff' : '#7E7E7E',
              fontFamily: 'Roboto-Bold',
              // fontSize: 18,
              fontSize: wp('4.5%'),
              textAlign: 'center',
            }}>
            {item.text}{' '}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView
      // content container style se debe eliminar en el momento de que ingresen los nuevos ambientes
      // contentContainerStyle={{alignItems: 'center'}}
      style={{marginTop: hp('3%')}}
      horizontal={true}
      nestedScrollEnabled={true}>
      <CarouselProgresoItem
        item={data[0]}
        calificacionTest={calificacion1Test}
        testPresentado={testPresentados1}
      />
      <CarouselProgresoItem
        item={data[1]}
        calificacionTest={calificacion2Test}
        testPresentado={testPresentados2}
      />
      <CarouselProgresoItem
        item={data[2]}
        calificacionTest={calificacion3Test}
        testPresentado={testPresentados3}
      />
      <CarouselProgresoItem
        item={data[3]}
        calificacionTest={calificacion4Test}
        testPresentado={testPresentados4}
      />
      <CarouselProgresoItem
        item={data[4]}
        calificacionTest={calificacion5Test}
        testPresentado={testPresentados5}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('35%'),
    height: wp('60%'),
    marginHorizontal: wp('2%'),
  },

  image: {
    // width: 115,
    // height: 200,
    // marginHorizontal: 12,
    flex: 1,
    resizeMode: 'contain',
  },
});

export default CarouselCalificacion;
