import complicationJSON from '@/assets/complications.json'
import problemJSON from '@/assets/problems.json'
import { Wound } from '@/assets/wounds'
import BigButton from '@/components/big-button'
import Slider from '@react-native-community/slider'
import { Link } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { MultiSelect } from 'react-native-element-dropdown'

interface ProblemOrComplication {
    title: string
    isComplication: boolean
}

const pickRandomComplication = () =>
    complicationJSON[Math.floor(Math.random() * complicationJSON.length)]

function shuffle(array: ProblemOrComplication[]) {
    let currentIndex = array.length

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        // And swap it with the current element.
        ;[array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex]
        ]
    }
}

export default function CardProblemView({ wound }: { wound: Wound | null }) {
    const [problemNames] = useState(
        problemJSON.map(p => ({ label: p, value: p }))
    )
    const [complicationNames] = useState([
        { label: 'Random complication 1', value: 'random-1' },
        { label: 'Random complication 2', value: 'random-2' },
        { label: 'Random complication 3', value: 'random-3' },
        { label: 'Random complication 4', value: 'random-4' },
        { label: 'Random complication 5', value: 'random-5' },
        ...complicationJSON.map(c => ({ label: c, value: c }))
    ])

    const [problems, setProblems] = useState<string[]>(wound?.cards ?? [])
    const [complications, setComplications] = useState<string[]>([])
    const [surgeries, setSurgeries] = useState(0)
    const [cardCount, setCardCount] = useState(0)

    useEffect(() => setProblems(wound?.cards ?? []), [wound])

    useEffect(() => {
        setCardCount(
            problems.length +
                complications.length +
                Math.floor((surgeries * 2) / 3)
        )
    }, [problems, complications, surgeries])

    const pickCardsForProblem = () => {
        let problemCards = complications.map(complication => {
            if (complication.includes('random')) {
                return {
                    title: pickRandomComplication(),
                    isComplication: true
                }
            }
            return { title: complication, isComplication: true }
        })
        problemCards = problemCards.concat(
            problems.map(problem => ({ title: problem, isComplication: false }))
        )
        // add random complications for the number of surgeries
        if (surgeries >= 1) {
            problemCards.push({
                title: pickRandomComplication(),
                isComplication: true
            })
        }
        if (surgeries >= 3) {
            problemCards.push({
                title: pickRandomComplication(),
                isComplication: true
            })
        }
        if (surgeries >= 4) {
            problemCards.push({
                title: pickRandomComplication(),
                isComplication: true
            })
        }
        if (surgeries >= 6) {
            problemCards.push({
                title: pickRandomComplication(),
                isComplication: true
            })
        }
        shuffle(problemCards)

        return JSON.stringify(problemCards.slice(0, cardCount))
    }

    return (
        <View style={styles.problem}>
            <MultiSelect
                style={styles.select}
                data={problemNames}
                mode={'modal'}
                labelField="label"
                valueField="value"
                placeholder="Add a problem"
                value={problems}
                search
                searchPlaceholder="Search..."
                onChange={item => {
                    setProblems(item)
                }}
                renderItem={item => {
                    return <Text>{item.label}</Text>
                }}
                renderSelectedItem={(item, unSelect) => (
                    <TouchableOpacity
                        style={styles.selectedStyle}
                        onPress={() => unSelect && unSelect(item)}>
                        <Text style={styles.textSelectedStyle}>
                            {item.label}
                        </Text>
                        <Text style={styles.binStyle}>🗑️</Text>
                    </TouchableOpacity>
                )}
            />
            <MultiSelect
                style={styles.select}
                data={complicationNames}
                mode={'modal'}
                labelField="label"
                valueField="value"
                placeholder="Add a complication"
                value={complications}
                onChange={item => {
                    setComplications(item)
                }}
                renderItem={item => {
                    return <Text>{item.label}</Text>
                }}
                renderSelectedItem={(item, unSelect) => (
                    <TouchableOpacity
                        style={styles.selectedStyle}
                        onPress={() => unSelect && unSelect(item)}>
                        <Text style={styles.textSelectedStyle}>
                            {item.label}
                        </Text>
                        <Text style={styles.binStyle}>🗑️</Text>
                    </TouchableOpacity>
                )}
            />
            <Text style={styles.pastSurgeries}>Past surgeries:</Text>
            <Slider
                style={styles.slider}
                value={surgeries}
                minimumValue={0}
                maximumValue={7}
                step={1}
                renderStepNumber={true}
                thumbSize={10}
                onValueChange={value => {
                    setSurgeries(value)
                }}
            />
            {surgeries && surgeries >= 7 ? (
                <Text style={styles.warning}>
                    ⚠️WARNING⚠️ Any Failed Surgery Attempt will result in you
                    becoming Terminal
                </Text>
            ) : null}
            <Link
                push
                asChild
                href={{
                    pathname: '/problem',
                    params: { cards: pickCardsForProblem() }
                }}>
                <BigButton
                    title={`Start ${cardCount} card problem`}
                    disabled={cardCount === 0}
                />
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    problem: {
        width: '100%',
        alignItems: 'center',
        padding: 10
    },
    select: {
        width: '90%',
        height: 50,
        backgroundColor: 'silver',
        borderRadius: 12,
        padding: 12,
        marginVertical: 5,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2
    },
    textSelectedStyle: {
        fontSize: 16,
        paddingVertical: 5,
        paddingLeft: 7,
        margin: 0,
        flexBasis: '80%'
    },
    binStyle: {
        fontSize: 23,
        paddingRight: 3,
        margin: 0
    },
    selectedStyle: {
        flexDirection: 'row',
        flexBasis: 300,
        borderRadius: 14,
        backgroundColor: 'silver',
        shadowColor: 'black',
        margin: 3,
        marginHorizontal: 6,
        paddingHorizontal: 6,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.4,
        shadowRadius: 2,

        elevation: 2
    },
    slider: {
        marginTop: 10,
        marginBottom: 20,
        width: '90%'
    },
    pastSurgeries: {
        marginHorizontal: 20,
        width: '90%',
        fontSize: 20
    },
    warning: {
        fontSize: 25,
        fontWeight: 'bold'
    }
})
