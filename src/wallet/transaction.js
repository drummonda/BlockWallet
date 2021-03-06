import CryptoJS from 'crypto-js'
import ecdsa from 'elliptic'
import _ from 'lodash'

const ec = new ecdsa.ec('secp256k1');

/*
TRANSACTION CLASS DECLARATIONS
*/
export class TxOut {
  constructor(address, amount) {
    this.address = address;
    this.amount = amount;
  }
}

export class TxIn {
  constructor() {
    this.txOutId = null;
    this.txOutIndex = null;
    this.signature = null;
  }
}

export class Transaction {
  constructor() {
    this.id = null;
    this.txIns = [];
    this.txOuts = [];
  }
}

/*
HELPER METHODS
*/
export function getTransactionId(transaction) {
  const txInContent = transaction.txIns
    .map(txIn => txIn.txOutId + txIn.txOutIndex)
    .reduce((a, b) => a + b, '');

  const txOutContent = transaction.txOuts
    .map(txOut => txOut.address + txOut.amount)
    .reduce((a, b) => a + b, '');

  return CryptoJS.SHA256(txInContent + txOutContent).toString();
}

export function findUnspentTxOut(transactionId, index, aUnspentTxOuts) {
  return aUnspentTxOuts.find(uTxO => uTxO.txOutId === transactionId && uTxO.txOutIndex === index);
}

export function signTxIn(transaction, txInIndex, privateKey) {
  const txIn = transaction.txIns[txInIndex];
  const dataToSign = transaction.id;
  const key = ec.keyFromPrivate(privateKey, 'hex');
  const signature = toHexString(key.sign(dataToSign).toDER());
  return signature;
}


export function toHexString(byteArray) {
  return Array.from(byteArray, byte => {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('');
}

export function getPublicKey(aPrivateKey) {
  return ec.keyFromPrivate(aPrivateKey, 'hex').getPublic().encode('hex');
}




