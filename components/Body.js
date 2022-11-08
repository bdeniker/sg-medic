import React from 'react';
import {StyleSheet, Text} from 'react-native';

const Body = props => {
  return <Text style={styles.body}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  body: {
    fontSize: 20,
    color: 'black',
  },
});

export default Body;
