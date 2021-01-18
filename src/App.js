import React, { useReducer, useEffect } from "react";
import axios from 'axios';
import Chat from "./components/Chat";
import JoinBlock from "./components/JoinBlock";
import reducer from "./reducer";
import socket from "./socket";

function App() {
  const [state, dispatch] = useReducer(reducer, {
    joined: false,
    roomId: null,
    username: "",
    users: [],
    messages: [],
  });

  const onLogin = async (user) => {
    dispatch({
      type: "JOINED",
      payload: user,
    });

    socket.emit("ROOM:JOIN", user);
    const { data } = await axios.get(`/rooms/${user.roomId}`);
    dispatch({
      type: "SET_DATA",
      payload: data,
    })
  };

  const setUsers = (users) => {
    dispatch({
      type: "SET_USERS",
      payload: users,
    });
  };

  const addMessage = (message) => {
    dispatch({
      type: "NEW_MESSAGE",
      payload: message
    })
  }

  useEffect(() => {
    socket.on("ROOM:SET_USERS", setUsers);
    socket.on("ROOM:NEW_MESSAGE", addMessage);
  }, []);

  console.log(state);
  return (
    <div>
      {!state.joined ? <JoinBlock onLogin={onLogin} /> : <Chat {...state} onAddMessage={addMessage}/>}
    </div>
  );
}

export default App;
