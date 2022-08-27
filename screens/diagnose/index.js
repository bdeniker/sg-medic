import React, {useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';
import BigButton from '../../components/BigButton';

function Diagnose() {
  const [surgeries, setSurgeries] = useState(0);
  return (
    <View style={styles.homeView}>
      <Text>Previous surgeries: {surgeries}</Text>
      <Slider
        value={surgeries}
        maximumValue={10}
        step={1}
        onValueChange={value => setSurgeries(value)}
      />
      <BigButton
        title="Start X card problem"
        onPress={() => Alert.alert('To do: actual function 🤷')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  homeView: {
    margin: 10,
  },
});

export default Diagnose;
