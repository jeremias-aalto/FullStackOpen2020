import React, { useState, useEffect } from 'react'

import AddForm from './components/AddForm'
import FilterForm from './components/FilterForm'
import PersonsList from './components/PersonsList'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [confirmationMessage, setConfirmationMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange   = (event) => { setNewName(event.target.value)   }
  const handleNumberChange = (event) => { setNewNumber(event.target.value) }
  const handleFilterChange = (event) => { setNewFilter(event.target.value) }

  const addNumber = (event) => {
    event.preventDefault()
    
    if ( persons.some( person => person.name === newName ) ) {
      window.alert(newName + ' is already added to the phonebook')
      setNewName('')
      setNewNumber('')
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService
        .createPerson(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
      setConfirmationMessage(
        `Added ${newPerson.name}`
      )
      setTimeout(() => {
        setConfirmationMessage(null)
      }, 3000)
    }
  }

  const deleteNumber = (id) => {
    personService
      .deletePerson(id)
      .then(
        setPersons(persons.filter(p => p.id !== id)),
        setConfirmationMessage(
          `Deleted ${persons.find(p=>p.id===id).name}`
        ),
        setTimeout(() => {
          setConfirmationMessage(null)
        }, 3000)
      )
  }
  
  return (
    <div>
      <h1>Phonebook</h1>
      <h3>Add new number</h3>
      <Notification message={confirmationMessage} />
      <AddForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addNumber={addNumber}/>
      <h3>Numbers added</h3>
      <FilterForm persons={persons} filter={newFilter} handleFilterChange={handleFilterChange}/>
      <PersonsList persons={persons} filter={newFilter} deleteNumber={deleteNumber}/>
    </div>
  )
}

export default App










/*
const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange   = (event) => { setNewName(event.target.value)   }
  const handleNumberChange = (event) => { setNewNumber(event.target.value) }
  const handleFilterChange = (event) => { setNewFilter(event.target.value) }

  const addNumber = (event) => {
    event.preventDefault()
    
    if ( persons.some( person => person.name === newName ) ) {
      window.alert(newName + ' is already added to the phonebook')
      setNewName('')
      setNewNumber('')
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService
        .createPerson(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <h3>Add new number</h3>
      <AddForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addNumber={addNumber}/>
      <h3>Numbers added</h3>
      <FilterForm persons={persons} filter={newFilter} handleFilterChange={handleFilterChange}/>
      <PersonsList persons={persons} filter={newFilter}/>
    </div>
  )
}
*/