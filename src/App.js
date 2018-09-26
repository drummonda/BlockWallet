import React, { Component } from 'react'
import logo from './cube-vector.png'
import ConnectForm from './components/ConnectForm'
import BlockView from './components/BlockView'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to blockwallet!</h1>
        </header>
        <ConnectForm />
        <BlockView />
      </div>
    );
  }
}

export default App;
