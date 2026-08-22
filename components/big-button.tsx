import React from 'react'
import {
    GestureResponderEvent,
    Pressable,
    StyleSheet,
    Text
} from 'react-native'

interface ButtonProps {
    onPress?: ((event: GestureResponderEvent) => void) | null | undefined
    title: string
    disabled?: boolean
}

const BigButton = ({ onPress, title, disabled = false }: ButtonProps) => {
    let buttonStyle = { ...styles.buttonContainer }
    if (disabled) {
        buttonStyle = { ...buttonStyle, ...styles.disabledButtonContainer }
    }
    return (
        <Pressable onPress={onPress} style={buttonStyle} disabled={disabled}>
            <Text style={styles.buttonText}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        elevation: 8,
        backgroundColor: '#2A3570',
        borderRadius: 10,
        padding: 30,
        margin: 5,
        justifyContent: 'center'
    },
    disabledButtonContainer: {
        backgroundColor: 'grey'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase'
    }
})

export default BigButton
