import './Adopt.css'
import React from 'react'

import Pet from './Pet'

export default class Adopt extends React.Component {
  state = {
    canAdopt: false,
    cat: {},
    currentPerson: null,
    dog: {},
    loadingStatus: 'loaded',
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
    const newPerson = event.target['name'].value

    this.setState({ currentPerson: newPerson })
    this.addToLine(newPerson)

    // Begin automatically dequeueing and displaying names.
    this.beginAutomaticAdopting()

    event.target['name'].value = ''
  }

  addToLine = (name) => {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    }

    fetch('http://localhost:8000/people', config)
      .then(response => response.json())
      .then(data => {
        this.setState({
          people: data
        })
      })
  }

  beginAutomaticAdopting = () => {
    this.setState({
      adoptionTimer: setInterval(() => {
        const type = [ 'cat', 'dog' ][Math.round(Math.random())]
        this.adopt(type, this.state.people[0])
      }, 1000),

      newPersonTimer: setInterval(() => {
        this.addToLine('New Person')
      }, 1000)
    })
  }

  adopt = (type, person) => {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ type, person })
    }

    fetch('http://localhost:8000/adopt', config)
      .then(response => response.json())
      .then(data => {
        const canAdopt = data.people[0] === this.state.currentPerson

        this.setState({
          canAdopt,
          cat: data.cat,
          dog: data.dog,
          message: data.message,
          people: data.people,
        })
      })
  }

  render() {
    return <div id='adopt' className={ this.state.loadingStatus }>
      <section id='loading'>
        <span>Loading...</span>
      </section>

      <section id='pets'>
        <section id='cats' className='pet-section'>
          <Pet data={ this.state.cat } />

          { this.state.canAdopt &&
            <button>Adopt Me!</button>
          }
        </section>

        <section id='dogs' className='pet-section'>
          <Pet data={ this.state.dog } />

          { this.state.canAdopt &&
            <button>Adopt Me!</button>
          }
        </section>
      </section>

      <section id='people'>
        <p>Get in Line to Adopt</p>

        <form onSubmit={ this.handleSubmit }>
          <input required id='name' type='text' placeholder='Name' />
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
