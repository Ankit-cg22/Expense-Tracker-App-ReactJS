import React from 'react'
import BudgetCard from './BudgetCard'
import { useBudgetContext } from '../contexts/BudgetContext'

export default function TotalBudgetCard() {
    const {expenses, budgets} = useBudgetContext();
    if(budgets.length == 0)return null;
    const amount = expenses.reduce((total , expense) => total + expense.amount , 0);
    const limit = budgets.reduce((total , budget) => total + budget.max , 0)  ;
  return (
    <BudgetCard name="Overall Budget" grey amount={amount} limit={limit} hideButtons />
  )
}
