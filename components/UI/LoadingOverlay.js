import { ActivityIndicator, StyleSheet,  View } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../constants/Styles'

export default function LoadingOverlay() {
  return (
    <View style={styles.container}>
        <ActivityIndicator size='large' color={GlobalStyles.colors.primary800}/>
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
    }
})