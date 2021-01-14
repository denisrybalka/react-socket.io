import React from 'react';
import socket from './socket'

function App() {
  return (
    <div className="App">
      <input type="text" placeholder="Room ID" value="" />
      <input type="text" placeholder="Username" value="" />
      <button>ENTER</button>
    </div>
  );
}

export default App;
