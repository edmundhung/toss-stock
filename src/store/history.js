import {
  CREATE as CREATE_STOCK,
  UPDATE_ITEM as UPDATE_STOCK_ITEM,
  DELETE as DELETE_STOCK,
} from './stock';

export const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_STOCK:
    case UPDATE_STOCK_ITEM: {
      const {
        type,
        payload: { stock, timestamp },
      } = action;

      return state.concat({ type, code: stock.code, timestamp });
    }
    case DELETE_STOCK: {
      const {
        type,
        payload: { code, timestamp },
      } = action;

      return state.concat({ type, code, timestamp });
    }
    default:
      return state;
  }
};
