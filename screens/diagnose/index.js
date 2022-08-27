import React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import BigButton from '../../components/BigButton';

const Diagnose = () => (
  <View style={styles.homeView}>
    <BigButton
      title="Diagnose wound"
      onPress={() => Alert.alert('Simple Button pressed')}
    />
  </View>
);

const styles = StyleSheet.create({
  homeView: {
    margin: 10,
  },
});

export default Diagnose;
