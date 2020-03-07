import './Pet.css'
import React from 'react'

export default function({ canAdopt, handleAdopt, data }) {
  return <section className='pet-section'>
    { !data &&
      <p>There are no cats left to adopt.</p>
    }

    { data &&
      <div className='pet'>
        <div id='pet-image' style={{ backgroundImage: `url(${ data.imageURL })` }} />
        <h2>{ data.name }</h2>
        <p>{ data.imageDescription }</p>

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

    { data && canAdopt &&
      <button onClick={ handleAdopt }>Adopt Me!</button>
    }
  </section>
}
