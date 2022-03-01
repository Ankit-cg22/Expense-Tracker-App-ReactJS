import React from 'react'
import BudgetCard from './BudgetCard'
import { UNCATEGORIZED_BUDGET_ID, useBudgetContext } from '../contexts/BudgetContext'

export default function UncategorizedBudgetCard(props) {
    const {getBudgetExpenses} = useBudgetContext();
    const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
        (total , expense) => total + expense.amount , 
        0
    )

    if(amount == 0)return null;

  return (
    <BudgetCard {...props} amount={amount} name = "Miscellaneous" grey/>
    
  )
}
