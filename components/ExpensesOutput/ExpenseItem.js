import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../constants/Styles'
import { getFormatedDate } from '../../util/Date'
import { useNavigation } from '@react-navigation/native'

export default function({id,description, date, amount}) {

  const navigation = useNavigation()

  function expensePressHandler(){
      navigation.navigate('ManageExpense' ,{
        expenseId : id
      })
  }

  return (
    <Pressable 
    onPress={expensePressHandler} 
    style={({pressed})=> pressed && styles.pressed}>
    <View style={styles.expenseItem}>
      <View>
        <Text style={[styles.textBase,styles.description]}>{description}</Text>
        <Text style={styles.textBase}>{getFormatedDate(date)}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.amount}>Rs. {amount.toFixed(2)}</Text>
      </View>
    </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    expenseItem:{
        padding:12,
        marginVertical:8,
        backgroundColor:GlobalStyles.colors.primary500,
        borderRadius:6,
        flexDirection:'row',
        justifyContent:'space-between',
        elevation:5,
        shadowColor:GlobalStyles.colors.gray500,
        shadowOffset:{width:1,height:1},
        shadowOpacity:0.5,
        shadowRadius:4
    },
    textBase:{
        color:GlobalStyles.colors.primary50
    },
    description:{
        fontSize:16,
        fontWeight:'bold',
        marginBottom:4
    },
    amountContainer:{
        paddingVertical:4,
        paddingHorizontal:8,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:4,
        minWidth:80
    },
    amount:{
        color:GlobalStyles.colors.primary700
    },
    pressed:{
      opacity:0.75
  }
})