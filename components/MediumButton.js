import React from 'react';
import {StyleSheet, Pressable, Text} from 'react-native';

const MediumButton = ({onPress, title, disabled}) => {
  let buttonStyle = {...styles.appButtonContainer};
  if (disabled) {
    buttonStyle = {...buttonStyle, ...styles.disabledAppButtonContainer};
  }
  return (
    <Pressable onPress={onPress} style={buttonStyle} disabled={disabled}>
      <Text style={styles.appButtonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#9A9A9A',
    borderRadius: 10,
    padding: 12,
    margin: 5,
  },
  disabledAppButtonContainer: {
    backgroundColor: '#ddd',
  },
  appButtonText: {
    fontSize: 16,
    color: '#fff',
    alignSelf: 'center',
  },
});

export default MediumButton;
