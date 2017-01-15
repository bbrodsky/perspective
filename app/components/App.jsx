import React, { Component } from 'react';
import Navbar from './Navbar'

const App = props => {
  const { children } = props;

  return (
    <div>
      <Navbar/>
        { children }
    </div>
  )
}

export default App;
