import React, { useState } from 'react'

const Form = (params) => {
  const [textField, setTextField] = useState('')
  const [dueField, setDueField] = useState(new Date())

  const handleChange = (e) => {
    setTextField(e.target.value)
  }
  const handleDateChange = (e) => {
    setDueField(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { text: textField, due_date: dueField }
    await fetch('http://localhost:3001/api/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })

    // setTextField('')
  }

  return (
    <form onSubmit={handleSubmit} className=' my-3'>
      <div className='form-row'>
        <div className='col'>
          <input
            type='text'
            onChange={handleChange}
            value={textField}
            id='text'
            name='textField'
            className='form-control '
          />
        </div>
        <div className='col-auto'>
          <input
            id='date'
            type='date'
            onChange={handleDateChange}
            value={dueField}
            name='dateField'
            className='form-control'
          />
        </div>
        <div className='col-auto'>
          <button type='submit' className='btn btn-primary ml-2'>
            Submit
          </button>
        </div>
      </div>
      {/* 
      <label htmlFor='text'>Due</label>
       */}
    </form>
  )
}

export default Form
