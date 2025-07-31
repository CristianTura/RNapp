import React from 'react';
import { Image, TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function CustomAvatar({
  size = 50,
  source,
  onPress,
  activeOpacity = 0.7,
  containerStyle = {},
  imageStyle = {},
  borderColor = '#FFA500',
  borderWidth = 2,
  disabled = false,
  icon, // { name: string, size: number, color?: string, family?: string }
  title, // string o número
  titleStyle = {},
  overlayContainerStyle = {},
}) {
  // Decide qué mostrar: icon > imagen > title
  let content = null;
  if (icon) {
    content = (
      <View style={[
        styles.overlay,
        { width: size, height: size, borderRadius: size / 2 },
        overlayContainerStyle,
        { justifyContent: 'center', alignItems: 'center' },
      ]}>
        <MaterialIcons
          name={icon.name}
          size={icon.size || size * 0.6}
          color={icon.color || '#fff'}
        />
      </View>
    );
  } else if (source) {
    content = (
      <Image
        source={source}
        style={[
          styles.image,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
          imageStyle,
        ]}
        resizeMode="cover"
      />
    );
  } else if (title) {
    content = (
      <View style={[
        styles.overlay,
        { width: size, height: size, borderRadius: size / 2 },
        overlayContainerStyle,
        { justifyContent: 'center', alignItems: 'center' },
      ]}>
        <Text style={[{ color: '#fff', fontSize: size * 0.4 }, titleStyle]}>{title}</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={activeOpacity}
      disabled={disabled}
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderColor,
          borderWidth
        },
        containerStyle,
      ]}
    >
      {content}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#a9a9a9',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {},
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});