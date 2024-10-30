import React from 'react'
import './Search.css'

const Filter = ({filter, handleFilterChange, options}) => {
  return (
    <div className= 'd-flex justify-content-end' >
        <select value={filter} onChange={handleFilterChange} className= 'filter-bar back-ground-skin' placeholder="Filters">
        {options.map(item => <option className="text-body" key={item.key} value={item.value}>{item.name}</option>)}
    </select>
    </div>
  )
}

export default Filter
