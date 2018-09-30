import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { setServer, fetchBalance } from '../store'
import './ConnectForm.css'

class ConnectForm extends Component {
  constructor() {
    super();
    this.state = {
      visible: true,
      network: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleClick(evt) {
    evt.preventDefault();
    const { network } = this.state;
    const server = `http://${network}`;
    this.setState({ network: '' });
    this.props.setServer(server);
    this.props.fetchBalance(server);
    this.props.hide();
  }

  handleChange(evt) {
    const { value } = evt.target;
    this.setState({ network: value });
  }

  render() {
    return (
      <div className="connect-form">
        <form onSubmit={this.handleClick}>
          <div className="ui labeled input">
            <div className="ui label">
              http://
            </div>
            <input
              type="text"
              placeholder="172.16.22.50:8080"
              name="network"
              onChange={this.handleChange}
              value={this.state.network}
            />
          </div>

          <Button inverted color='blue'>
            Connect to a server
          </Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  blockchain: state.blockchain,
})

const mapDispatchToProps = dispatch => ({
  setServer: server => dispatch(setServer(server)),
  fetchBalance: server => dispatch(fetchBalance(server))
})

export default connect(mapStateToProps, mapDispatchToProps)(ConnectForm)
