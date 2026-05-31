import { Wound } from '@/assets/wounds'
import Body from '@/components/body'
import Heading from '@/components/heading'
import Title from '@/components/title'
import { StyleSheet, View } from 'react-native'
import Subtitle from '../components/subtitle'

export default function DiagnosisView({ wound }: { wound: Wound }) {
    return (
        <View style={styles.diagnosis}>
            <Title titleText={wound.name} />
            <Subtitle subtitleText={wound.category} />
            <Heading headingText="Diagnosis" />
            <Body bodyText={wound.diagnosis} />
            {wound.mechanics && <Body isMechanics bodyText={wound.mechanics} />}
            <Heading headingText="Failed Surgery Attempt" />
            <Body bodyText={wound.failure} />
        </View>
    )
}

const styles = StyleSheet.create({
    diagnosis: {
        padding: 20
    }
})
