import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { API_ENDPOINT_PATH } from "../config";

function Form() {
    const [content, setContent] = useState("")
    const [id, setID] = useState("")
    const [date, setDate] = useState("")
    const [important, setImportant] = useState(false)
    const [error, setError] = useState(null)
   
    useEffect(() => {
        setImportant(true)
        setID(nanoid())
        setDate(new Date().toLocaleDateString())
    }, [content])

    const handleSubmit = async (evt: React.SyntheticEvent) => {
        evt.preventDefault()
       
        const note = {
            id,
            important,
            content,
            date
        }

        const response = await fetch(API_ENDPOINT_PATH, {
            method: "POST",
            body: JSON.stringify(note),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const json = await response.json()

        if (!response.ok) {
           return setError(json.error)
        }
        
        if (response.ok) {
            setError(null)
            setID("")
            setContent("")
            setImportant(false)
            setDate("")
        }
        console.log("form submitted")
    }

    const handleChange = (evt: React.FormEvent<HTMLInputElement>) => {
        const target = evt.target as HTMLInputElement;       
        setContent(target.value)
        console.log(target)
    }

    return (
        <form className="container" onSubmit={handleSubmit}>
            <label htmlFor="content">
                Create new note
            </label>
            <input type="text"
                name="content"
                id="content"
                className="content"
                value={content}
                onChange={handleChange} />
            <button type="submit">Submit</button>
        </form>
    )
}

export default Form