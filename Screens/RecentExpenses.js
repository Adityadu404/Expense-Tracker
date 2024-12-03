import React ,{useContext, useEffect, useState} from 'react'

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { ExpensesContext } from '../store/Expenses-context'
import { getDaysMinusDate } from '../util/Date'
import { fetchExpense } from '../util/http'
import LoadingOverlay from '../components/UI/LoadingOverlay'
import ErrorOverlay from '../components/UI/ErrorOverlay'

export default function RecentExpenses() {

  const expenseCtx = useContext(ExpensesContext)

  const [isFetching , setIsFetching ] = useState(true)
  const [error, setError] = useState()

  useEffect(()=> {
    async function getExpenses(){
      setIsFetching(true)
      try {
      const expense = await fetchExpense()
      expenseCtx.setExpense(expense)
      } catch (error) {
        setError('Unable to fetch expenses !')
      }
      setIsFetching(false)
    }
    getExpenses()
  },[])

  if(error && !isFetching){
    return <ErrorOverlay message={error} />
  }
  if (isFetching){
    return <LoadingOverlay/>
  }

  const recentExpenses = expenseCtx.expenses.filter((expense)=>{
    const today = new Date()
    const date7daysAgo = getDaysMinusDate(today,7)

    return (expense.date >= date7daysAgo) && (expense.date <= today)
  })
  return (
   <ExpensesOutput 
   expenses={recentExpenses} 
   expensesPeriod='Last 7 days'
   fallBackText='No expenses registered for the last 7 days'
   />
  )
}

