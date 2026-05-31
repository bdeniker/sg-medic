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
            <Text style={styles.cardText}>
                {card.revealed ? card.title : '???'}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    viewStyles: {
        width: '100%'
    },
    card: {
        borderRadius: 14,
        width: '90%',
        alignItems: 'center',
        paddingVertical: 10,
        marginVertical: 3
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
        minWidth: '50%',
        textAlign: 'center'
    }
})
