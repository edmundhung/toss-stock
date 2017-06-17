import { combineReducers } from 'redux';
import stock, * as stockModule from './stock';
import history from './history';

const reducer = combineReducers({
  stock,
  history,
});

export const getHistory = state => state.history;
export const getStocks = state => stockModule.getStocks(state.stock);
export const getNextStockCode = state => stockModule.getNextStockCode(state.stock);
export const getDeletingStockCode = state => stockModule.getDeletingStockCode(state.stock);
export const isShowingStockItemForm = state => stockModule.isShowingItemForm(state.stock);
export const isConfirmingStockDelete = state => stockModule.isConfirmingDelete(state.stock);

export default reducer;
