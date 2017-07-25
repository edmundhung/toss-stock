export const LOGIN_REQUEST = 'session/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'session/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'session/LOGIN_FAILURE';

export function requestLogin(crediential) {
  return {
    type: LOGIN_REQUEST,
    payload: crediential,
  };
}

export function acceptLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
}

export function rejectLogin(error) {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
}

export function isLoggedIn(state) {
  return state.user !== null;
}

export function getUser(state) {
  return state.user;
}

export function isLoggingIn(state) {
  return state.isLoggingIn;
}

export const initialState = {
  isLoggingIn: false,
  user: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        user: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
      };
    default:
      return state;
  }
}
