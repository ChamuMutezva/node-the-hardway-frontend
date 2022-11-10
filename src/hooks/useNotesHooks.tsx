import { useContext } from 'react'
import { DataContext } from '../context/DataContext'

export const useNotesHooks = () => {
    const context = useContext(DataContext)
    if(!context) {
        throw Error("UseNotesHooks must be used inside the DataProvider context")
    }
    return context
}