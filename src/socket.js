import io from "socket.io-client"

const socket = io("https://react-socketio-chat-server.herokuapp.com");

export default socket;