import React from 'react'

const Person = (props) => {
  return (
    <li key={props.person.name}>
      {props.person.name + ' ' + props.person.number + ' '}
      <button onClick={() => {
        if (window.confirm("Are you sure?")) {
          props.deleteNumber(props.person.id)
        }
      }}>Delete</button>
      </li>
  )
}

export default Person