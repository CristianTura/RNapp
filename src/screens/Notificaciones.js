import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Fondo from '../components/FondoVistasDrawer';
import SwitchButton from '../components/SwitchButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function Notificaciones({navigation}) {
  const [isEnabledSMS, setIsEnabledSMS] = React.useState(false);
  const toggleSwitchSMS = () => setIsEnabledSMS((previousState) => !previousState);

  const [isEnabledPush, setIsEnabledPush] = React.useState(false);
  const toggleSwitchPush = () => setIsEnabledPush((previousState) => !previousState);

  return (
    <View style={{backgroundColor: '#fff'}}>
      <View>
        <Fondo navigation={navigation} />
      </View>

      <View style={{padding: wp('7%'), height: hp('100%')}}>
        <View>
          <Text style={styles.titulo}>Notificaciones Personales</Text>
          <Text style={styles.texto}>
            Configura las notificaciones que te gustaría recibir de Segetis.
          </Text>
        </View>
        <View style={{marginTop: hp('5%')}}>
          <SwitchButton
            text="SMS"
            isEnabled={isEnabledSMS}
            toggleSwitch={toggleSwitchSMS}
          />
          {/* <SwitchButton text="Emails" /> */}
          <SwitchButton
            text="Notificaciones Push"
            isEnabled={isEnabledPush}
            toggleSwitch={toggleSwitchPush}
          />
          {/* <SwitchButton text="Pop-ups" /> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontFamily: 'Roboto-Bold',
    // fontSize: 19,
    fontSize:  wp('6%'),
    color: '#797979',
    // lineHeight: 40,
    lineHeight:hp('10%'),
  },

  texto: {
    fontFamily: 'Roboto-Regular',
    color: '#7c7d7d',
    // fontSize: 16,
    fontSize:wp('5%'),
  },
});
