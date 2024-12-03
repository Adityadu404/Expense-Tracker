import React, { useContext ,useState, useEffect} from 'react'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { ExpensesContext } from '../store/Expenses-context'
import { fetchExpense } from '../util/http'
import LoadingOverlay from '../components/UI/LoadingOverlay'


export default function AllExpenses() {

  const expenseCtx = useContext(ExpensesContext)
  const [isFetching , setIsFetching ] = useState(true)

  useEffect(()=> {
    async function getExpenses(){
      setIsFetching(true)
      const expense = await fetchExpense()
      setIsFetching(false)
      expenseCtx.setExpense(expense)
    }
    getExpenses()
  },[])

  if (isFetching){
    return <LoadingOverlay/>
  }
  return (
   <ExpensesOutput 
   expenses={expenseCtx.expenses} 
   expensesPeriod='All time'
   fallBackText='No registered expenses found !!'
   />
  )
}

