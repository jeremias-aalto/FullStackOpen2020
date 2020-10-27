import axios from 'axios'
//const baseUrl = '/api/persons'
const baseUrl = 'http://localhost:3001/api/persons'
//const baseUrl = 'https://hidden-shore-97745.herokuapp.com/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return (
    request.then(response => response.data)
  )
}

const createPerson = (newPerson) => {
  const request = axios.post(baseUrl, newPerson)
  return (
    request.then(response => response.data)
  )
}

const deletePerson = (id) => {
  const personUrl = baseUrl + '/' + id
  const request = axios.delete(personUrl)
  return (
    request.then(response => response.data)
  )
}

export default { getAll, createPerson, deletePerson }