import React from 'react'
import { StyleSheet, Text } from 'react-native'

interface TitleProps {
    titleText: string
}
const Title = ({titleText}: TitleProps) => {
    return <Text style={styles.heading}>{titleText}</Text>
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center'
    }
})

export default Title
