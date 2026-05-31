import React from 'react'
import { StyleSheet, Text } from 'react-native'

interface BodyProps {
    bodyText: string
    isMechanics?: boolean
}

const Body = ({bodyText, isMechanics = false}: BodyProps) => {
    return (
        <Text style={isMechanics ? styles.mechanics : styles.body}>
            {bodyText}
        </Text>
    )
}

const styles = StyleSheet.create({
    body: {
        fontSize: 20,
        color: 'black'
    },
    mechanics: {
        fontSize: 20,
        color: 'black',
        marginTop: 10,
        fontWeight: 'bold'
    }
})

export default Body
