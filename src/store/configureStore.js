import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from './reducers';
import firebase from './firebase';

export default function configureStore(initialState) {
  const store = compose(
    applyMiddleware(firebase),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  )(createStore)(rootReducer, initialState);

  return store;
}
