import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

// Importar iconos
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleIcons from 'react-native-vector-icons/SimpleLineIcons';

// Importar componentes de src/screens
import CustomDrawer from '../app/CustomDrawer';
import AbejasHome from '../src/screens/AbejasHome';
import AcuaticosHome from '../src/screens/AcuaticosHome';
import AgricultoresHome from '../src/screens/AgricultoresHome';
import AgricultoresPop from '../src/screens/AgricultoresPop';
import AgricultoresSplash from '../src/screens/AgricultoresSplash';
import Ambientes from '../src/screens/Ambientes';
import AmbientesSplash from '../src/screens/AmbientesSplash';
import AvesHome from '../src/screens/AvesHome';
import Certificados from '../src/screens/Certificados';
import ConoceEmpresa from '../src/screens/ConoceEmpresa';
import Cuestionario from '../src/screens/Cuestionario';
import EditarPerfil from '../src/screens/EditarPerfil';
import Eliminar from '../src/screens/Eliminar';
import Faq from '../src/screens/Faq';
import Felicidades from '../src/screens/Felicidades';
import HomeScreen from '../src/screens/HomeScreen';
import HomeSesion from '../src/screens/HomeSesion';
import InicioSesion from '../src/screens/InicioSesion';
import Mas from '../src/screens/Mas';
import Medallas from '../src/screens/Medallas';
import Noticias from '../src/screens/Noticias';
import Notificaciones from '../src/screens/Notificaciones';
import Oops from '../src/screens/Oops';
import Perfil from '../src/screens/Perfil';
import PopUps from '../src/screens/PopUps';
import Privacidad from '../src/screens/Privacidad';
import Recomendar from '../src/screens/Recomendar';
import Redes from '../src/screens/Redes';
import Registro from '../src/screens/Registro';
import Respuestas from '../src/screens/Respuestas';
import RespuestasCuestionario from '../src/screens/RespuestasCuestionario';
import Soporte from '../src/screens/Soporte';
import TemaAmpliado from '../src/screens/TemaAmpliado';
import Temario from '../src/screens/Temario';
import Terminos from '../src/screens/Terminos';
import TranspHome from '../src/screens/TranspHome';
import UltimosTemas from '../src/screens/UltimosTemas';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const RootStack = createStackNavigator();
const NovedadesStack = createStackNavigator();
const PerfilStack = createStackNavigator();

// Stack para Novedades
export function NovedadesNav() {
  return (
    <NovedadesStack.Navigator screenOptions={{ headerShown: false }}>
      <NovedadesStack.Screen name="HomeSesion" component={HomeSesion} />
      <NovedadesStack.Screen name="Temas" component={UltimosTemas} />
      <NovedadesStack.Screen name="Noticias" component={Noticias} />
      <NovedadesStack.Screen name="Empresa" component={ConoceEmpresa} />
      <NovedadesStack.Screen name="TemaAmpliado" component={TemaAmpliado} />
    </NovedadesStack.Navigator>
  );
}

// Stack para Perfil
export function PerfilNav() {
  return (
    <PerfilStack.Navigator screenOptions={{ headerShown: false }}>
      <PerfilStack.Screen name="Perfil" component={Perfil} />
      <PerfilStack.Screen name="Medallas" component={Medallas} />
      <PerfilStack.Screen name="Certificados" component={Certificados} />
      <PerfilStack.Screen name="EditarPerfil" component={EditarPerfil} />
    </PerfilStack.Navigator>
  );
}

