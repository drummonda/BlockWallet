import axios from 'axios'

/**
 * ACTION TYPES
 */
export const SET_SOCKET_NETWORK = 'SET_SOCKET_NETWORK';
export const SET_SERVER_NETWORK = 'SET_SERVER_NETWORK';

/**
 * INITIAL STATE
 */
const defaultNetworks = {
  socketNetwork: '',
  serverNetwork: '',
};

/**
 * ACTION CREATORS
 */
export const setSocket = socket => ({
  type: SET_SOCKET_NETWORK,
  socket
});

export const setServer = server => ({
  type: SET_SERVER_NETWORK,
  server
});

/**
 * REDUCER
 */
export default function(state = defaultNetworks, action) {
  switch (action.type) {

    case SET_SOCKET_NETWORK:
      return {...state, socketNetwork: action.socket};

    case SET_SERVER_NETWORK:
      return {...state, serverNetwork: action.server};

    default:
      return state;

  }
}
