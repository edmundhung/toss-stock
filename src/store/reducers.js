import { combineReducers } from 'redux';
import session, * as sessionModule from './session';
import stock, * as stockModule from './stock';
import history from './history';

const reducer = combineReducers({
  session,
  stock,
  history,
});

export const getUser = state => sessionModule.getUser(state.session);
export const isLoggedIn = state => sessionModule.isLoggedIn(state.session);
export const isLoggingIn = state => sessionModule.isLoggingIn(state.session);
export const isAdmin = state => sessionModule.isAdmin(state.session);
export const loginError = state => sessionModule.loginError(state.session);
export const getHistory = state => state.history;
export const getStocks = state => stockModule.getStocks(state.stock);
export const getNextStockCode = state => stockModule.getNextStockCode(state.stock);
export const getItemFormCode = state => stockModule.getItemFormCode(state.stock);
export const getEventFormCode = state => stockModule.getEventFormCode(state.stock);
export const getDeletingStockCode = state => stockModule.getDeletingStockCode(state.stock);
export const isShowingStockItemForm = state => stockModule.isShowingItemForm(state.stock);
export const isShowingStockEventForm = state => stockModule.isShowingEventForm(state.stock);
export const isConfirmingStockDelete = state => stockModule.isConfirmingDelete(state.stock);
export const getStockByCode = state => stockModule.getStockByCode(state.stock);
export const isShowingIdPhotoForm = state => stockModule.isShowingIdPhotoForm(state.stock);
export const isShowingScanPhotoForm = state => stockModule.isShowingScanPhotoForm(state.stock);
export const isConfirmingDeleteIdPhoto = state => stockModule.isConfirmingDeleteIdPhoto(state.stock);
export const isConfirmingDeleteScanPhoto = state => stockModule.isConfirmingDeleteScanPhoto(state.stock);
export default reducer;
