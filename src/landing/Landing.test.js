import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter as Router  } from 'react-router-dom'

import Landing from './Landing'

test('renders successfully', () => {
  render(<Router><Landing /></Router>)
});
