import { StyleSheet , Text , View } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../constants/Styles'

export default function ErrorOverlay({message, onConfirm}) {
  return (
    <View style={styles.container}>
        <Text style={[styles.text,styles.title]}>An Error occured !!</Text>
        <Text style={styles.text}>{message}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    container :{
        flex:1, 
        justifyContent:'center',
        alignItems:'center',
        padding:24,
        color:GlobalStyles.colors.primary800
    },
    text:{
        textAlign:'center',
        color:'white',
        marginBottom:8
    },
    title:{
        fontSize:20,
        fontWeight:'bold'
    },
})