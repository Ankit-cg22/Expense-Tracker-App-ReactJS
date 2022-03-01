import Container from 'react-bootstrap/Container'
import {Stack , Button} from 'react-bootstrap'
import BudgetCard from './components/BudgetCard';
import AddBudgetModal from './components/AddBudgetModal';
import {useState} from 'react'
import { UNCATEGORIZED_BUDGET_ID, useBudgetContext } from './contexts/BudgetContext';
import AddExpenseModal from './components/AddExpenseModal';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';
import TotalBudgetCard from './components/TotalBudgetCard';
import ViewExpensesModal from './components/ViewExpensesModal'

function App() {

  const [ showModal , setShowModal ] = useState(false)
  const {budgets , getBudgetExpenses} = useBudgetContext()
  const [addExpenseModalBudgetID , setAddExpenseModalBudgetID] = useState()
  const [showAddExpenseModal , setShowAddExpenseModal] = useState(false)
  const [expensesModalID , setExpensesModalID] = useState(null)

  function openAddExpenseModal(budgetID)
  {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetID(budgetID)
  }

  return (
    <>
      <Container className="my-4">
        <Stack direction = "horizontal" gap = "2" className = "mb-4">
          <h1 className = "me-auto"> Budget </h1>
          <Button variant="primary" onClick = {() => setShowModal(true)} >Add Budget</Button>
          <Button variant="outline-primary" onClick = {() => setShowAddExpenseModal(true)}>Add Expense</Button>
        </Stack>

        <div style ={{marginBottom:"10px" , display:"grid" , gridTemplateColumns: "repeat(auto-fill , minmax(300px , 1fr))" , gap : "1rem" , alignItems:"flex-start"}}>
          {/* <BudgetCard name="sports" amount={600} limit={1000} gray></BudgetCard> */}
          {budgets.map(budget => {
              const amount = getBudgetExpenses(budget.id).reduce(
                (total , expense) => total + expense.amount , 
                0
              )
            return(
              <BudgetCard 
              key={budget.id} 
              gray name = {budget.name} 
              amount = {amount} 
              limit = {budget.max}
              onAddExpenseClick = {() => openAddExpenseModal(budget.id)}
              onViewExpensesClick = {() => setExpensesModalID(budget.id)}
              />
            )
          })}

          <UncategorizedBudgetCard 
              
              onAddExpenseClick = {() => openAddExpenseModal()} 
              onViewExpensesClick = {() => setExpensesModalID(UNCATEGORIZED_BUDGET_ID)}
          />

        </div>
        <TotalBudgetCard className = "mt-4"/>
          
      </Container>

      <AddBudgetModal show = {showModal} handleClose = {() => setShowModal(false)} />
        
      <AddExpenseModal show= {showAddExpenseModal} defaultBudgetID={addExpenseModalBudgetID} handleClose = {() => setShowAddExpenseModal(false)} />

      <ViewExpensesModal budgetID = {expensesModalID} handleClose = {() =>setExpensesModalID(null)} />
    </>

  );  
}

export default App;
