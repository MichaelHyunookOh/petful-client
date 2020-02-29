import './Adopt.css'
import React from 'react'

import Pet from './Pet'

export default class Adopt extends React.Component {
  state = {
    loadingStatus: 'loaded',
    cat: {},
    dog: {},
    people: []
  }

  componentDidMount() {
    fetch('http://localhost:8000/pets')
      .then(response => response.json())
      .then(data => {
        this.setState({
          cat: data.cat,
          dog: data.dog
        })
      })

    fetch('http://localhost:8000/people')
      .then(response => response.json())
      .then(data => {
        this.setState({ people: data })
      })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: event.target['name'].value })
    }

    fetch('http://localhost:8000/people', config)
      .then(response => response.json())
      .then(data => {
        this.setState({ people: data })
      })

    // Begin automatically dequeueing and displaying names.

    event.target['name'].value = ''
  }

  render() {
    return <div id='adopt' className={ this.state.loadingStatus }>
      <section id='loading'>
        <span>Loading...</span>
      </section>

      <section id='pets'>
        <section id='cats' className='pet-section'>
          <Pet data={ this.state.cat } />
        </section>

        <section id='dogs' className='pet-section'>
          <Pet data={ this.state.dog } />
        </section>
      </section>

      <section id='people'>
        <p>Get in Line to Adopt</p>

        <form onSubmit={ this.handleSubmit }>
          <input id='name' type='text' placeholder='Name' />
          <input type='submit' />
        </form>

        <p>Currently in line:</p>

        <ul>
          { this.state.people.map((person, index) => {
            return <li key={ index }>{ person }</li>
          })}
        </ul>
      </section>
    </div>
  }
}
