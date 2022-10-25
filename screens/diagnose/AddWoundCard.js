import BigButton from '../../components/BigButton';
import React from 'react';
import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';

function AddWoundCard() {
  const onTagDiscovered = tag => {
    console.log('Tag Discovered', tag);
    // this.setState({tag});

    let parsed = null;
    if (tag.ndefMessage && tag.ndefMessage.length > 0) {
      // ndefMessage is actually an array of NdefRecords,
      // and we can iterate through each NdefRecord, decode its payload
      // according to its TNF & type
      const ndefRecords = tag.ndefMessage;

      function decodeNdefRecord(record) {
        if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
          return ['text', Ndef.text.decodePayload(record.payload)];
        } else if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI)) {
          return ['uri', Ndef.uri.decodePayload(record.payload)];
        }

        return ['unknown', '---'];
      }

      parsed = ndefRecords.map(decodeNdefRecord);
    }

    // this.setState({parsed});
    console.log(JSON.stringify(parsed));
  };
  async function readNdef() {
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      onTagDiscovered(tag);
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }

  return <BigButton title="Add wound card" onPress={readNdef} />;
}

export default AddWoundCard;
