import React from 'react';
import {StyleSheet, Text} from 'react-native';

const Body = ({children, mechanics}) => {
  return (
    <Text style={mechanics ? styles.mechanics : styles.body}>{children}</Text>
  );
};

const styles = StyleSheet.create({
  body: {
    fontSize: 20,
    color: 'black',
  },
  mechanics: {
    fontSize: 20,
    color: 'black',
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default Body;
