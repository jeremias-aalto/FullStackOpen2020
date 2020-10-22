import React from 'react'

const AddForm = (props) => {
    return (
      <div>
        <form>
          <div>
            Name: <input value={props.newName} onChange={props.handleNameChange}/>
          </div>
          <div>
            Number: <input value={props.newNumber} onChange={props.handleNumberChange}/>
          </div>
          <div>
            <button onClick={props.addNumber} >Add</button>
          </div>
        </form>
      </div>
    )
}

export default AddForm