import BigButton from '@/components/big-button'
import RevealableCard, {
    RevealableCardInterface
} from '@/components/revealable-card'
import { Stack, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ProblemView() {
    const { cards } = useLocalSearchParams()

    const [revealableCards, setRevealableCards] = useState<
        RevealableCardInterface[]
    >(
        JSON.parse(cards as string).map(
            (card: { title: string; isComplication?: boolean }) => ({
                ...card,
                revealed: false
            })
        )
    )

    const lastCardRevealed = () =>
        revealableCards[revealableCards.length - 1] !== undefined &&
        revealableCards[revealableCards.length - 1].revealed

    return (
        <SafeAreaView edges={['bottom']} style={styles.topLevel}>
            <View style={styles.problem}>
                <Stack.Screen
                    options={{
                        headerTitle: 'Card Problem'
                    }}
                />
                <FlatList
                    data={revealableCards}
                    renderItem={({ item }) => <RevealableCard card={item} />}
                    contentContainerStyle={styles.cardsContainer}
                    style={styles.cards}
                />
                <BigButton
                    title={
                        lastCardRevealed()
                            ? 'Problem Completed'
                            : 'Reveal next card'
                    }
                    disabled={lastCardRevealed()}
                    onPress={() => {
                        setRevealableCards(
                            (prevState: RevealableCardInterface[]) => {
                                let nextState = [...prevState]
                                nextState.some(card => {
                                    if (!card.revealed) {
                                        card.revealed = true
                                        return true
                                    }
                                    return false
                                })
                                return nextState
                            }
                        )
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    topLevel: {
        backgroundColor: 'grey',
        flex: 1
    },
    problem: {
        flex: 1,
        margin: '5%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 30
    },
    cards: {
        width: '100%'
    },
    cardsContainer: {
        justifyContent: 'center'
    }
})
