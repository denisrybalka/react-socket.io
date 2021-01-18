import React, { useReducer, useEffect } from 'react';
import Chat from './components/Chat';
import JoinBlock from './components/JoinBlock';
import reducer from './reducer'
import socket from './socket'

function App() {

  const [state, dispatch] = useReducer(reducer, {
    joined: false,
    roomId: null,
    username: "",
  });

  const onLogin = (user) => {
    dispatch({
      type: "JOINED",
      payload: user,
    })

    socket.emit('ROOM:JOIN', user);
  }

  useEffect(() => {
    socket.on("ROOM:JOINED", (users) => {
      console.log(users);
    })
  }, []);

  console.log(state);
  return <div>{!state.joined ? <JoinBlock onLogin={onLogin} /> : <Chat/>}</div>;
}

export default App;
