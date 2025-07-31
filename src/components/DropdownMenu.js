import React, { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Menu, Button } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const DropdownMenu = ({
  options = [],
  value = '',
  onSelect = () => {},
  placeholder = 'Selecciona una opción',
  style = {},
  buttonStyle = {},
  menuStyle = {},
  icon = <AntDesign name="caretdown" size={18} color="#bac5b9" />,
}) => {
  const [visible, setVisible] = useState(false);
  const buttonRef = useRef(null);

  return (
    <View style={[styles.container, style]}>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <View style={styles.row}>
            <Button
              ref={buttonRef}
              onPress={() => setVisible(true)}
              style={[styles.button, buttonStyle]}
              contentStyle={{ justifyContent: 'flex-start' }}
              labelStyle={{ color: 'black', textAlign: 'left', width: '100%' }}
            >
              {value || placeholder}
            </Button>
            <AntDesign
              name="caretdown"
              size={18}
              color="#bac5b9"
              style={styles.icon}
              onPress={() => setVisible(true)}
            />
          </View>
        }
        style={[styles.menu, menuStyle]}
      >
        {options.map((option, idx) => (
          <Menu.Item
            key={idx}
            onPress={() => {
              onSelect(option);
              setVisible(false);
            }}
            title={option}
            titleStyle={{ color: 'black' }}
          />
        ))}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('1%'),
    borderColor: '#f0f0f0',
    backgroundColor: '#e5e5e5',
    borderRadius: 40,
    borderWidth: 1,
    fontFamily: 'Oxygen-Regular',
    fontSize: wp('5%'),
    paddingLeft: wp('3%'),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    flex: 1,
    justifyContent: 'flex-start',
    minWidth: '90%',
    backgroundColor: 'white',
  },
  icon: {
    marginLeft: -24,
    padding: 8,
    zIndex: 1,
  },
  menu: {
    width: '75%',
    minWidth: '75%',
    maxHeight: 250,
    padding: 0,
    marginTop: 30
  },
});

export default DropdownMenu; 