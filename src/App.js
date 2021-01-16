import React, { useReducer } from 'react';
import JoinBlock from './components/JoinBlock';
import reducer from './reducer'

function App() {

  const [state, dispatch] = useReducer(reducer, {
    isAuth: false,
  });

  const onLogin = () => {
    dispatch({
      type: "IS_AUTH",
      payload: true,
    })
  }

return <div>{!state.isAuth ? <JoinBlock onLogin={onLogin} /> : null}</div>;
}

export default App;
