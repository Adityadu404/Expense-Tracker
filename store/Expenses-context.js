import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
    expenses:[],
    addExpense :({description, amount, date})=>{},
    setExpense :(expenses)=>{},
    deleteExpense :(id)=>{},
    updateExpense :(id,{description, amount, date})=>{},
})


function expenseReducer(state,action){
        switch (action.type){
            case 'ADD' :
                const id = new Date().toString()+ Math.random().toString()
                return [ {...action.payload ,id : id},...state]
            case 'SET' : 
                return action.payload.reverse()
            case 'DELETE':
                return state.filter((expense)=>expense.id !== action.payload)
            case 'UPDATE':
                const updatableExpenseIndex= state.findIndex((expense)=> expense.id === action.payload.id)
                const updatableExpense = state[updatableExpenseIndex]
                const updatedItem = { ...updatableExpense, ...action.payload.data}
                const updatedExpense =[...state]
                updatedExpense[updatableExpenseIndex] = updatedItem
                return updatedExpense
            default :    return state   
        }
    }
function ExpenseContextProvider ({children}){

    const [expensesState , dispatch] = useReducer(expenseReducer , [])

    function addExpense(expenseData){
        dispatch({type:'ADD', payload : expenseData})
    }

    function setExpense (expenses){
        dispatch({type :'SET', payload: expenses})
    }

    function deleteExpense (id){
        dispatch({type:'DELETE', payload:id})
    }
    function updateExpense (id, expenseData){
        dispatch({type:'UPDATE',payload : {id :id , data : expenseData}})
    }

    const value ={
        expenses : expensesState,
        addExpense : addExpense,
        setExpense : setExpense,
        deleteExpense : deleteExpense,
        updateExpense : updateExpense
    }

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpenseContextProvider