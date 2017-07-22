import * as firebase from 'firebase';

export function middleware(store) {
  return next => action => {
    return next(action);
  };
}
