import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const FlatButton = ({ text, onPress}) => {
  return (
    <TouchableOpacity >
      <View style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{ text }</Text>
      </View>
    </TouchableOpacity>
  )
}

export default FlatButton

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        marginVertical: 10,
        paddingVertical: 20,
        paddingHorizontal: 155,
        backgroundColor: "#EFC81A"
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center'
    }
})