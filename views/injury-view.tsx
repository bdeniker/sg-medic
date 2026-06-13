import { Wound } from '@/assets/wounds'
import Body from '@/components/body'
import Heading from '@/components/heading'
import Subtitle from '@/components/subtitle'
import Title from '@/components/title'
import { StyleSheet, View } from 'react-native'

export default function InjuryView({ wound }: { wound: Wound }) {
    return (
        <View style={styles.injury}>
            <Title titleText={`${wound.name} ${wound.isWhite ? '⚪' : '⚫'}`} />
            <Subtitle subtitleText={wound.category} />
            <Heading headingText="Symptoms" />
            <Body bodyText={wound.symptoms} />
            <Heading headingText="Until Treated" />
            <Body bodyText={wound.untilTreated} />
        </View>
    )
}

const styles = StyleSheet.create({
    injury: {
        padding: 20
    }
})
