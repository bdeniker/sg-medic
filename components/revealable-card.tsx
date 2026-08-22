import { StyleSheet, Text, View } from 'react-native'

export interface RevealableCardInterface {
    title: string
    isComplication?: boolean
    revealed?: boolean
}

export default function RevealableCard({
    card
}: {
    card: RevealableCardInterface
}) {
    let viewStyles: Record<string, any> = [styles.card]
    if (card.revealed) {
        viewStyles.push(styles.revealedCard)
        if (card.isComplication) {
            viewStyles.push(styles.complication)
        }
    } else {
        viewStyles.push(styles.hiddenCard)
    }
    return (
        <View style={viewStyles}>
            <Text style={styles.cardText} selectable>
                {card.revealed ? card.title : '???'}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 14,
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 2,
        marginVertical: 2
    },
    hiddenCard: {
        borderWidth: 1,
        borderColor: 'silver'
    },
    revealedCard: {
        backgroundColor: 'silver'
    },
    complication: {
        borderWidth: 2,
        borderColor: 'red'
    },
    cardText: {
        fontSize: 20,
        minWidth: '95%',
        textAlign: 'center'
    }
})
