import { StyleSheet, View } from 'react-native'
import React, { useContext, useLayoutEffect, useState } from 'react'

import IconButton from '../components/UI/IconButton'
import { GlobalStyles } from '../constants/Styles'
import { ExpensesContext } from '../store/Expenses-context'
import ExpenseForm from '../components/ManageExpense/ExpenseForm'
import { deleteExpense, storeExpense, updateExpense } from '../util/http'
import LoadingOverlay from '../components/UI/LoadingOverlay'
import ErrorOverlay from '../components/UI/ErrorOverlay'
 function ManageExpenses({route, navigation}) {

  const [isSubmitting, setIsSubmitting ] = useState(false)
  const [error, setError] = useState()

  const expenseCtx = useContext(ExpensesContext)

  const editingExpenseId = route.params?.expenseId
  const isEditing = !!editingExpenseId

  const selectedExpense = expenseCtx.expenses.find((expense)=> expense.id ===editingExpenseId)
  
  useLayoutEffect(()=>{
    navigation.setOptions({
      title : isEditing ? 'Edit Expense' : 'Add Expense'
    })
  },[navigation,isEditing])

  async function deleteExpenseHandler(){
    setIsSubmitting(true)
    try {
        await deleteExpense(editingExpenseId)
        expenseCtx.deleteExpense(editingExpenseId)
        navigation.goBack()
    } catch (error) {
        setError('Unable to delete expense - Please try again later')
        setIsSubmitting(false)
    }
     
  }
  function cancelHandler(){
    navigation.goBack()
  }
  async function confirmHandler(expenseData){
    setIsSubmitting(true)
    try {
      if (isEditing){
        await updateExpense(editingExpenseId,expenseData)
        expenseCtx.updateExpense(editingExpenseId,expenseData)
      }
      else {
        const id = await storeExpense(expenseData)
        expenseCtx.addExpense({...expenseData, id :id})
      }
      navigation.goBack()
    } catch (error) {
       setError('Unable to save data - Please try again later')
       setIsSubmitting(false)
    }
    
  }

  if ( error && !isSubmitting){
    return <ErrorOverlay message={error} />
  }

  if (isSubmitting){
    return <LoadingOverlay/>
  }
  
  return (
    <View style={styles.container}>
      <ExpenseForm 
      onCancel={cancelHandler} 
      onSubmit={confirmHandler} 
      isEditing={isEditing}
      defaultValue = {selectedExpense}
      />
      { isEditing && 
      (<View style={styles.deleteContainer}>
        <IconButton 
        icon='trash' 
        size={36} 
        color={GlobalStyles.colors.error500} 
        onPress={deleteExpenseHandler}/>
        </View>)
      }
    </View>
  )
}
export default ManageExpenses

const styles = StyleSheet.create({
  container : {
    flex:1,
    padding:24,
    backgroundColor:GlobalStyles.colors.primary800
  },
  deleteContainer:{
    marginTop:8,
    paddingTop:6,
    borderTopWidth:2,
    borderTopColor:GlobalStyles.colors.primary200,
    alignItems:'center'
  }
})