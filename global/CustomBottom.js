import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React from 'react'

export default function CustomBottom() {
  return (
    <View>
      <TouchableHighlight style={styles.bottom}/>
    </View>
  )
}

const styles = StyleSheet.create({

bottom: {
    width: 30,
    borderColor: "#000",
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: '#2874A6'
}
})