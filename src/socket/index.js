import { setBlockChain } from '../store'

export default function initSocket(network) {
  const socket = new WebSocket(network);
  socket.onopen = () => {
    console.log('connected!');
  };
  socket.onmessage = (msg) => {
    const message = JSON.parse(msg.data);
    console.log('received a message', message);
    // setBlockChain(msg)
  };
}

