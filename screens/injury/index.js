import React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import BigButton from '../../components/BigButton';
import getWoundCardID from '../../util/readNFC';

const Injury = () => (
  <View style={styles.homeView}>
    <BigButton
      title="Scan wound card"
      onPress={() =>
        getWoundCardID().then(id =>
          Alert.alert(`You have the symptoms of wound card #${id}`),
        )
      }
    />
  </View>
);

const styles = StyleSheet.create({
  homeView: {
    margin: 10,
  },
});

export default Injury;
