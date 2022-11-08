import React from 'react';
import {StyleSheet, Text} from 'react-native';

const Title = props => {
  return <Text style={styles.heading}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
});

export default Title;
