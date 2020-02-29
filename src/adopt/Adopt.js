import './Adopt.css'
import React from 'react'

export default class Adopt extends React.Component {
  state = {
    loadingStatus: 'loaded',
    cat: {},
    dog: {}
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
  }

  render() {
    return <div id='adopt' className={ this.state.loadingStatus }>
      <section id='loading'>
        <span>Loading...</span>
      </section>

      <section id='cats' className='pet-section'>
        <Pet data={ this.state.cat } />
      </section>

      <section id='dogs' className='pet-section'>
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
