const reducer = (
  state = {
    name: null,
    names: [],
    messages: [],
    submitted: false,
    fromMe: false
  },
  action
) => {
  switch (action.type) {
    case 'SEND_MESSAGE_SERVER' :
      state = {
        ...state,
        fromMe: action.fromMe,
        messages: state.messages.concat({username:action.name,
          message:action.message,
          fromMe: action.fromMe})
      };
    break;
    case 'MEESAGE_FROM_SERVER' :
      state = {
        ...state,
        fromMe: action.fromMe,
        messages: state.messages.concat({username:action.username,
          message:action.message,
          fromMe: action.fromMe})
      };
    break;
    case 'SET_USER':
      state = { ...state, name: action.username, submitted: action.submitted };
      break;
    case 'PUT_ALL_NAMES_TO_REDUCER':
      state = { ...state, names: action.names };
      break;
    default:
      break;
  }

  return state;
};

export default reducer;
