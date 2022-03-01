import React   from 'react';
import {Modal  , Button, Stack} from 'react-bootstrap'
import { UNCATEGORIZED_BUDGET_ID, useBudgetContext } from '../contexts/BudgetContext';
import { currencyFormater } from '../utils';

export default function ViewExpensesModal({budgetID , handleClose}) {
  const {getBudgetExpenses , budgets , deleteBudget ,deleteExpense} = useBudgetContext()

  const budget = 
        budgetID === UNCATEGORIZED_BUDGET_ID 
        ?
        {name : "Mischellaneous" ,id :UNCATEGORIZED_BUDGET_ID} 
        :
        budgets.find(bg => bg.id === budgetID)

  const expenses = getBudgetExpenses(budgetID)

  return (
      <Modal show={budgetID !== null} onHide ={ handleClose}>
          <Modal.Header closeButton>
              <Modal.Title>
                  Expenses : {budget?.name}
                  {budgetID !== UNCATEGORIZED_BUDGET_ID && (
                      <Button
                        onClick = { () => {
                            deleteBudget(budget)
                            handleClose();
                        }} 
                        variant="outline-danger"
                        style = {{marginLeft : "5px"}}
                    >
                        Delete 
                    </Button>
                  )}
              </Modal.Title>
            
              

          </Modal.Header>
          <Modal.Body>
                  <Stack direction = "vertical" gap = "3">
                      {expenses.map(exp => (
                          <Stack direction = "horizontal" gap ="2" key ={expenses.id}>
                              <div className='me-auto fs-6'>
                                  {exp.description}
                              </div>
                              <div className='fs-6'>
                                  {currencyFormater.format(exp.amount)}
                              </div>
                              <Button size ="sm" variant = "outline-danger" onClick = {() => deleteExpense(exp)}> &times; </Button>
                          </Stack>
                      ))

                      }
                  </Stack>
              </Modal.Body>
      </Modal>
  )
}
