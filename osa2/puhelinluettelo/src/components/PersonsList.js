import React from 'react'
import Person from './Person'

const PersonsList = (props) => {
    return (
      <div>
        <ul>
          {props.persons.filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase())).map((person, i) => <Person key={i} person={person} deleteNumber={props.deleteNumber}/>)}
        </ul>
      </div>
    )
}

export default PersonsList