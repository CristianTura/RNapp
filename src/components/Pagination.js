import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

const Pagination = ({
  dotsLength = 0,
  activeDotIndex = 0,
  dotStyle = {},
  inactiveDotOpacity = 0.4,
  inactiveDotScale = 0.6,
  tappableDots = false,
  onPressDot = () => {},
}) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: dotsLength }).map((_, i) => {
        const isActive = i === activeDotIndex;
        const style = [
          styles.dot,
          dotStyle,
          !isActive && {
            opacity: inactiveDotOpacity,
            transform: [{ scale: inactiveDotScale }],
          },
        ];
        if (tappableDots) {
          return (
            <TouchableOpacity
              key={i}
              style={style}
              onPress={() => onPressDot(i)}
              activeOpacity={0.7}
            />
          );
        }
        return <View key={i} style={style} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0,0,0,0.75)',
    marginHorizontal: 4,
  },
});

export default Pagination; 