import React, {Component} from 'react';
import {ImageBackground, Image, View, StyleSheet} from 'react-native';

export default class SplashScreen extends Component {
  render() {
    return (
      <View>
        <ImageBackground
          style={styles.background}
          source={require('../../assets/fondoSplash.png')}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('../../assets/logo.png')}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    alignItems: 'center',
  },

  logo: {
    flex: 1,
    resizeMode: 'contain',

  },

  logoContainer: {
    marginTop:'55%',
    height: '35%',
  },
});
