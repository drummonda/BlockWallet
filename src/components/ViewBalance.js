import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Statistic, Button } from 'semantic-ui-react'
import { fetchBalance } from '../store'
import './ViewBalance.css'

class ViewBalance extends Component {

  handleRefresh() {
    const { server } = this.props;
    this.props.fetchBalance(server);
  }

  render() {
    const { balance } = this.props;

    return (
      <div id='balance'>
        <Statistic horizontal>
          <Statistic.Value>{balance}</Statistic.Value>
          <Statistic.Label>My balance</Statistic.Label>
        </Statistic>
        <Button onClick={this.handleRefresh.bind(this)}>Refresh</Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  balance: state.transactions.balance,
  server: state.networks.serverNetwork
});

const mapDispatchToProps = dispatch => ({
  fetchBalance: network => dispatch(fetchBalance(network))
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewBalance);
