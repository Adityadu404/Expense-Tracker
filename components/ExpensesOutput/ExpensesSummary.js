import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { GlobalStyles } from '../../constants/Styles'

export default function ExpensesSummary({expenses, period}) {

    const expenseSum = expenses.reduce((sum,expense)=>{
        return sum + expense.amount
    },0)
  return (
      <View style={styles.container}>
        <Text style={styles.period}>{period}</Text>
        <Text style={styles.sum}>Rs.{expenseSum.toFixed(2)}</Text>
      </View>
  )
}

const styles = StyleSheet.create({
    container:{
        padding:8,
        borderRadius:6,
        backgroundColor:GlobalStyles.colors.primary200,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:8
    },
    period:{
        fontSize:14,
        color:GlobalStyles.colors.primary700
    },
    sum:{
        fontSize:16,
        fontWeight:'bold',
        color:GlobalStyles.colors.primary800

    }
})