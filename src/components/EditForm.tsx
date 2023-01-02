import React, { useState, useContext } from 'react'
import { DataContext } from '../context/DataContext'
import Return from '../assets/arrow-rotate-left-solid.svg'

function EditForm(props: any) {
    const [content] = useState("")
    const [id] = useState(props.note.id)
    const [date] = useState(props.note.date)
    const [important] = useState(props.note.important)
    const [error, setError] = useState(null)
    const { isEditing, setIsEditing } = useContext(DataContext)
    const API_ENDPOINT = "https://cooperative-tuna-spacesuit.cyclic.app/api/notes/"

    const [editText, setEditText] = useState(props.note.content)
    const handleEdit = (evt: React.FormEvent<HTMLInputElement>) => {
        const target = evt.target as HTMLInputElement;
        setEditText(target.value)
    }

    const handleReturn = () => {
        console.log('return to main page without changes')
        if (setIsEditing) {
            setIsEditing(!isEditing)
        }
    }

    const note = {
        id,
        important,
        content,
        date,
    }

    const handleChangedNote = async (idSearch: string) => {
        console.log(idSearch)
        const response = await fetch(API_ENDPOINT + idSearch, {
            method: "PATCH",
            body: JSON.stringify({ ...note, content: editText }),
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
        }

        if (setIsEditing) {
            setIsEditing(!isEditing)
        }
    }

    const handleDeleteNote = async (idSearch: string) => {
        const response = await fetch(API_ENDPOINT + idSearch, {
            method: "DELETE",
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
        }
    }
    return (
        <div className={`container-edit`}>
            <button className="btn-return" onClick={handleReturn}>
                <img src={Return} alt="" />
                Return
            </button>
            <div className="text-container">
                <label htmlFor="edit">
                    Edit note
                </label>
                <input type="text"
                    name="edit-note"
                    id="edit"
                    className="edit-text"
                    value={editText}
                    onChange={handleEdit}
                />
            </div>
            <div className="btn-container">
                <button type="button"
                    onClick={() => handleChangedNote(props.note._id)}>
                    Update note</button>
                <button type="button"
                    className="btn"
                    onClick={() => handleDeleteNote(props.note._id)}>
                    Delete Note
                </button>
            </div>
        </div>
    )
}

export default EditForm