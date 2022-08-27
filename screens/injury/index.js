import React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import BigButton from '../../components/BigButton';

const Injury = () => (
  <View style={styles.homeView}>
    <BigButton
      title="Scan wound card"
      onPress={() => Alert.alert('To do: NFC stuff <_<')}
    />
  </View>
);

const styles = StyleSheet.create({
  homeView: {
    margin: 10,
  },
});

export default Injury;
