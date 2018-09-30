import axios from 'axios'
import { getPrivateFromWallet, getPublicFromWallet } from '../wallet'
import { signTxIn } from '../wallet/transaction'

/**
 * ACTION TYPES
 */
export const SET_RECIPIENT = 'SET_RECIPIENT';
export const SET_AMOUNT = 'SET_AMOUNT';
export const SEND_TRANSACTION = 'SEND_TRANSACTION';
export const ADD_CONFIRMED_TRANSACTION = 'ADD_CONFIRMED_TRANSACTION';
export const GET_BALANCE = 'GET_BALANCE';

/**
 * INITIAL STATE
 */
const defaultState = {
  transactions: [],
  balance: 0,
};

/**
 * ACTION CREATORS
 */

export const addTransaction = transaction => ({
  type: ADD_CONFIRMED_TRANSACTION,
  transaction
})

export const setBalance = balance => ({
  type: GET_BALANCE,
  balance
})


/**
 * THUNK CREATORS
 */
export const postTransaction = (network, recipient, amount) => async dispatch => {
  const privateKey = getPrivateFromWallet();
  const publicKey = getPublicFromWallet();
  const transactionDetails = {
    receiverAddress: recipient,
    senderAddress: publicKey,
    amount
  }
  const resp = await axios.post(`${network}/api/blockchain/proposeTransaction`, transactionDetails);
  const tx = resp.data;
  tx.txIns = tx.txIns.map((txIn, index) => {
    txIn.signature = signTxIn(tx, index, privateKey);
    return txIn;
  });
  await axios.post(`${network}/api/blockchain/signedTransaction`, { tx });
  dispatch(addTransaction(tx));
}

export const fetchBalance = network => async dispatch => {
  const publicKey = getPublicFromWallet();
  console.log('my public key', publicKey);
  const { data } = await axios.get(`${network}/api/blockchain/balance`, {
    headers: { address: publicKey }
  });
  dispatch(setBalance(data));
}

/**
 * REDUCER
 */
export default function(state = defaultState, action) {
  switch (action.type) {

    case ADD_CONFIRMED_TRANSACTION:
      return {...state, transactions: [...state.transactions, action.transaction]};

    case GET_BALANCE:
      return {...state, balance: action.balance};

    default:
      return state;

  }
}
