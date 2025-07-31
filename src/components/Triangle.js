import { View } from "react-native";

const Triangle = ({width, height, color, direction = 'up', style}) => {
    let borderStyles = {};
    switch (direction) {
      case 'up':
        borderStyles = {
          borderLeftWidth: width / 2,
          borderRightWidth: width / 2,
          borderBottomWidth: height,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: color,
          borderTopWidth: 0,
          borderTopColor: 'transparent',
        };
        break;
      case 'down':
        borderStyles = {
          borderLeftWidth: width / 2,
          borderRightWidth: width / 2,
          borderTopWidth: height,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderTopColor: color,
          borderBottomWidth: 0,
          borderBottomColor: 'transparent',
        };
        break;
      case 'left':
        borderStyles = {
          borderTopWidth: height / 2,
          borderBottomWidth: height / 2,
          borderRightWidth: width,
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
          borderRightColor: color,
          borderLeftWidth: 0,
          borderLeftColor: 'transparent',
        };
        break;
      case 'right':
        borderStyles = {
          borderTopWidth: height / 2,
          borderBottomWidth: height / 2,
          borderLeftWidth: width,
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
          borderLeftColor: color,
          borderRightWidth: 0,
          borderRightColor: 'transparent',
        };
        break;
      default:
        borderStyles = {};
    }
    return <View style={[{width: 0, height: 0, backgroundColor: 'transparent', ...borderStyles}, style]} />;
};

export default Triangle;