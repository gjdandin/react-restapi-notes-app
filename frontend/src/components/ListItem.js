import React from 'react'
import {
  Link
} from "react-router-dom";

let getTitle = (note) => {
  let title = note.body.split('\n')[0]
        // Fixing if note has no title at top, what to show?
    let count = 0
    while (title == "") {
        title = note.body.split('\n')[count]
        count += 1
    }

  //split along new lines and set first line as title
  if (title.length > 45) {
    return title.slice(0, 45) //if title too long, set first 45 chars as title
  }
  return title
}

let getTime = (note) => { //returns formatted date time.
  return new Date(note.updated).toLocaleDateString() + " - " + new Date(note.updated).toLocaleTimeString()
}

let getContent = (note) => { 
    //returns a shortened version of note.body for the list item span.
    let title = getTitle(note)
    let content = note.body.replaceAll('\n', ' ') // removes all \n
    content = content.replaceAll(title, '') //removes title

    if (content.length > 35) {
      return content.slice(0, 35) + '...'
    }
    return content
}

const ListItem = ({note}) => { //Pass in the current note - for use in notes list page.
  // Links is the react version of <a href tag>
  return (
    <Link to={`/note/${note.id}`} >
      <div className='notes-list-item'>
        <h3>{getTitle(note)}</h3>
        <p><span>{getTime(note)}</span>{getContent(note)}</p>
      </div>
    </Link>
  )
}

export default ListItem