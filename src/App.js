import React, { Component } from 'react'
import { initWallet } from './wallet/index'
import logo from './cube-vector.png'
import ConnectSocketForm from './components/ConnectSocketForm'
import ConnectServerForm from './components/ConnectServerForm'
import BlockView from './components/BlockView'
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      socketFormVisible: true,
      serverFormVisible: true,
    }
    this.hideServerForm = this.hideServerForm.bind(this);
    this.hideSocketForm = this.hideSocketForm.bind(this);
  }

  hideServerForm() {
    this.setState({ serverFormVisible: false });
  }

  hideSocketForm() {
    this.setState({ socketFormVisible: false });
  }

  componentDidMount() {
    initWallet(privateKeyLocation);
  }

  render() {
    const { socketFormVisible, serverFormVisible } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to blockwallet!</h1>
        </header>
        <div>
          {socketFormVisible &&
            <ConnectSocketForm
              hide={this.hideSocketForm}
            />}

          {serverFormVisible &&
            <ConnectServerForm
              hide={this.hideServerForm}
            />}
        </div>
        <BlockView />
      </div>
    );
  }
}

export default App;
