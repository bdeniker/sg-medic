import NfcManager, { Ndef, NfcTech } from 'react-native-nfc-manager'

export default async function getWoundCardId(): Promise<number> {
    NfcManager.start()
    console.log('Scan NFC token now')
    try {
        // register for the NFC tag with NDEF in it
        await NfcManager.requestTechnology(NfcTech.Ndef)
        // the resolved tag object will contain `ndefMessage` property
        const tag = await NfcManager.getTag()
        const woundCardId = Ndef.text.decodePayload(
            tag?.ndefMessage[0]
                .payload as unknown as Uint8Array<ArrayBufferLike>
        )
        return Number(woundCardId)
    } catch (ex) {
        console.error(ex)
    } finally {
        // stop the nfc scanning
        NfcManager.cancelTechnologyRequest()
    }
    return 0
}
