import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CustomCheckbox = ({
  checked = false,
  onPress,
  disabled = false,
  size = 24,
  color = '#4CAF50',
  uncheckedColor = '#BDBDBD',
  borderColor,
  borderRadius = 4,
  style,
  containerStyle,
  text,
  textStyle,
  icon,
  checkedIcon,
  uncheckedIcon,
  center = false,
  title,
  textContainerStyle,
  ...props
}) => {
  const defaultCheckedIcon = (
    <MaterialIcons
      name="check"
      size={size * 0.6}
      color="white"
    />
  );

  const defaultUncheckedIcon = null;

  const defaultIcon = checked ? (checkedIcon || defaultCheckedIcon) : (uncheckedIcon || defaultUncheckedIcon);

  const checkboxStyle = {
    width: size,
    height: size,
    borderRadius: borderRadius,
    borderWidth: 2,
    borderColor: borderColor || (checked ? color : uncheckedColor),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: checked ? color : 'white',
    opacity: disabled ? 0.5 : 1,
  };

  const containerStyles = [
    styles.container,
    center && styles.centerContainer,
    containerStyle,
  ];

  const textStyles = [
    styles.text,
    textStyle,
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={containerStyles}
      {...props}
    >
      <View style={[checkboxStyle, style]}>
        {defaultIcon}
      </View>
      
      {(text || title) && (
        <View style={[styles.textContainer, textContainerStyle]}>
          <Text style={textStyles}>
            {text || title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  centerContainer: {
    justifyContent: 'center',
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  text: {
    fontSize: wp('4%'),
    color: '#333',
    fontFamily: 'Roboto-Regular',
  },
});

export default CustomCheckbox; 