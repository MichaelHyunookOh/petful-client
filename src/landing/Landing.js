import React from 'react'
import { Link } from 'react-router-dom'

export default function() {
  return <section id='landing'>
    <img alt='Kitten' src='http://place-puppy.com/200x200' />
    <p>Welcome to Petful! If you are looking to adopt a cute little friend, you have come to the perfect place. Here's how it works! Join the line to get started adn wait for your turn to choose a pet. Once you are next in line, choose the pet that you desire and it will be yours! </p>

    <Link to='/adopt'>Adopt a Pet!</Link>
  </section>
}
