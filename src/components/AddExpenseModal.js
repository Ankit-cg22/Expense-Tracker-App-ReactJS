import React , {useRef} from 'react';
import {Modal , Form , Button} from 'react-bootstrap'
import { useBudgetContext } from '../contexts/BudgetContext';

export default function AddExpenseModal({show , handleClose , defaultBudgetID}) {
    const amountRef = useRef();
    const budgetIDRef = useRef();
    const descriptionRef = useRef();

    const {addExpense , budgets , UNCATEGORIZED_BUDGET_ID} = useBudgetContext()

    function handleSubmit(e){
        e.preventDefault()
        addExpense({
            description : descriptionRef.current.value,
            amount : parseFloat(amountRef.current.value),
            budgetID : budgetIDRef.current.value
        })
        handleClose()
    }
  return (
      <Modal show={show} onHide ={ handleClose}>
          <Form onSubmit ={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>New Expense</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className = "mb-3" controlId = "description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control ref = {descriptionRef} type="text" required/>
                </Form.Group>
     
                <Form.Group  className = "mb-3" controlId = "amount">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control ref = {amountRef} type="number" required min = {0} step={1}/>
                </Form.Group>

                <Form.Group  className = "mb-3" controlId = "budgetID">
                    <Form.Label>Budget</Form.Label>
                    <Form.Select
                        defaultValue = {defaultBudgetID}
                        ref = {budgetIDRef}
                    >
                        <option id={UNCATEGORIZED_BUDGET_ID}> Uncategorized </option>
                        {budgets.map(budget => (
                            <option key = {budget.id}  value = {budget.id}>
                                {budget.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <div className = "d-flex justify-content-end">
                    <Button variant="primary" type="submit">
                        Add
                    </Button>
                </div>
            </Modal.Body>
          </Form>
      </Modal>
  )
}
