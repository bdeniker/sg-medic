import React from 'react';
import {StyleSheet, Pressable, Text} from 'react-native';

const BigButton = ({onPress, title, disabled}) => (
  <Pressable
    onPress={onPress}
    style={styles.appButtonContainer}
    disabled={disabled}>
    <Text style={styles.appButtonText}>{title}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 30,
    paddingHorizontal: 12,
    margin: 5,
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
