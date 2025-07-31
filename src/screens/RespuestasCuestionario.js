import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import * as ScreenOrientation from 'expo-screen-orientation';
import data from '../../data/dataAmbientes';
import RespuestasAgricultores from './RespuestasAgricultores';
import Loading from './Loading';

export default function RespuestasCuestionario(props) {
  const cuestionarioResultado = props.route.params.testPresentado;
  const [indexArrayPasos, setIndexArrayPasos] = React.useState(0);
  const [tamañoArrayCuestionario, setTamañoArrayCuestionario] =
    React.useState(0);

  React.useEffect(() => {
    let tamañoArray = 0;
    for (let i = 0; i < cuestionarioResultado.length; i++) {
      if (cuestionarioResultado[i].calificacion) {
        tamañoArray++;
        setTamañoArrayCuestionario(tamañoArray);
      }
    }
  }, []);

  if (cuestionarioResultado == null || cuestionarioResultado == undefined) {
    return <Loading />;
  }

  return (
    <RespuestasAgricultores
      // tamaño={tamañoArrayCuestionario}
      navigation={props.navigation}
      // indexArrayPasos={indexArrayPasos}
      // setIndexArrayPasos={setIndexArrayPasos}
      calificacionTest={props.route.params.calificacionTest}
      cuestionario={cuestionarioResultado}
      nombreAmbiente={props.route.params.nombreAmbiente}
    />
  );
}

const styles = StyleSheet.create({});
