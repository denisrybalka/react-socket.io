import React, {useState} from "react";

const Chat = ({users, messages}) => {

    const [message, setMessage] = useState('');

    const handleMessageSent = (e) => {
        e.preventDefault();
        console.log(message);
    }

  return (
    <div className="container">
      <div className="users">
        <p>{`Users online(${users.length})`}</p>
        <ul className="users-list">
          {users.map((name,index) => <li key={index}>{name}</li>)}
        </ul>
      </div>
      <div>
        <div className="messages">
          <p className="message">Hello</p>
          <p className="message">Hello 2</p>
        </div>
        <form onSubmit={handleMessageSent}>
          <input type="text" placeholder="Your message" value={message} onChange={(e) => setMessage(e.target.value)} />
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
