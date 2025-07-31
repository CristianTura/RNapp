import { LinearGradient } from 'expo-linear-gradient';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function TemaAmpliado(props) {
  return (
    <View style={{height: '100%', flex: 1, backgroundColor: '#fff'}}>
      <LinearGradient
        style={styles.background1}
        colors={['#2d71b0', '#20397e']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
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
                // fontSize: 18,
                fontSize: wp('4.5%'),
                color: '#f5f5f0',
                paddingLeft: wp('16%'),
              }}>
              Novedades
            </Text>
          </View>
        </View>
      </LinearGradient>

      <View
        style={{
          position: 'absolute',
          width: '100%',
          marginTop: hp('25%'),
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View style={styles.horizontalLine} />
        </View>
        <View
          style={{
            marginTop: hp('1%'),
            marginBottom: hp('1%'),
            alignSelf: 'flex-start',
          }}>
          <Text style={styles.tituloVerde}>
            {props.route.params.tituloPantalla}
          </Text>
        </View>

        <View
          style={{
            width: wp('90%'),
            height: hp('70%'),
            borderRadius: 20,
            backgroundColor: '#f5f5f0',
            marginTop: hp('2%'),
            alignItems: 'center',
            alignSelf: 'center',
            shadowColor: 'black',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 1.0,
            elevation: 10,
          }}>
          <ScrollView style={{height: hp('30%')}}>
            <View
              style={{
                width: wp('85%'),
                height: hp('20%'),
                borderRadius: 20,
                overflow: 'hidden',
                marginTop: hp('1.5%'),
              }}>
              <ImageBackground
                source={{uri: props.route.params.imagenTemaPath}}
                style={{flex: 1, resizeMode: 'contain'}}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: hp('2%'),
              }}>
              <View style={styles.horizontalLine2} />
            </View>
            <View
              style={{
                width: wp('85%'),
              }}>
              <Text style={styles.titulo}>{props.route.params.tituloTema}</Text>
              <RenderHtml
              containerStyle={styles.contenido}
                style={styles.contenido}
                source={{html: props.route.params.contenidoTema}}
                tagsStyles={{
                  p: {
                    fontSize: wp('4%'),
                  },
                  span: {
                    fontSize: wp('4%'),
                  },
                }}
              />
            </View>
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: wp('85%'),
              marginTop: hp('1.5%'),
              marginBottom: hp('20%'),
            }}>
            <TouchableOpacity
              // onPress={() => this.props.navigation.navigate('Home')}>
              onPress={() => props.navigation.goBack()}>
              <LinearGradient
                colors={['#1ad17c', '#19ce79', '#099941']}
                start={{x: 0.3, y: 0.5}}
                end={{x: 1, y: 0.5}}
                locations={[0, 0.7, 1]}
                style={styles.button}>
                <Text style={styles.buttonText}>
                  <AntDesign name="left" size={wp('3%')} color="#f5f5f0" />{' '}
                  Regresar
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <LinearGradient
              style={[
                styles.button,

                {opacity: props.route.params.testDeshabilitado ? 0 : 1},
                ,
              ]}
              colors={['#2d71b0', '#20397e']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}>
              <TouchableOpacity
                disabled={props.route.params.testDeshabilitado ? true : false}
                style={{borderRadius: 20}}
                onPress={() => props.navigation.navigate('Ambientes')}>
                <Text style={styles.buttonText}>Realizar test</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background1: {
    // width: '100%',
    width: wp('100%'),
    height: hp('20%'),
    opacity: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
    borderTopWidth: 0,
    overflow: 'hidden',
    alignItems: 'center',
    position: 'absolute',
  },

  header: {
    width: wp('90%'),
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

  horizontalLine: {
    flex: 1,
    height: hp('1%'),
    backgroundColor: '#20397e',
    marginLeft: wp('6%'),
    marginRight: wp('75%'),
  },

  tituloVerde: {
    fontFamily: 'Roboto-Light',
    fontSize: wp('5%'),
    color: '#00983a',
    marginLeft: wp('6%'),
  },

  titulo: {
    color: '#5f5e5e',
    fontSize: wp('4%'),
    width: wp('85%'),
    marginTop: hp('1%'),
    marginBottom: hp('4%'),
  },

  contenido: {
    fontSize: wp('4%'),
    color: '#6d6d6d',
    fontFamily: 'Roboto-Regular',
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

  horizontalLine2: {
    flex: 1,
    height: hp('1%'),
    backgroundColor: '#20397e',
    marginLeft: wp('3.5%'),
    marginRight: wp('75%'),
  },

  button: {
    borderRadius: 40,
    overflow: 'hidden',
    padding: wp('1%'),
  },

  buttonText: {
    marginHorizontal: wp('2%'),
    marginVertical: hp('0.5%'),
    color: '#f5f5f0',
    fontFamily: 'Roboto-Regular',
    fontSize: wp('3%'),
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
