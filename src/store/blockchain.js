import axios from 'axios'

/**
 * ACTION TYPES
 */
export const SET_BLOCKCHAIN = 'SET_BLOCKCHAIN';

/**
 * INITIAL STATE
 */
const defaultBlockchain = [];

/**
 * ACTION CREATORS
 */

export const setBlockchain = blockchain => ({
  type: SET_BLOCKCHAIN,
  blockchain
})

/**
 * REDUCER
 */
export default function(state = defaultBlockchain, action) {
  switch (action.type) {

    case SET_BLOCKCHAIN:
      return action.blockchain;

    default:
      return state;

  }
}
