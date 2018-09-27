import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Label } from 'semantic-ui-react'
import { setRecipient, setAmount } from '../store'

class SendTransaction extends Component {
  constructor() {
    super();
    this.state = {
      recipient: '',
      amount: 0,
    }
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    const { recipient, amount } = this.state;

  }

  handleChange(evt) {
    const { name, value } = evt.target;
    this.setState({ this.state[name]: value });
  }

  render() {
    const { recipient, amount } = this.state;

    return (
      <div className="connect-form">
        <Form onSubmit={this.handleSubmit.bind(this)}>
            <Label>Recipient</Label>
            <Input
              type="text"
              placeholder="0x66ca3d129692689c23eeafd566a08f58128ede34"
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
            Connect to a server
          </button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  recipient: state.transactions.recipient,
  amount: state.transactions.amount,
})

const mapDispatchToProps = dispatch => ({
  setAmount: amount => dispatch(setAmount(amount)),
  setRecipient: recipient => dispatch(setRecipient(recipient))
})

export default connect(mapStateToProps, mapDispatchToProps)(ConnectForm)
