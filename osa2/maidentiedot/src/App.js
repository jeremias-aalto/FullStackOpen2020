import React, { useState, useEffect } from 'react'
import axios from 'axios'

const SearchForm = (props) => {
  return (
    <div>
      <form>
        <div>
          Find country: <input value={props.name} onChange={props.handleNameChange}/>
        </div>
      </form>
    </div>
  )
}

const InfoPage = (props) => {
  return (
    <div>
      <h2>{props.country.name}</h2>
      <p>Capital: {props.country.capital}</p>
      <p>Population: {props.country.population}</p>
      <p>Languages: </p>
      <ul>{props.country.languages.map(l => <li key={l.name}>{l.name}</li>)}</ul>
      <img src={props.country.flag} alt='' style={{height:'300px', width: 'auto'}} />
    </div>
  )
}

const CountryList = (props) => {
  if (props.countries.length===0) {
    return (
      <div>
        No matches found.
      </div>
    )
  } else if (props.countries.length===1) {
    return (
      <InfoPage country={props.countries[0]}/>
    )
  } else if (props.countries.length>10) {
    return (
      <div>
        Too many matches. Be more specific.
      </div>
    )
  } else {
    return (
      <div>
        <ul>
          {props.countries.map(country => 
            <li key={country.name}>
              {country.name}{' '}
              <button onClick={()=>props.showInfo(country.name)}>Show info</button>
            </li>)}
        </ul>
      </div>
    )
  }
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ name, setName ] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      axios
      .get(`https://restcountries.eu/rest/v2/name/${name}`)
      .then(response => {
        setCountries(response.data)
      })
      .catch(Error => { 
        setCountries([]) 
      })
    }, 1000)
    return () => clearTimeout(timeout)
  }, [name])

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const showInfo = (name) => {
    setCountries(countries.filter(country=>country.name===name))
  }

  return (
    <div>
      <h1>Maiden tiedot</h1>
      <SearchForm name={name} handleNameChange={handleNameChange} />
      <CountryList countries={countries} showInfo={showInfo}/>
    </div>
  )
}

export default App