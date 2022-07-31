import { useState, useEffect } from "react"
import { useParams, useNavigate, Navigate} from "react-router-dom"
import React from 'react'
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'


const NotePage = () => {
  const navigate = useNavigate() // Use this to navigate to pages after CRUD.
  let params = useParams()
  let [note, setNote] =  useState(null) // until we load an object, this is null
  let CSRF = document.cookie.slice(10)  //Get CSRF token for request headers.

  useEffect(() => {
    getNote()
  }, [params.id])

  let handleChange = async (value) => {
    setNote(note => ({...note, 'body':value})) //Spread operator for the note
    // - Spread syntax can be used when all elements from an object or array need to be included in a list of some kind.
    // sets note state value as param value
  }

  let getNote = async () => {
    // Gets the note body from api
    if (params.id === 'new') return // if request is new note, stop the function

    let response = await fetch(`/api/notes/${params.id}/`) // here we use backticks to pass in noteID
    let data = await response.json()
    setNote(data) 
  }

  let createNote = async () => {
    // This function creates a new note in the api server
    fetch(`/api/notes/`, { // we send this data.
      method : "POST",
      headers : {
        'Content-Type': 'application/json',
          "X-CSRFToken": CSRF,
      },
      body : JSON.stringify(note) //Sending the note object
    })
  }

  let updateNote = async () => {
    // This function updates the note in the api with a put request 
    fetch(`/api/notes/${params.id}/`, { // we send this data.
      method : "PUT", //Sending a put request compatible with api call
      headers : {
        'Content-Type': 'application/json', //We're sending json data
        "X-CSRFToken": CSRF,
      },
      body : JSON.stringify(note) //Have to stringify the note before sending the data
    })
  }

  let deleteNote = async () => {
    fetch(`/api/notes/${params.id}/`, {
      method : "DELETE",
      headers : {
        'Content-Type': 'application/json', //We're sending json data
        "X-CSRFToken": CSRF,
      },
    })
    navigate("/")
  }

  // Fix this weird logic - delete button does not work.
  let handleSubmit = () => {
    if (note.body === '') {
      deleteNote()
    }
    else if (params.id !== 'new' && note.body !== null) {
      updateNote()
    }
    else if (params.id === 'new' && note.body !== null) { // if note is new and note empty, create it.
      createNote()
    }
    navigate("/")
  }

  return (
      <div className="note">
        <div className="note-header">
          <h3>
              <ArrowLeft onClick={handleSubmit} />
          </h3>

          {params.id !== 'new' ? (
              <button onClick={deleteNote}>Delete</button>
          ) : (
              <button onClick={handleSubmit}>Done</button>
          )
          }

        </div>
        <textarea onChange={(e) => {handleChange(e.target.value)}} value={note?.body}></textarea>
      </div> //question mark makes note.body optional. If its there pass it, not obligatory.
      // The onchange function updates the state of note to the current body value of the text field. 
      // e is element. and body is the target. e.target.value is element target(body) value.
  )
}

export default NotePage