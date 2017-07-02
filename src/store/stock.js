export const CREATE = 'stock/CREATE';
export const UPDATE_ITEM = 'stock/UPDATE_ITEM';
export const DELETE = 'stock/DELETE';
export const ITEM_FORM_SHOW = 'stock/ITEM_FORM_SHOW';
export const ITEM_FORM_HIDE = 'stock/ITEM_FORM_HIDE';
export const EVENT_FORM_SHOW = 'stock/EVENT_FORM_SHOW';
export const EVENT_FORM_HIDE = 'stock/EVENT_FORM_HIDE';
export const DELETE_CONFIRM = 'stock/DELETE_CONFIRM';
export const DELETE_CANCEL = 'stock/DELETE_CANCEL';

export function createStock(stock) {
  return {
    type: CREATE,
    payload: {
      stock,
      timestamp: Date.now(),
    },
  };
}

export function updateStockItem(stock) {
  return {
    type: UPDATE_ITEM,
    payload: {
      stock,
      timestamp: Date.now(),
    },
  };
}

export function deleteStock(code) {
  return {
    type: DELETE,
    payload: {
      code,
      timestamp: Date.now(),
    },
  };
}

export function showStockItemForm() {
  return {
    type: ITEM_FORM_SHOW,
  };
}

export function hideStockItemForm() {
  return {
    type: ITEM_FORM_HIDE,
  };
}

export function showStockEventForm() {
  return {
    type: EVENT_FORM_SHOW,
  };
}

export function hideStockEventForm() {
  return {
    type: EVENT_FORM_HIDE,
  };
}

export function confirmStockDelete(code) {
  return {
    type: DELETE_CONFIRM,
    payload: code,
  };
}

export function cancelStockDelete() {
  return {
    type: DELETE_CANCEL,
  };
}

export const initialState = {
  stockByCode: {
    '00001': {
       code: '00001',
       receivedDate: '2016-04-23',
       description: 'World Book Day',
       donor: 'Library team',
       condition: 'Good',
       location: 'Library',
       category: 'LB',
       classificationNum: 'LB0001',
       photos: [
         {
           photoId: '1',
           name: '1',
           length: 35,
           width: 12,
           height: 13
         },
         {
           photoId: '2',
           name: '2',
           length: 35,
           width: 12,
           height: 13
         },
       ],
       scannedImages: [
         {
           scannedImageId: '1',
           name: '1',
           length: 35,
           width: 12,
           height: 13
         },
       ],
       sign: 'Checked',
       remarks: 'Borrowed to F.1 classes',
       eventNames: [
         'World Book Day',
         '2016',
       ],
       eventDates: [
         '22/04/2016',
         '23/04/2016',
         '24/04/2016',
       ],
       eventLocations: [
         'Library',
       ],
       eventPeople: [
         'Ms Sin',
         'Ms Lam',
       ],
    }
  },
  isShowingItemForm: false,
  isShowingEventForm: false,
  deletingStockCode: null,
};

export function getStocks(state) {
  return Object
    .keys(state.stockByCode)
    .map(code => state.stockByCode[code]);
}

export function getNextStockCode(state) {
  const lastStockCode = Object
    .keys(state.stockByCode)
    .map(Number)
    .sort()
    .pop() || 0;

  return (lastStockCode + 1).toString().padStart(5, '0');
}

export function getDeletingStockCode(state) {
  return state.deletingStockCode;
}

export function isShowingItemForm(state) {
  return state.isShowingItemForm;
}

export function isShowingEventForm(state) {
  return state.isShowingEventForm;
}

export function isConfirmingDelete(state) {
  return state.deletingStockCode !== null;
}

export function getStockByCode(state) {
  return state.stockByCode;
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE: {
      const { stock, timestamp } = action.payload;
      const stockByCode = {
        ...state.stockByCode,
        [stock.code]: stock
      };

      return {
        ...state,
        stockByCode,
        isShowingItemForm: false,
      };
    }
    case UPDATE_ITEM: {
      const { stock, timestamp } = action.payload;
      const stockByCode = {
        ...state.stockByCode,
        [stock.code]: {
          ...state.stockByCode[stock.code],
          ...stock,
        },
      };

      return {
        ...state,
        stockByCode,
        isShowingItemForm: false,
      };
    }
    case DELETE: {
      const { code, timestamp } = action.payload;
      const stockByCode = Object
        .keys(state.stockByCode)
        .filter(key => key !== code)
        .reduce((result, code) => ({
          ...result,
          [code]: state.stockByCode[code],
        }), {});

      return {
        ...state,
        stockByCode,
        deletingStockCode: initialState.deletingStockCode,
      };
    }
    case ITEM_FORM_SHOW: {
      return {
        ...state,
        isShowingItemForm: true,
      };
    }
    case ITEM_FORM_HIDE: {
      return {
        ...state,
        isShowingItemForm: false,
      };
    }
    case EVENT_FORM_SHOW: {
      return {
        ...state,
        isShowingEventForm: true,
      };
    }
    case EVENT_FORM_HIDE: {
      return {
        ...state,
        isShowingEventForm: false,
      };
    }
    case DELETE_CONFIRM: {
      return {
        ...state,
        deletingStockCode: action.payload,
      };
    }
    case DELETE_CANCEL: {
      return {
        ...state,
        deletingStockCode: initialState.deletingStockCode,
      };
    }
    default:
      return state;
  }
};
