const reducer = (state, action) => {
    switch (action.type) {
        case "JOINED":
            return {
                ...state,
                joined: true,
                username: action.payload.username,
                roomId: action.payload.roomId,
            }
        default:
            return state;
    }
}

export default reducer;