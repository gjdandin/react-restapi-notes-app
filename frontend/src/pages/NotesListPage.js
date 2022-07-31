import React, {useState, useEffect} from 'react'
import ListItem from '../components/ListItem'
import { AddButton } from '../components/AddButton'
import { note } from '../pages/NotePage'

// Dynamic listing of notes
const NotesListPage = () => {
    // notes is using state and changes according to setNotes command.
    let [notes, setNotes] = useState([]) // A state, you have notes data object that changes depending on setNotes.
    let CSRF = document.cookie.slice(10) //Get CSRF token for request headers.
    let [count, setCount] = useState((0))

    useEffect(() => {
        addCounter()
    }, [""])

   useEffect(() => {
        getNotes()
   }, [count]) //[] is optional parameter, dependency that determines when use effect fires off again
    // useeffect fires off each getNotes request

    let addCounter = () => { // another stateprop to ensure getnotes is triggered each reload/navigation to index.
        let newcount = count + 1
        setCount(newcount)
    }

    let getNotes = async () => {
    // Get the notes from django db
      let response = await fetch('/api/notes/', {
      method : "GET",
      headers : {
        'Content-Type': 'application/json', //We're sending json data
        "X-CSRFToken": CSRF,
      },
      })
      // get request to this django endpoint
      // await is command to wait for the data to come back.
      // if we dont have await, we get a promise that isn't the data
      let data = await response.json()
      setNotes(data) // Here you update the state based on the data returned from fetch db.
   }


    return (
    <div className="notes">
      <div className='notes-header'>
        <h2 className='notes-title'>&#9782; Notes</h2>
        <p className='notes-count'>{notes.length}</p>
      </div>
      
      <div className='notes-list'>
          {notes.map((note, index) => ( //For loop, for each note, write down the body. 
            <ListItem key={index} note={note}/>// Each child in a map list needs a "key" identifier such as index.
            // We pass down a note object to ListItem that renders the html for each component.
          ))}
      </div>
      <AddButton />
    </div>
  )
}

export default NotesListPage