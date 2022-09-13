import React from 'react';
import {StyleSheet, View} from 'react-native';

function Row(props) {
  return <View style={styles.row}>{props.children}</View>;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});

export default Row;
