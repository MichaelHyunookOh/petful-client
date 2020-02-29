import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter as Router  } from 'react-router-dom'

import Pet from './Pet'

test('renders successfully', () => {
  render(<Router><Pet data={ {} } /></Router>)
});