// Bottom Tab Navigator
function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="NovedadesNav"
      screenOptions={{ 
        headerShown: false,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#fff',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'transparent',
          elevation: 0,
          height: hp('10%'),
          borderTopColor: 'transparent',
        },
      }}
      tabBar={props => (
        <LinearGradient
          colors={['#1ad17c', '#099941']}
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: 0.5, y: 1 }}
          style={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <BottomTabBar {...props} />
        </LinearGradient>
      )}
    >
      <Tab.Screen
        name="NovedadesNav"
        listeners={({ navigation }) => ({
          blur: () => navigation.setParams({ screen: undefined }),
        })}
        component={NovedadesNav}
        options={{
          unmountOnBlur: true,
          tabBarIconStyle: {
            height: hp('8%'),
          },
          tabBarIcon: (props) => (
            <Ionicons
              style={{
                backgroundColor: props.focused
                  ? 'rgba(245,245,240,0.5)'
                  : 'transparent',
                paddingHorizontal: wp('3%'),
                paddingVertical: hp('1%'),
                borderRadius: 15,
                overflow: 'hidden',
                width: wp('14%'),
              }}
              name="home-outline"
              color={props.color}
              size={wp('7.5%')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Ambientes"
        component={Ambientes}
        options={{
          tabBarIconStyle: {
            height: hp('8%'),
          },
          tabBarIcon: (props) => (
            <SimpleIcons
              style={{
                backgroundColor: props.focused
                  ? 'rgba(245,245,240,0.5)'
                  : 'transparent',
                paddingHorizontal: wp('3%'),
                paddingVertical: hp('1%'),
                borderRadius: 15,
                overflow: 'hidden',
                width: wp('14%'),
              }}
              name="magnifier"
              color={props.color}
              size={wp('7.5%')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="PerfilTab"
        listeners={({ navigation }) => ({
          blur: () => navigation.setParams({ screen: undefined }),
        })}
        component={PerfilNav}
        options={{
          tabBarIconStyle: {
            height: hp('8%'),
          },
          unmountOnBlur: true,
          tabBarIcon: (props) => (
            <Ionicons
              style={{
                backgroundColor: props.focused
                  ? 'rgba(245,245,240,0.5)'
                  : 'transparent',
                paddingHorizontal: wp('3%'),
                paddingVertical: hp('1%'),
                borderRadius: 15,
                overflow: 'hidden',
                width: wp('14%'),
              }}
              name="person-outline"
              color={props.color}
              size={wp('7.5%')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Mas"
        component={Mas}
        options={{
          tabBarIconStyle: {
            height: hp('8%'),
          },
          tabBarIcon: (props) => (
            <EvilIcons
              style={{
                backgroundColor: props.focused
                  ? 'rgba(245,245,240,0.5)'
                  : 'transparent',
                paddingHorizontal: wp('3%'),
                paddingVertical: hp('1%'),
                borderRadius: 15,
                overflow: 'hidden',
                width: wp('14%'),
              }}
              name="plus"
              color={props.color}
              size={wp('9%')}
            />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.dispatch(DrawerActions.openDrawer());
          },
        })}
      />
    </Tab.Navigator>
  );
}

// Drawer Navigator
function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false
      }}
    drawerStyle={{
      backgroundColor: '#fff',
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      // width: '85%',
      width: wp('85%'),
    }}
    drawerContent={(props) => <CustomDrawer progress={props.progress} {...props} />}
    drawerContentOptions={{
      activeBackgroundColor: 'transparent',
      itemStyle: {
        paddingVertical: '1%',
        borderWidth: 1,
        borderColor: 'transparent',
        borderBottomColor: '#e6e6e6',
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
      },
      labelStyle: {
        marginLeft: 0,
        marginRight: 0,
      },
    }}>
      <Drawer.Screen
        name="Menú Principal"
        component={MyTabs}
        options={{
          drawerLabel: () => null,
          headerShown: false
        }}
      />
      <Drawer.Screen
        name="Notificaciones personalizadas"
        component={Notificaciones}
        options={{
          drawerLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? '#00983a' : '#7c7d7d',
                marginLeft: '10%',
              }}>
              <Fontisto
                name="bell"
                size={15}
                color={focused ? '#00983a' : '#7c7d7d'}
              />
              <Text>
                {'  '}Notificaciones personalizadas{'   '}
              </Text>
              <AntDesign name="right" size={10} style={{marginLeft: 5}} />
            </Text>
          ),
        }}
      />
      <Drawer.Screen
        name="Síguenos en redes sociales"
        component={Redes}
        options={{
          drawerLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? '#00983a' : '#7c7d7d',
                marginLeft: '10%',
              }}>
              <AntDesign
                name="sharealt"
                size={15}
                color={focused ? '#00983a' : '#7c7d7d'}
                style={{
                  marginLeft: '3%',
                }}
              />
              <Text>
                {'  '}Síguenos en redes sociales{'        '}
              </Text>
              <AntDesign name="right" size={10} style={{marginLeft: 5}} />
            </Text>
          ),
        }}
      />
      <Drawer.Screen
        name="Recomendar app"
        component={Recomendar}
        options={{
          drawerLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? '#00983a' : '#7c7d7d',
                marginLeft: '10%',
              }}>
              <Ionicons
                name="arrow-redo"
                size={15}
                color={focused ? '#00983a' : '#7c7d7d'}
              />
              <Text>
                {'  '}Recomendar app{'                          '}
              </Text>
              <AntDesign name="right" size={10} style={{marginLeft: 5}} />
            </Text>
          ),
        }}
      />
      <Drawer.Screen
        name="Ayuda o soporte"
        component={Soporte}
        options={{
          drawerLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? '#00983a' : '#7c7d7d',
                marginLeft: '10%',
              }}>
              <Ionicons
                name="settings-outline"
                size={15}
                color={focused ? '#00983a' : '#7c7d7d'}
                style={{
                  marginLeft: '3%',
                }}
              />
              <Text>
                {'  '}Ayuda o soporte{'                           '}
              </Text>
              <AntDesign name="right" size={10} style={{marginLeft: 5}} />
            </Text>
          ),
        }}
      />
      <Drawer.Screen
        name="Sugerencias o FAQ"
        component={Faq}
        options={{
          drawerLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? '#00983a' : '#7c7d7d',
                marginLeft: '10%',
              }}>
              <MaterialIcons
                name="comment-question-outline"
                size={15}
                color={focused ? '#00983a' : '#7c7d7d'}
                style={{
                  marginLeft: '3%',
                }}
              />
              <Text>
                {'  '}Sugerencias o FAQ{'                       '}
              </Text>
              <AntDesign name="right" size={10} style={{marginLeft: 5}} />
            </Text>
          ),
        }}
      />
      <Drawer.Screen
        name="Políticas de privacidad"
        component={Privacidad}
        options={{
          drawerLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? '#00983a' : '#7c7d7d',
                marginLeft: '10%',
              }}>
              <SimpleIcons
                name="lock"
                size={15}
                color={focused ? '#00983a' : '#7c7d7d'}
              />
              <Text>
                {'  '}Políticas de privacidad {'               '}
              </Text>
              <AntDesign name="right" size={10} style={{marginLeft: 5}} />
            </Text>
          ),
        }}
      />
      <Drawer.Screen
        name="Términos y condiciones"
        component={Terminos}
        options={{
          drawerLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? '#00983a' : '#7c7d7d',
                marginLeft: '10%',
              }}>
              <MaterialIcons
                name="checkbox-marked-circle-outline"
                size={15}
                color={focused ? '#00983a' : '#7c7d7d'}
                style={{
                  marginLeft: '3%',
                }}
              />
              <Text>
                {'  '}Términos y condiciones {'             '}
              </Text>
              <AntDesign name="right" size={10} style={{marginLeft: 5}} />
            </Text>
          ),
        }}
      />
      <Drawer.Screen
        name="Eliminar cuenta"
        component={Eliminar}
        options={{
          drawerLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? '#00983a' : '#7c7d7d',
                marginLeft: '10%',
              }}>
              <MaterialIcons
                name="bag-personal-off-outline"
                size={15}
                color={focused ? '#00983a' : '#7c7d7d'}
                style={{
                  marginLeft: '3%',
                }}
              />
              <Text>
                {'  '}Eliminar cuenta{'                             '}
              </Text>
              <AntDesign name="right" size={10} style={{marginLeft: 5}} />
            </Text>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

