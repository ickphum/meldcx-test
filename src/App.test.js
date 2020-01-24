import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Login from './Login.js';
import Devices from './Devices.js';

// App tests to be done

// login form is rendered by default
test('renders login page', () => {
  const { getByText } = render(<App />);
  const loginLabel = getByText(/login/i);
  expect(loginLabel).toBeInTheDocument();
});

// device screen is rendered if authToken is defined

// Login tests

// login screen is rendered correctly

// valid login data allows access to device screen

// invalid login data causes error and stays on login screen

// error is cleared on new input

// Devices tests

// correct number of device icons is created

// logout button returns to login screen
