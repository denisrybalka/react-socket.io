const reducer = (state, action) => {
  switch (action.type) {
    case "JOINED":
      return {
        ...state,
        joined: true,
        username: action.payload.username,
        roomId: action.payload.roomId,
      };
    case "SET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "SET_DATA": // all prev messages in room
      return {
        ...state,
        users: action.payload.users,
        messages: action.payload.messages,
      };
    case "NEW_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
};

export default reducer;
