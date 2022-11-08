import React, {useState} from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import NfcManager from 'react-native-nfc-manager';
import BigButton from '../../components/BigButton';
import Body from '../../components/Body';
import injuryForWound from '../../util/injuryForWound';
import getWoundCardID from '../../util/readNFC';
import InjuryDetails from './injuryDetails';

const Injury = () => {
  const [wound, setWound] = useState(null);
  const [nfcScanning, setNFCScanning] = useState(false);

  return (
    <View style={styles.homeView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={nfcScanning}
        onRequestClose={() => {
          NfcManager.cancelTechnologyRequest();
          setNFCScanning(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ActivityIndicator />
            <Body>Scan an NFC tag</Body>
          </View>
        </View>
      </Modal>
      <BigButton
        title="Scan wound card"
        disabled={nfcScanning}
        onPress={() => {
          setNFCScanning(true);
          getWoundCardID().then(id => {
            console.log(`Scanned wound card ${id}`);
            setWound(injuryForWound(id));
            setNFCScanning(false);
          });
        }}
      />
      <InjuryDetails wound={wound} />
    </View>
  );
};

const styles = StyleSheet.create({
  homeView: {
    margin: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Injury;
