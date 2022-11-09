import React, { useState } from 'react'

function EditForm(props: any) {
    const [content] = useState("")
    const [id] = useState(props.note.id)
    const [date] = useState(props.note.date)
    const [important] = useState(props.note.important)
    const [error, setError] = useState(null)

    const [editText, setEditText] = useState(props.note.content)
    const handleEdit = (evt: React.FormEvent<HTMLInputElement>) => {
        const target = evt.target as HTMLInputElement;
        setEditText(target.value)
        // console.log(target)
    }

    const note = {
        id,
        important,
        content,
        date,
    }

    const handleChangedNote = async (idSearch: string) => {
        console.log(idSearch)
        const response = await fetch("http://localhost:7821/api/notes/" + idSearch, {
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
    }

    const handleDeleteNote = async (idSearch: string) => {
        const response = await fetch("http://localhost:7821/api/notes/" + idSearch, {
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
            <p className="current-note">{props.note.content}</p>
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