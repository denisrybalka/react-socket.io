import React from 'react';
import io from 'socket.io-client'

function App() {
  const socketConnect = () => {
    io("http://localhost:9999");
  }

  return (
    <div className="App">
      <button onClick={socketConnect}>Connect</button>
    </div>
  );
}

export default App;
