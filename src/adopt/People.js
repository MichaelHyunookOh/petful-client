import './People.css'
import React from 'react'

export default function({ handleNewPerson, currentPerson, people }) {
  function handleSubmit(event) {
    event.preventDefault()

    handleNewPerson(event.target['name'].value)
    event.target['name'].value = ''
  }

  return <section id='people'>
    { !currentPerson &&
      <div id='get-in-line'>
        <p>Get in line to adopt a pet!</p> 

        <form onSubmit={ handleSubmit }>
          <input required id='name' type='text' placeholder='Name' />
          <input type='submit' value='Get in Line' />
        </form>
      </div>
    }

    <p>Currently in line:</p>

    <ul>
      { people.map((person, index) => {
        return <li key={ index }>{ person }</li>
      })}
    </ul>
  </section>
}
