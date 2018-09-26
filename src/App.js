import React, { Component } from 'react'
import { initWallet } from './wallet/index'
import logo from './cube-vector.png'
import ConnectForm from './components/ConnectForm'
import BlockView from './components/BlockView'
import './App.css';
const privateKeyLocation = 'wallet/private_key.txt';

class App extends Component {

  componentDidMount() {
    initWallet(privateKeyLocation);
  }

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
