import { FlatList} from 'react-native'
import React from 'react'
import ExpenseItem from './ExpenseItem'

function renderExpenseHandler(itemData){
  return <ExpenseItem {...itemData.item}/>
}

export default function ExpensesList({expenses}) {
   
  return (
   <FlatList 
   data={expenses}
   renderItem={renderExpenseHandler}
   keyExtractor={(item)=>item.id}
   />
  )
}
