import NetInfo from '@react-native-community/netinfo';
import React, { useEffect } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import RenderHtml from 'react-native-render-html';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import { getFaq } from '../../api/api';
import Fondo from '../components/FondoVistasDrawer';
import SafeAreaWrapper from '../components/SafeAreaWrapper';

const SECTIONS = [
  {
    title: 'Pregunta 1',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam esse quibusdam repellendus? Dicta commodi rem, dolores tempore voluptatem corrupti amet!',
    bg: 'yellow',
  },
  {
    title: 'Pregunta 2',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam esse quibusdam repellendus? Dicta commodi rem, dolores tempore voluptatem corrupti amet!',
    bg: 'blue',
  },
  {
    title: 'Pregunta 3',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam esse quibusdam repellendus? Dicta commodi rem, dolores tempore voluptatem corrupti amet!',
  },
  {
    title: 'Pregunta 4',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam esse quibusdam repellendus? Dicta commodi rem, dolores tempore voluptatem corrupti amet!',
  },
];

export default function Faq({navigation}) {
  const [activeSections, setActiveSections] = React.useState([]);
  const iconNameActive = 'minus';
  const iconNameInactive = 'plus';
  const [faq, setFaq] = React.useState([]);

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
    NetInfo.fetch().then((state) => {
      if (state.isConnected == true) {
        getFaq().then((response) => {
          if (response == 'error de conexion') {
            conexion();
          } else {
            setFaq(response);
          }
        });
      } else {
        conexion();
      }
    });
  }, []);

  const _renderHeader = (faq, _, isActive) => {
    return (
      <View style={styles.header}>
        <Text
          style={[
            {
              fontFamily: 'Roboto-Bold',
              // fontSize: 16,
              fontSize: wp('5%'),
              letterSpacing: wp('0.5%'),
            },
            isActive ? styles.active : styles.inactive,
          ]}>
          {faq.titulo}
        </Text>
        <Entypo
          style={[
            {fontFamily: 'Roboto-Bold', fontSize: wp('4%')},
            isActive ? styles.active : styles.inactive,
          ]}
          name={isActive ? iconNameActive : iconNameInactive}
        />
      </View>
    );
  };

  const _renderContent = (faq) => {
    return (
      <View style={styles.content}>
        {/* <Text style={styles.contentText}>{faq.cuerpo}</Text> */}
        <RenderHtml
          contentWidth={wp('100%')}
          tagsStyles={{
            p: {
              color: '#454461',
              fontFamily: 'Roboto-Light',
              margin: 0,
              padding: 0,
              fontSize: wp('5%'),
            },
            span: {
              color: '#454461',
              fontFamily: 'Roboto-Light',
              margin: 0,
              padding: 0,
              fontSize: wp('5%'),
            },
            body: {
              color: '#6d6d6d',
              fontFamily: 'Roboto-Regular',
              lineHeight: hp('3%'),
              fontSize: wp('4%'),
            },
          }}
          source={{html: faq.cuerpo}}
        />
      </View>
    );
  };

  const _updateSections = (activeSections) => {
    setActiveSections(activeSections);
  };
  return (
    <SafeAreaWrapper backgroundColor='#f5f5f0'>
      <View style={{backgroundColor: '#fff', height: '100%'}}>
        <View>
          <Fondo navigation={navigation} />
        </View>
        <View style={{position: 'absolute'}}></View>
        <ScrollView
          style={{
            // marginTop: '10%',
            marginTop: hp('5%'),
            // marginHorizontal: '10%',
            marginHorizontal: wp('10%'),
          }}>
          <Text style={styles.titulo}>Sugerencias o FAQ</Text>
          <Accordion
            activeSections={activeSections}
            sections={faq}
            renderHeader={(faq, _, isActive) => _renderHeader(faq, _, isActive)}
            renderContent={e => _renderContent(e)}
            onChange={e => _updateSections(e)}
            underlayColor="transparent"
            sectionContainerStyle={{
              borderRadius: 15,
              backgroundColor: '#f5f5f0',
              // marginVertical: 10,
              marginVertical: hp('1%'),
            }}
          />
        </ScrollView>
      </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  active: {
    color: '#00983a',
  },

  inactive: {
    color: '#6d6d6d',
  },

  titulo: {
    fontFamily: 'Roboto-Bold',
    // fontSize: 20,
    fontSize: wp('6%'),
    color: '#797979',
    // marginVertical: '5%',
    marginVertical: hp('3%'),
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: 10,
    paddingHorizontal: wp('4%'),
    // marginVertical: 12,
    marginVertical: hp('1.5%'),
  },

  content: {
    // padding: 10,
    padding: wp('4%'),
  },

  contentText: {
    color: '#6d6d6d',
    fontFamily: 'Roboto-Regular',
    // lineHeight: 20,
    lineHeight: hp('3%'),
    fontSize: wp('4%'),
  },
});
