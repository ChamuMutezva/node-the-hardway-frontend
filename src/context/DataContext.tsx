import { createContext, useReducer , useState} from "react";

interface DataProviderProps {
    children: React.ReactNode
}
const defaultState = {
   isEditing: false
}
interface useEditProps {
    isEditing: boolean,
    setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>,    
}

export const DataContext = createContext<useEditProps>(defaultState)

export const DataProvider = ({ children }: DataProviderProps) => {
    const [isEditing, setIsEditing] = useState<boolean>(false)
  
    return (
        <DataContext.Provider value={{ isEditing , setIsEditing}}>
            {children}
        </DataContext.Provider>

    )
}