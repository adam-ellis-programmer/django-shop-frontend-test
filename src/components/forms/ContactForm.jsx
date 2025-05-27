import React, { useEffect } from 'react'
import { Form, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../Headings/Header'
import { Send } from 'lucide-react'
const elements = [
  {
    id: 1,
    text: 'First Name',
    name: 'firstName',
    type: 'text',
  },
  {
    id: 2,
    text: 'Last Name',
    name: 'lastName',
    type: 'text',
  },
  {
    id: 3,
    text: 'Email',
    name: 'email',
    type: 'email',
  },
]

const ContactForm = () => {
  return (
    <div className=''>
      <header className='  rounded '>
        <Header
          text={`send us a quick message!`}
          styles={`text-2xl text-center mt-10`}
        />
      </header>
      <div className=' max-w-[800px] m-auto mt-8 lg:max-w-[570px] '>
        <Form className='shadow-2xl p-8 rounded-2xl hover'>
          {elements.map((item, i) => {
            return (
              <input
                key={i}
                name={item.name}
                type='text'
                placeholder={`Enter ${item.text}`}
                className='input input-secondary w-full mb-2'
              />
            )
          })}

          <textarea
            type='text'
            placeholder='Secondary'
            className='textarea textarea-secondary w-full min-h-[300px]'
          ></textarea>

          <div className='flex justify-end mt-3'>
            <button className='btn btn-outline btn-secondary'>
              Send <Send />
            </button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default ContactForm
