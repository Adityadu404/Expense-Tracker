import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../constants/Styles'

export default function ({label, style,invalid, textInputConfig}) {
    const inputStyles = [styles.input]

if (textInputConfig && textInputConfig.multiline){
    inputStyles.push (styles.inputMultiline)
}
if (invalid){
    inputStyles.push(styles.invalidInput)
}
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label , invalid && styles.invalidLabel]}>{label}</Text>
      <TextInput style={inputStyles}{...textInputConfig}/>
    </View>
  )
}

const styles = StyleSheet.create({
    inputContainer : {
        marginHorizontal:4,
        marginVertical:16,
    },
    label:{
        fontSize:14,
        color: GlobalStyles.colors.primary100,
        marginBottom:4,
    },
    input :{
        fontSize:18,
        color: GlobalStyles.colors.primary700,
        backgroundColor: GlobalStyles.colors.primary100,
        padding:6,
        borderRadius:6
    },
    inputMultiline:{
        minHeight:100,
        textAlignVertical:'top'
    },
    invalidLabel : {
        color: GlobalStyles.colors.error500
    },
    invalidInput :{
        backgroundColor: GlobalStyles.colors.error50
    }
})