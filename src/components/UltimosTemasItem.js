import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function UltimosTemasItem({
  imagenTemaPath,
  tituloTema,
  navigation,
  contenidoTema,
  testDeshabilitado,
  tituloPantalla,
}) {
  return (
    <View
      style={{
        width: wp('90%'),
        height: hp('33%'),
        borderRadius: 20,
        backgroundColor: '#f5f5f0',
        marginVertical: hp('3%'),
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 1.0,
        elevation: 10,
      }}>
      <View
        style={{
          width: wp('85%'),
          height: hp('20%'),
          borderRadius: 20,
          overflow: 'hidden',
          marginTop: hp('1.5%'),
        }}>
        <ImageBackground
          source={{uri: imagenTemaPath}}
          style={{flex: 1, resizeMode: 'contain'}}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: hp('1.5%'),
        }}>
        <View style={styles.horizontalLine} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: wp('85%'),
          height: hp('8%'),
        }}>
        <Text style={styles.titulo}>{tituloTema}</Text>
        <TouchableOpacity
          style={styles.temaButton}
          onPress={() =>
            navigation.navigate('TemaAmpliado', {
              imagenTemaPath,
              tituloTema,
              contenidoTema,
              testDeshabilitado,
              tituloPantalla,
            })
          }>
          <Text style={styles.temaText}>Ver Tema</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titulo: {
    width: '70%',
    color: '#5f5e5e',
    fontSize: wp('4%'),
  },
  temaButton: {
    backgroundColor: '#00983a',
    padding: wp('1.5%'),
    borderRadius: 40,
  },

  temaText: {
    fontFamily: 'Roboto-Regular',
    fontSize: wp('3.5%'),
    color: '#f5f5f0',
    paddingHorizontal: wp('2%'),
  },

  horizontalLine: {
    flex: 1,
    // height: 5,
    height: hp('1%'),
    backgroundColor: '#20397e',
    // marginLeft: '6%',
    marginLeft: wp('3.5%'),
    // marginRight: '83%',
    marginRight: wp('75%'),
  },
});
