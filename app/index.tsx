import type { Wound } from '@/assets/wounds'
import BigButton from '@/components/big-button'
import MidButton from '@/components/mid-button'
import getWound from '@/util/getWound'
import getWoundCardId from '@/util/nfc'
import CardProblemView from '@/views/card-problem-view'
import DiagnosisView from '@/views/diagnosis-view'
import InjuryView from '@/views/injury-view'
import { Stack } from 'expo-router'
import { useState } from 'react'
import {
    ActivityIndicator,
    Modal,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native'
import Collapsible from 'react-native-collapsible'
import NfcManager from 'react-native-nfc-manager'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

export default function Index() {
    const [wound, setWound] = useState<Wound | null>(null)
    const [nfcScanning, setNFCScanning] = useState(false)
    const [showDiagnosis, setShowDiagnosis] = useState(false)

    return (
        <View style={styles.topLevel}>
            <Stack.Screen options={{ headerShown: false }} />
            <Modal
                animationType="slide"
                transparent={true}
                visible={nfcScanning}
                onRequestClose={() => {
                    NfcManager.cancelTechnologyRequest()
                    setNFCScanning(false)
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <ActivityIndicator />
                        <Text>Scan an NFC tag</Text>
                    </View>
                </View>
            </Modal>
            <ScrollView contentContainerStyle={styles.scroll}>
                <BigButton
                    title="Scan wound card"
                    onPress={() => {
                        setNFCScanning(true)
                        getWoundCardId().then(id => {
                            if (id != 0) {
                                setWound(getWound(id))
                            }
                            setNFCScanning(false)
                        })
                    }}
                />

                {wound ? (
                    <>
                        <InjuryView wound={wound} />
                        <MidButton
                            title={`${showDiagnosis ? 'Hide' : 'Show'} Diagnosis`}
                            onPress={() => {
                                setShowDiagnosis(currentState => !currentState)
                            }}>
                            {showDiagnosis ? (
                                <MaterialIcons
                                    name="unfold-less"
                                    size={24}
                                    color="white"
                                />
                            ) : (
                                <MaterialIcons
                                    name="unfold-more"
                                    size={24}
                                    color="white"
                                />
                            )}
                        </MidButton>
                        <Collapsible collapsed={!showDiagnosis}>
                            <DiagnosisView wound={wound} />
                        </Collapsible>
                    </>
                ) : null}
                <CardProblemView wound={wound} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    topLevel: {
        backgroundColor: 'grey',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight
    },
    scroll: {
        alignItems: 'center',
        minWidth: '90%'
    },
    centeredView: {
        flex: 1,
        marginTop: 22
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
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }
})
