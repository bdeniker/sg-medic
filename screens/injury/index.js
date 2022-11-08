import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import BigButton from '../../components/BigButton';
import getWoundCardID from '../../util/readNFC';
import InjuryDetails from './injuryDetails';
import injuryForWound from '../../util/injuryForWound';

const Injury = () => {
  const [wound, setWound] = useState(null);
  return (
    <View style={styles.homeView}>
      <BigButton
        title="Scan wound card"
        onPress={() =>
          getWoundCardID().then(id => {
            console.log(`Scanned wound card ${id}`);
            setWound(injuryForWound(id));
          })
        }
      />
      <InjuryDetails wound={wound} />
    </View>
  );
};

const styles = StyleSheet.create({
  homeView: {
    margin: 10,
  },
});

export default Injury;
