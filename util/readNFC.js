import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';

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
  return parsed;
};

export default async function getWoundCardID() {
  try {
    // register for the NFC tag with NDEF in it
    await NfcManager.requestTechnology(NfcTech.Ndef);
    const tag = await NfcManager.getTag();
    const nfcEntries = onTagDiscovered(tag);

    const woundCardID = Number(nfcEntries[0][1]);
    return woundCardID;
  } catch (ex) {
    console.warn('Failed to get NFC tag', ex);
  } finally {
    // stop the nfc scanning
    NfcManager.cancelTechnologyRequest();
  }
}
