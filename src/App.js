import React, { useReducer } from 'react';
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

  console.log(state);
  return <div>{!state.joined ? <JoinBlock onLogin={onLogin} /> : null}</div>;
}

export default App;
