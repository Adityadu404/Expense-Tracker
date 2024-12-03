import { StyleSheet, View , Text } from 'react-native'
import React from 'react'

import ExpensesSummary from './ExpensesSummary'
import ExpensesList from './ExpensesList'
import { GlobalStyles } from '../../constants/Styles'

export default function ExpensesOutput({expenses, expensesPeriod, fallBackText}) {

    let content = <Text style={styles.text}>{fallBackText}</Text>
    
    if (expenses.length > 0)
    {
        content =  <ExpensesList expenses={expenses}/>
    }
    
  return (
    <View style={styles.container}>
     <ExpensesSummary expenses={expenses} period={expensesPeriod}/>
     {content}
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:24,
        paddingTop:24,
        paddingBottom:0,
        backgroundColor:GlobalStyles.colors.primary800,
    },
    text :{
        fontSize:18,
        color:'white',
        alignItems:'center',
        marginTop:50,
        // justifyContent:'center'
    }
})