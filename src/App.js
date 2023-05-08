import React from 'react';

import './App.css';
import Field from './Field';
import logo from './assets/logo.png';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt='Eurovision Bingo' title='Eurovision Bingo' className='App-logo' />
      </header>

      <Field />
    </div>
  );
}

export default App;
