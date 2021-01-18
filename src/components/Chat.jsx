import React from "react";

const Chat = () => {
  return (
    <div className="container">
      <div className="users">
        <p>Users</p>
        <div className="user">Test user</div>
      </div>
      <div>
        <div className="messages">
          <p className="message">Hello</p>
          <p className="message">Hello 2</p>
        </div>
        <form>
          <input type="text" placeholder="Your message" />
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
