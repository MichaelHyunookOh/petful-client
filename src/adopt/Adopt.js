import './Adopt.css'
import React from 'react'
import faker from 'faker'

import Pet from './Pet'
const API_URL = process.env.REACT_APP_API_URL

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
    const getPets = fetch(`${ API_URL }/pets`)
      .then(response => response.json())

    const getPeople = fetch(`${ API_URL }/people`)
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

    fetch(`${ API_URL }/people`, config)
      .then(response => response.json())
      .then(data => {
        this.setState({
          people: [ ...this.state.people, data.person ]
        })
      })
  }

  beginAutomaticAdopting = () => {
    const adoptionTimer = setInterval(() => {
      const type = [ 'cat', 'dog' ][Math.round(Math.random())]

      if (this.state[type]) {
        this.adopt(type, this.state.people[0])

        // Add someone to the line to replace the person who
        // adopted, so the queue doesn't empty out.
        this.addToLine(faker.name.findName())
      }
    }, 3000)

    const stop = setInterval(() => {
      if (this.state.canAdopt) {
        clearInterval(adoptionTimer)
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

    fetch(`${ API_URL }/adopt`, config)
      .then(response => response.json())
      .then(data => {
        const [ removed, ...people ] = this.state.people
        const canAdopt = people[0] === this.state.currentPerson

        const message = canAdopt
          ? "It's your turn!"
          : data.message

        this.setState({
          canAdopt,
          cat: data.cat,
          dog: data.dog,
          message,
          people
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
          { this.state.cat &&
            <Pet data={ this.state.cat } />
          }

          { !this.state.cat &&
            <p>There are no cats left to adopt.</p>
          }

          { this.state.cat && this.state.canAdopt &&
            <button onClick={ () => this.handleAdopt('cat') }>Adopt Me!</button>
          }
        </section>

        <section id='dogs' className='pet-section'>
          { this.state.dog &&
            <Pet data={ this.state.dog } />
          }

          { !this.state.dog &&
            <p>There are no dogs left to adopt.</p>
          }

          { this.state.dog && this.state.canAdopt &&
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
