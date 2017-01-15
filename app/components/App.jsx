import React, { Component } from 'react';
import Navbar from './Navbar'

const App = props => {
  const { children } = props;

  return (
    <div>
        { children }
    </div>
  )
}

export default App;
