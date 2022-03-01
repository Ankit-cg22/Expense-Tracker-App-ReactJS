import React , {useContext , useState} from 'react'
import {v4 as uuidV4} from 'uuid'

const BudgetContext = React.createContext()

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
    const [budgets , setBudgets] = useState([]) 
    const [expenses , setExpenses] = useState([]) 

    function getBudgetExpenses(budgetID){
        return expenses.filter(expense => expense.budgetID === budgetID)
    }
    function addExpense(){

    }
    function addBudget({name , max}){
        
        setBudgets(prevBudgets => {

            if(prevBudgets.find(budget => budget.name === name)) {
                return prevBudgets;
            }

            return [...prevBudgets , { id : uuidV4() , name , max}]
        })
    }
    function deleteBudget(){

    }
    function deleteExpense(){

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