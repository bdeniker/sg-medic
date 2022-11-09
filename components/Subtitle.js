import React from 'react';
import {StyleSheet, Text} from 'react-native';

const Subtitle = props => {
  return <Text style={styles.heading}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
});

export default Subtitle;
