export const LOGIN_REQUEST = 'session/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'session/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'session/LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'session/LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'session/LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'session/LOGOUT_FAILURE';

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

export function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
  };
}

export function acceptLogout() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

export function rejectLogout(error) {
  return {
    type: LOGOUT_FAILURE,
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
  isLoggingOut: false,
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
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoggingOut: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        isLoggingOut: false,
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        isLoggingOut: false,
      };
    default:
      return state;
  }
}
