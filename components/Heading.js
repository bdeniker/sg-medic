import React from 'react';
import {StyleSheet, Text} from 'react-native';

const Heading = props => {
  return <Text style={styles.heading}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
  },
});

export default Heading;
