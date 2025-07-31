import React from 'react';
import { TouchableOpacity, View } from 'react-native';

const CircularCheckbox = ({ checked, onPress, size = 18, color = '#4CAF50' }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 2,
        borderColor: checked ? color : '#BDBDBD',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
    >
      {checked && (
        <View
          style={{
            width: size * 0.6,
            height: size * 0.6,
            borderRadius: (size * 0.6) / 2,
            backgroundColor: color,
          }}
        />
      )}
    </View>
  </TouchableOpacity>
);

export default CircularCheckbox;