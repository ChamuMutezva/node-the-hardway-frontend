import React, { useEffect, useState, useContext } from 'react'
import Form from '../components/Form'
import EditForm from '../components/EditForm'
import { Note } from '../types/NotesType'
import { DataContext } from '../context/DataContext'

function Home() {
    // const { notes, dispatch } = useNotesHooks()
    const [notes, setNotes] = useState<Note[]>([])
    const [showNote, setShowNote] = useState(false)
    const [newNote, setNewNote] = useState("")
    // const [isEditing, setIsEditing] = useState(false)
    const [noteToEdit, setNoteToEdit] = useState<Note>()
    const { isEditing, setIsEditing } = useContext(DataContext)

    useEffect(() => {
        const fetchNotes = async () => {
            console.log("asyns data")
            const response = await fetch("http://localhost:7821/api/notes")
            const data: Note[] = await response.json()
            console.log(data)
            console.log("no data")
            if (response.ok) {
                setNotes(data)
            }
        }
        fetchNotes()
    }, [isEditing])

    useEffect(() => {
        console.log(noteToEdit)
    }, [isEditing, noteToEdit])

    /* const note = {
         id,
         important,
         content,
         date
     }*/

    const handleGetNote = async (id: string) => {
        setShowNote(true)
        const response = await fetch("http://localhost:7821/api/notes/" + id, {
            method: 'GET',
            //body: JSON.stringify(...note),
            headers: {
                "Content-Type": "application/json"
            }
        })

        setNoteToEdit(await response.json())
        if (setIsEditing) {
            setIsEditing(!isEditing)
        }
        console.log(id)
    }

    const handleDelete = (id: string) => {
        console.log(id)
    }

    const handleEdit = (evt: React.FormEvent<HTMLInputElement>) => {
        const target = evt.target as HTMLInputElement;
        setNewNote(target.value)
        console.log("edit")
    }

    console.log("home")
    return (
        <div className={`container home ${isEditing ? "home-edit" : ""}`}>
            {isEditing && noteToEdit ?
                <EditForm note={noteToEdit} /> :
                <Form />}
            <h2>List of notes</h2>
            <div className="notes">

                {notes && notes.map((note: { _id: string; content: string }) => {
                    return <div key={note._id} className="container-note">
                        <p className="note-text">{note.content}</p>
                        <button className="btn" onClick={() => handleGetNote(note._id)}>Edit/Delete</button>
                    </div>
                }
                )}
            </div>
        </div>
    )
}

export default Home

