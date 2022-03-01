import React , {useContext , useState} from 'react'
import {v4 as uuidV4} from 'uuid'
import useLocalStorage from '../hooks/useLocalStorage'

const BudgetContext = React.createContext()

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

export function useBudgetContext(){
    return useContext(BudgetContext)
}

// budget {
//     id : 
//     name :
//     max:
// }

//expense{
//     id:
//     budgetID:
//     amount:
//     description:
// }

export const BudgetProvider = ({children}) =>{
    const [budgets , setBudgets] = useLocalStorage("budgets" , []) 
    const [expenses , setExpenses] = useLocalStorage( "expenses" , []) 

    function getBudgetExpenses(budgetID){
        return expenses.filter(expense => expense.budgetID === budgetID)
    }

    function addExpense({budgetID, amount , description}){
        setExpenses(prevExpenses=>{
            return [...prevExpenses , {id : uuidV4() , budgetID , amount , description}]
        })
    }

    function addBudget({name , max}){

        setBudgets(prevBudgets => {

            if(prevBudgets.find(budget => budget.name === name)) {
                return prevBudgets;
            }

            return [...prevBudgets , { id : uuidV4() , name , max}]
        })
    }

    function deleteBudget({ id }){

        setExpenses(prevExpenses => {
            return prevExpenses.map(expense => {
                if(expense.budgetID === id) return {...expense , budgetID : UNCATEGORIZED_BUDGET_ID}
                else return expense 
            })
        })

        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id)
        })
    }

    function deleteExpense({ id }){
        setExpenses(prevExpenses=>{
            return prevExpenses.filter(expense => expense.id !== id)
        })
    }
    
    return (
        <BudgetContext.Provider value={{
            budgets,
            expenses,
            getBudgetExpenses,
            addExpense,
            addBudget,
            deleteBudget,
            deleteExpense
        }}>
            {children}
        </BudgetContext.Provider>
    )
}