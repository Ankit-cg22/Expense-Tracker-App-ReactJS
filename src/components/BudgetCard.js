import {Card, ProgressBar , Stack , Button} from "react-bootstrap"
import { currencyFormater } from "../utils"

export default function BudgetCard({name , amount , limit , gray , onAddExpenseClick , onViewExpensesClick , hideButtons}) {

    const classNames = []
    if(amount > limit)
    {                   
        classNames.push("bg-danger" , "bg-opacity-10")
    }
    else if(gray)
    {
        classNames.push("bg-light")
    }

  return (
    <Card className={classNames.join(" ")}>
        <Card.Body>
            <Card.Title  className = "d-flex justify-content-between align-items-baseline fw-normal mb-3">
                <div className="me-2">{name}</div>
                <div className="d-flex align-items-baseline">
                    {currencyFormater.format(amount)}
                    {limit && <span className="text-muted fs-6 ms-1">/{currencyFormater.format(limit)}</span> }
                </div>
            </Card.Title>

            {limit && 
                <ProgressBar 
                    className="rounded-pill" 
                    variant={getProgressBarVariant(amount,limit)}
                    min={0}
                    max={limit}
                    now = {amount}
                />
            }

            {!hideButtons && (
                <Stack direction="horizontal" gap="2" className="mt-4">
                    <Button className="ms-auto" variant="outline-primary" onClick={onAddExpenseClick} >Add Expense</Button>
                    <Button variant="outline-secondary" onClick={onViewExpensesClick}>View Expense</Button>
                </Stack>
            )}

        </Card.Body>

    </Card>
  )
}

function getProgressBarVariant( amt , limit)
{
    const ratio = amt/limit
    if(ratio < 0.5)return "safe"
    if(ratio <0.75)return "warning"
    return "danger"
}