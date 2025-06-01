import React, { useState } from 'react'
import axios from 'axios'

function ItemForm({ onItemAdded }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    //
    try {
      const response = await axios.post('http://localhost:8000/api/items/', {
        name,
        description,
      })

      // Call the callback with the new item
      onItemAdded(response.data)

      // Clear the form
      setName('')
      setDescription('')
    } catch (error) {
      console.error('Error creating item:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='item-form'>
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description:</label>
          <textarea
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>
        <button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Item'}
        </button>
      </form>
    </div>
  )
}

export default ItemForm
