import { createStore, compose } from 'redux';
import rootReducer              from './reducers';

export default function configureStore(initialState) {
  const store = compose(
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  )(createStore)(rootReducer, initialState);

  return store;
}
