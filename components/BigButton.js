import React from 'react';
import {StyleSheet, Pressable, Text} from 'react-native';

const BigButton = ({onPress, title, disabled}) => {
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
    backgroundColor: '#2A3570',
    borderRadius: 10,
    paddingVertical: 30,
    paddingHorizontal: 12,
    margin: 5,
  },
  disabledAppButtonContainer: {
    backgroundColor: '#ddd',
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});

export default BigButton;
