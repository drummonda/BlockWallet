import axios from 'axios'
import { getPrivateFromWallet, getPublicFromWallet, signTxIn } from '../wallet'

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
  transactions: [];
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
export const postTransaction = dispatch => async (network, recipient, transaction) => {
  const privateKey = getPrivateFromWallet();
  const publicKey = getPublicFromWallet();
  const transactionDetails = {
    receiverAddress: recipient,
    senderAddress: publicKey,
    amount: transaction
  }
  const resp = await axios.post(`${network}/api/blockchain/proposeTransaction`, transactionDetails);
  const tx = resp.data;
  tx.txIns = tx.txIns.map((txIn, index) => {
    txIn.signature = signTxIn(tx, index, privateKey);
    return txIn;
  });
  const txToAdd = await axios.post(`${network}/api/blockchain/signedTransaction`, { tx });
  dispatch(addTransaction(txToAdd));
}

export const getBalance = dispatch => async network => {
  const publicKey = getPublicFromWallet();
  const { data } = await axios.get(`${network}/api/blockchain`, {
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
      return {...state, transactions: [...state.transations, action.transaction]};

    case GET_BALANCE:
      return {...state, balance: action.balance};

    default:
      return state;

  }
}
