import React from 'react'
import { StyleSheet, Text } from 'react-native'

interface HeadingProps {
    headingText: string
}

const Heading = ({headingText}: HeadingProps) => {
    return <Text style={styles.heading}>{headingText}</Text>
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 10
    }
})

export default Heading
