import React from 'react'

const FilterForm = (props) => {
    return (
      <div>
        <form>
          Filter by name: <input value={props.newFilter} onChange={props.handleFilterChange}/>
        </form>
      </div>
    )
}

export default FilterForm