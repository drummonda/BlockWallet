import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Card } from 'semantic-ui-react'
import Block from './Block'
import './BlockView.css'

class Chain extends Component {

  render() {
    const { blockchain } = this.props;

    return (
      <div id='blockchain'>
        <h3>Block Explorer: </h3>
        {blockchain.length ?
          <Card.Group>
            {blockchain.map(block => (
              <Block key={block.index} block={block} />
            ))}
          </Card.Group>
        :
          <p>
            No blockchain found, try connecting to a network
          </p>}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  blockchain: state.blockchain
});

export default connect(mapStateToProps, null)(Chain);
