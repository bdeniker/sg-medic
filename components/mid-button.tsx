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
    children: React.ReactNode
    disabled?: boolean
}

const MidButton = ({
    onPress,
    title,
    children,
    disabled = false
}: ButtonProps) => {
    let buttonStyle = { ...styles.buttonContainer }
    if (disabled) {
        buttonStyle = { ...buttonStyle, ...styles.disabledButtonContainer }
    }
    return (
        <Pressable onPress={onPress} style={buttonStyle} disabled={disabled}>
            {children}
            <Text style={styles.buttonText}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        elevation: 8,
        backgroundColor: '#2A3570',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 12,
        margin: 5,
        justifyContent: 'center',
        flexDirection: 'row',
        width: '70%'
    },
    disabledButtonContainer: {
        backgroundColor: 'grey'
    },
    buttonText: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase'
    }
})

export default MidButton
