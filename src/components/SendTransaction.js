import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Label } from 'semantic-ui-react'
import { postTransaction } from '../store'

class SendTransaction extends Component {
  constructor() {
    super();
    this.state = {
      recipient: '',
      amount: '',
    }
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    const { recipient, amount } = this.state;
    const { serverNetwork } = this.props;
    this.props.postTransaction(serverNetwork, recipient, Number(amount));
    this.setState({ recipient: '', amount: 0 });
  }

  handleChange(evt) {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  }

  render() {
    const { recipient, amount } = this.state;

    return (
      <div className="connect-form">
        <Form onSubmit={this.handleSubmit.bind(this)}>
            <Label>Recipient</Label>
            <Input
              type="text"
              placeholder="0x66ca3d...e34"
              name="recipient"
              onChange={this.handleChange.bind(this)}
              value={recipient}
            />
            <Label>Amount</Label>
            <Input
              type="text"
              placeholder="5.40"
              name="amount"
              onChange={this.handleChange.bind(this)}
              value={amount}
            />

          <button className="ui primary button connect-button">
            Send Transaction
          </button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  recipient: state.transactions.recipient,
  amount: state.transactions.amount,
  serverNetwork: state.networks.serverNetwork,
})

const mapDispatchToProps = dispatch => ({
  postTransaction: (network, recipient, amount) => dispatch(postTransaction(network, recipient, amount)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SendTransaction)
