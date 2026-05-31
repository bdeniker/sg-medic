import React from 'react'
import { StyleSheet, Text } from 'react-native'

interface SubtitleProps {
    subtitleText: string
}

const Subtitle = ({subtitleText}: SubtitleProps) => {
    return <Text style={styles.heading}>{subtitleText}</Text>
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center'
    }
})

export default Subtitle