// Navegador principal de la app
export default function AppNavigator() {
  return (
    <RootStack.Navigator
      screenOptions={{ animationEnabled: false, headerShown: false }}
      mode="modal">
      <RootStack.Screen name="Home" component={HomeScreen} />
      <RootStack.Screen name="InicioSesion" component={InicioSesion} />
      <RootStack.Screen name="Registro" component={Registro} />
      <RootStack.Screen name="HomeSesion" component={HomeSesion} />
      <RootStack.Screen name="AgriHome" component={AgricultoresHome} />
      <RootStack.Screen name="AbejasHome" component={AbejasHome} />
      <RootStack.Screen name="AcuaticosHome" component={AcuaticosHome} />
      <RootStack.Screen name="AvesHome" component={AvesHome} />
      <RootStack.Screen name="TranspHome" component={TranspHome} />
      <RootStack.Screen name="AmbientesSplash" component={AmbientesSplash} />
      <RootStack.Screen name="AgriSplash" component={AgricultoresSplash} />
      <RootStack.Screen name="AgriPop" component={AgricultoresPop} />
      <RootStack.Screen name="Temario" component={Temario} />
      <RootStack.Screen name="Ambientes" component={Ambientes} />
      <RootStack.Screen name="Cuestionario" component={Cuestionario} />
      <RootStack.Screen name="Oops" component={Oops} options={{ cardStyle: { backgroundColor: 'transparent' } }} />
      <RootStack.Screen name="Felicidades" component={Felicidades} options={{ cardStyle: { backgroundColor: 'transparent' } }} />
      <RootStack.Screen name="Respuestas" component={Respuestas} />
      <RootStack.Screen name="MyDrawer" component={MyDrawer} />
      <RootStack.Screen name="RespuestasCuestionario" component={RespuestasCuestionario} />
      <RootStack.Screen name="Perfil" component={Perfil} />
      <RootStack.Screen name="Privacidad" component={Privacidad} />
      <RootStack.Screen name="Popups" component={PopUps} 
        options={{
          presentation: 'transparentModal',
          headerShown: false,
          cardStyle: { backgroundColor: 'transparent' },
        }}
      />
    </RootStack.Navigator>
  );
} 