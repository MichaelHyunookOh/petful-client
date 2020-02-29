import './Adopt.css'
import React from 'react'

export default class Adopt extends React.Component {
  state = {
    cat: {
      age: 5,
      breed: 'Tabby',
      description: 'The furry kind.',
      gender: 'Female',
      image: 'https://loremflickr.com/200/200/cat',
      name: 'Cat 1',
      story: 'A story about the cat.'
    },

    dog: {
      age: 2,
      breed: 'Mutt',
      description: 'The kind that barks.',
      gender: 'Male',
      image: 'https://loremflickr.com/200/200/dog',
      name: 'Dog 1',
      story: 'A story about the dog.'
    },
  }

  render() {
    return <div id='adopt'>
      <section id='cats'>
        <Pet data={ this.state.cat } />
      </section>

      <section id='dogs'>
        <Pet data={ this.state.dog } />
      </section>
    </div>
  }
}

function Pet({ data }) {
  return <div className='pet'>
    <img src={ data.image } alt='Pet.' />
    <h2>{ data.name }</h2>
    <p>{ data.description }</p>

    <table>
      <tbody>
        <tr>
          <td>Age</td>
          <td>{ data.age }</td>
        </tr>

        <tr>
          <td>Breed</td>
          <td>{ data.breed }</td>
        </tr>

        <tr>
          <td>Gender</td>
          <td>{ data.gender }</td>
        </tr>

        <tr>
          <td>Story</td>
          <td>{ data.story }</td>
        </tr>
      </tbody>
    </table>
  </div>
}
