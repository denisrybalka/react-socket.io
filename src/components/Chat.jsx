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
  }, [messages]);

  return (
    <div className="container">
      <div className="users">
        <p>Комната: {roomId}</p>
        <p>{`Онлайн (${users.length}):`}</p>
        <ul className="users-list">
          {users.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      </div>
      <div>
        <div className="messages" ref={messageRef}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className="message"
              style={{ alignSelf: msg.username === username && "flex-end" }}
            >
              <div
                className="text"
                style={{
                  backgroundColor:
                    msg.username === username ? "lightsalmon" : "lightblue",
                }}
              >
                {msg.text}
              </div>
              <div className="username">{msg.username}</div>
            </div>
          ))}
        </div>
        <form className="message-form" onSubmit={handleMessageSent}>
          <input
            type="text"
            placeholder="Сообщение"
            required
            minLength={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button>Отправить</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
