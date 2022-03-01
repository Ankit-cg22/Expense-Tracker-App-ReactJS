import React , {useContext} from 'react'

const BudgetContext = React.createContext()

export function useBudgetContext(){
    return useContext(BudgetContext)
}

export const BudgetProvider = ({children}) =>{
    return (
        <BudgetContext.Provider value={{}}>
            {children}
        </BudgetContext.Provider>
    )
}