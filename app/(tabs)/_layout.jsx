import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DrawerActions } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleIcons from 'react-native-vector-icons/SimpleLineIcons';

// Importar tus componentes de pantalla
import { NovedadesNav, PerfilNav } from '../../navigation/AppNavigator';
import Ambientes from '../../src/screens/Ambientes';
import Mas from '../../src/screens/Mas';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
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
          tabPress: () => {
            navigation.dispatch(DrawerActions.openDrawer());
          },
        })}
      />
    </Tab.Navigator>
  );
}
