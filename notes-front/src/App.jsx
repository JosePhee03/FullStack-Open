import { useState, useEffect } from 'react'
import { AddNote, deleteNote, getNotes, toggleImportant } from '../service/request'

const url = 'http://localhost:3001/api/notes'

function App () {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    getNotes(url).then(data => setNotes(data))
  }, [])

  const createNote = (event) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    const noteContent = formData.get('note-content')

    AddNote(url, noteContent).then(data => setNotes(data))
  }

  const isImportant = (important) => {
    return important ? 'Important' : 'Not important'
  }

  return (
    <main className='flex justify-center items-center min-h-screen flex-col gap-4'>
      <h1 className='text-3xl font-bold text-white mt-4'>Notes FullStack Open</h1>
      <ul className='my-2 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:mx-12 gap-2 mx-6'>
        {notes.map((note) =>
          <li key={note.id} className='col-span-1 bg-yellow-200 flex flex-col justify-between gap-3 p-3 rounded-sm'>
            <span className='break-words'>{note.content}</span>
            <div className='flex justify-between'>
              <button
                className={`bg-opacity-25 px-3 py-1 rounded-md
                ${note.important
                  ? 'bg-green-300 text-green-500'
                  : 'bg-pink-300 text-pink-500'
                }`}
                onClick={() => toggleImportant(url, note.id).then(setNotes)}
              >
                {isImportant(note.important)}
              </button>
              <button
                className='rounded-md border-2 border-red-400 px-3 py-1 text-red-500'
                onClick={() => deleteNote(url, note.id).then(setNotes)}
              >
                Delete
              </button>
            </div>
          </li>
        )}
      </ul>
      <form onSubmit={createNote}>
        <fieldset className='border-2 border-stone-400 flex flex-col p-2'>
          <legend className='text-stone-200'>Create Note</legend>
          <label className='text-white' htmlFor="content">Content:</label>
          <span className='flex justify-start'>
            <textarea className='rounded-l-sm px-2 resize-none' name='note-content' type="text" id='content' />
            <button className='bg-emerald-500 text-white font-bold rounded-r-sm px-2' type='submit'>Add</button>
          </span>
        </fieldset>
      </form>
    </main>
  )
}

export default App
