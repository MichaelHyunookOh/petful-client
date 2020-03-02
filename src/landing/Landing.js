import React from 'react'
import { Link } from 'react-router-dom'

export default function() {
  return <section id='landing'>
    <img alt='Kitten' src='http://placekitten.com/250/250' />
    <p>With Petful, you can easily find the pet of your dreams. Simply get in line and wait your turn to adopt a wonderful cat or dog!</p>

    <Link to='/adopt'>Get started!</Link>
  </section>
}
