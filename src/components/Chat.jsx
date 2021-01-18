import React, { useState, useRef, useEffect } from "react";
import socket from "../socket";

const Chat = ({ users, messages, username, roomId, onAddMessage }) => {
  const [message, setMessage] = useState("");
  const messageRef = useRef(null);

  const handleMessageSent = (e) => {
    e.preventDefault();
    socket.emit("ROOM:NEW_MESSAGE", { username, text: message, roomId });
    onAddMessage({ username, text: message });
    setMessage("");
  };

  useEffect(() => {
    messageRef.current.scrollTo(0, 9999);
  }, [messages])

  return (
    <div className="container">
      <div className="users">
        <p>Room: {roomId}</p>
        <p>{`Online(${users.length}):`}</p>
        <ul className="users-list">
          {users.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      </div>
      <div>
        <div className="messages" 
              ref={messageRef}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={msg.username === username ? "my-message" : "message"}
              >
              {msg.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleMessageSent}>
          <input
            type="text"
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
