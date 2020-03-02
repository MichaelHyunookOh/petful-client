import './Adopt.css'
import React from 'react'
import faker from 'faker'

import Pet from './Pet'

export default class Adopt extends React.Component {
  state = {
    loadingStatus: 'loading',
    message: null,

    canAdopt: false,
    currentPerson: null,

    cat: {},
    dog: {},
    people: [],
  }

  componentDidMount() {
    const getPets = fetch('http://localhost:8000/pets')
      .then(response => response.json())

    const getPeople = fetch('http://localhost:8000/people')
      .then(response => response.json())

    Promise.all([ getPets, getPeople ])
      .then(([ pets, people ]) => {
        this.setState({
          loadingStatus: 'loaded',

          cat: pets.cat,
          dog: pets.dog,
          people,
        })
      })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const newPerson = event.target['name'].value

    this.setState({ currentPerson: newPerson })
    this.addToLine(newPerson)

    // For demo purposes, start cycling the queue so that
    // the new person gets a chance to adopt.
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
    const adoptionTimer = setInterval(() => {
      const type = [ 'cat', 'dog' ][Math.round(Math.random())]
      this.adopt(type, this.state.people[0])
    }, 1000)

    const newPersonTimer = setInterval(() => {
      this.addToLine(faker.name.findName())
    }, 1000)

    const stop = setInterval(() => {
      if (this.state.canAdopt) {
        this.setState({ canAdopt: true, message: "It's your turn!" })

        clearInterval(adoptionTimer)
        clearInterval(newPersonTimer)
        clearInterval(stop)
      }
    })
  }

  handleAdopt = (type) => {
    this.adopt(type, this.state.currentPerson)
    this.setState({ canAdopt: false, currentPerson: null })
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
            <button onClick={ () => this.handleAdopt('cat') }>Adopt Me!</button>
          }
        </section>

        <section id='dogs' className='pet-section'>
          <Pet data={ this.state.dog } />

          { this.state.canAdopt &&
            <button onClick={ () => this.handleAdopt('dog') }>Adopt Me!</button>
          }
        </section>
      </section>

      <section id='people'>
        <p id='message'>{ this.state.message }</p>

        { !this.state.currentPerson &&
          <div id='get-in-line'>
            <p>Get in line to adopt a pet!</p>

            <form onSubmit={ this.handleSubmit }>
              <input required id='name' type='text' placeholder='Name' />
              <input type='submit' value='Get in Line' />
            </form>
          </div>
        }

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
