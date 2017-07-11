export const CREATE = 'stock/CREATE';
export const UPDATE_ITEM = 'stock/UPDATE_ITEM';
export const UPDATE_EVENT = 'stock/UPDATE_EVENT';
export const DELETE = 'stock/DELETE';
export const CREATE_ID_PHOTO = 'stock/CREATE_ID_PHOTO';
export const DELETE_ID_PHOTO = 'stock/DELETE_ID_PHOTO';
export const CREATE_SCAN_PHOTO = 'stock/CREATE_SCAN_PHOTO';
export const DELETE_SCAN_PHOTO = 'stock/DELETE_SCAN_PHOTO';
export const ITEM_FORM_SHOW = 'stock/ITEM_FORM_SHOW';
export const ITEM_FORM_HIDE = 'stock/ITEM_FORM_HIDE';
export const EVENT_FORM_SHOW = 'stock/EVENT_FORM_SHOW';
export const EVENT_FORM_HIDE = 'stock/EVENT_FORM_HIDE';
export const DELETE_CONFIRM = 'stock/DELETE_CONFIRM';
export const DELETE_CANCEL = 'stock/DELETE_CANCEL';
export const ID_PHOTO_FORM_SHOW = 'stock/ID_PHOTO_FORM_SHOW';
export const ID_PHOTO_FORM_HIDE = 'stock/ID_PHOTO_FORM_HIDE';
export const ID_PHOTO_DELETE_CONFIRM = 'stock/ID_PHOTO_DELETE_CONFIRM';
export const ID_PHOTO_DELETE_CANCEL = 'stock/ID_PHOTO_DELETE_CANCEL';
export const SCAN_PHOTO_FORM_SHOW = 'stock/SCAN_PHOTO_FORM_SHOW';
export const SCAN_PHOTO_FORM_HIDE = 'stock/SCAN_PHOTO_FORM_HIDE';
export const SCAN_PHOTO_DELETE_CONFIRM = 'stock/SCAN_PHOTO_DELETE_CONFIRM';
export const SCAN_PHOTO_DELETE_CANCEL = 'stock/SCAN_PHOTO_DELETE_CANCEL';

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

export function updateStockEvent(eventTag) {
  return {
    type: UPDATE_EVENT,
    payload: {
      eventTag,
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

export function createIdPhoto(photo) {
  return {
    type: CREATE_ID_PHOTO,
    payload: {
      photo,
      timestamp: Date.now(),
    },
  };
}

export function deleteIdPhoto() {
  return {
    type: DELETE_ID_PHOTO,
    payload: {
      timestamp: Date.now(),
    },
  };
}

export function createScanPhoto(photo) {
  return {
    type: CREATE_SCAN_PHOTO,
    payload: {
      photo,
      timestamp: Date.now(),
    },
  };
}

export function deleteScanPhoto() {
  return {
    type: DELETE_SCAN_PHOTO,
    payload: {
      timestamp: Date.now(),
    },
  };
}

export function showStockItemForm(code) {
  return {
    type: ITEM_FORM_SHOW,
    payload: code,
  };
}

export function hideStockItemForm() {
  return {
    type: ITEM_FORM_HIDE,
  };
}

export function showStockEventForm(code) {
  return {
    type: EVENT_FORM_SHOW,
    payload: code,
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

export function showIdPhotoForm(code) {
  return {
    type: ID_PHOTO_FORM_SHOW,
    payload: code,
  };
}

export function hideIdPhotoForm() {
  return {
    type: ID_PHOTO_FORM_HIDE,
  };
}

export function confirmIdPhotoDelete(code, photoId) {
  return {
    type: ID_PHOTO_DELETE_CONFIRM,
    payload: {
      code,
      photoId,
    },
  };
}

export function cancelIdPhotoDelete() {
  return {
    type: ID_PHOTO_DELETE_CANCEL,
  };
}

export function showScanPhotoForm(code) {
  return {
    type: SCAN_PHOTO_FORM_SHOW,
    payload: code,
  };
}

export function hideScanPhotoForm() {
  return {
    type: SCAN_PHOTO_FORM_HIDE,
  };
}

export function confirmScanPhotoDelete(code, photoId) {
  return {
    type: SCAN_PHOTO_DELETE_CONFIRM,
    payload: {
      code,
      photoId,
    },
  };
}

export function cancelScanPhotoDelete() {
  return {
    type: SCAN_PHOTO_DELETE_CANCEL,
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
           photoId: '1',
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

  // model
  openingModel: null,
  relatedStockCode: null,
  relatedPhotoId: null,
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

export function isShowingItemForm(state) {
  return state.openingModel === 'ITEM';
}

export function isShowingEventForm(state) {
  return state.openingModel === 'EVENT';
}

export function isConfirmingDelete(state) {
  return state.openingModel === 'DELETE';
}

export function isShowingIdPhotoForm(state) {
  return state.openingModel === 'ID_PHOTO';
}

export function isShowingScanPhotoForm(state) {
  return state.openingModel === 'SCAN_PHOTO';
}

export function isConfirmingDeleteIdPhoto(state) {
  return state.openingModel === 'ID_PHOTO_DELETE';
}

export function isConfirmingDeleteScanPhoto(state) {
  return state.openingModel === 'SCAN_PHOTO_DELETE';
}

export function getDeletingStockCode(state) {
  if (!isConfirmingDelete(state)) {
    return null;
  }

  return state.relatedStockCode;
}

export function getItemFormCode(state) {
  if (!isShowingItemForm(state)) {
    return null;
  }

  return state.relatedStockCode;
}

export function getEventFormCode(state) {
  if (!isShowingEventForm(state)) {
    return null;
  }

  return state.relatedStockCode;
}

export function getStockByCode(state) {
  return state.stockByCode;
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE: {
      const { stock } = action.payload;
      const stockByCode = {
        ...state.stockByCode,
        [stock.code]: stock
      };

      return {
        ...state,
        stockByCode,
        openingModel: initialState.openingModel,
      };
    }
    case UPDATE_ITEM: {
      const { stock } = action.payload;
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
        openingModel: initialState.openingModel,
        relatedStockCode: initialState.relatedStockCode,
      };
    }
    case UPDATE_EVENT: {
      const { eventTag } = action.payload;
      const stockByCode = {
        ...state.stockByCode,
        [state.relatedStockCode]: {
          ...state.stockByCode[state.relatedStockCode],
          ...eventTag,
        },
      };

      return {
        ...state,
        stockByCode,
        openingModel: initialState.openingModel,
        relatedStockCode: initialState.relatedStockCode,
      };
    }
    case DELETE: {
      const stockByCode = Object
        .keys(state.stockByCode)
        .filter(key => key !== state.relatedStockCode)
        .reduce((result, code) => ({
          ...result,
          [code]: state.stockByCode[code],
        }), {});

      return {
        ...state,
        stockByCode,
        openingModel: initialState.openingModel,
        relatedStockCode: initialState.relatedStockCode,
      };
    }
    case CREATE_ID_PHOTO: {
      const { photo, timestamp } = action.payload;
      const stock = state.stockByCode[state.relatedStockCode];
      const stockByCode = {
        ...state.stockByCode,
        [stock.code]: {
          ...stock,
          photos: (stock.photos || []).concat({ ...photo, photoId: timestamp }),
        },
      };

      return {
        ...state,
        stockByCode,
        openingModel: initialState.openingModel,
        relatedStockCode: initialState.relatedStockCode,
      };
    }
    case DELETE_ID_PHOTO: {
      const photoId = state.relatedPhotoId;
      const stock = state.stockByCode[state.relatedStockCode];
      const stockByCode = {
        ...state.stockByCode,
        [stock.code]: {
          ...stock,
          photos: (stock.photos || []).filter(photo => photo.photoId !== photoId),
        },
      };

      return {
        ...state,
        stockByCode,
        openingModel: initialState.openingModel,
        relatedStockCode: initialState.relatedStockCode,
      };
    }
    case CREATE_SCAN_PHOTO: {
      const { photo, timestamp } = action.payload;
      const stock = state.stockByCode[state.relatedStockCode];
      const stockByCode = {
        ...state.stockByCode,
        [stock.code]: {
          ...stock,
          scannedImages: (stock.scannedImages || []).concat({ ...photo, photoId: timestamp }),
        },
      };

      return {
        ...state,
        stockByCode,
        openingModel: initialState.openingModel,
        relatedStockCode: initialState.relatedStockCode,
      };
    }
    case DELETE_SCAN_PHOTO: {
      const photoId = state.relatedPhotoId;
      const stock = state.stockByCode[state.relatedStockCode];
      const stockByCode = {
        ...state.stockByCode,
        [stock.code]: {
          ...stock,
          scannedImages: (stock.scannedImages || []).filter(scannedImage => scannedImage.photoId !== photoId),
        },
      };

      return {
        ...state,
        stockByCode,
        openingModel: initialState.openingModel,
        relatedStockCode: initialState.relatedStockCode,
      };
    }
    case ITEM_FORM_SHOW: {
      return {
        ...state,
        openingModel: 'ITEM',
        relatedStockCode: action.payload || state.relatedStockCode
      };
    }
    case EVENT_FORM_SHOW: {
      return {
        ...state,
        openingModel: 'EVENT',
        relatedStockCode: action.payload,
      };
    }
    case ID_PHOTO_FORM_SHOW: {
      return {
        ...state,
        openingModel: 'ID_PHOTO',
        relatedStockCode: action.payload,
      };
    }
    case SCAN_PHOTO_FORM_SHOW: {
      return {
        ...state,
        openingModel: 'SCAN_PHOTO',
        relatedStockCode: action.payload,
      };
    }
    case DELETE_CONFIRM: {
      return {
        ...state,
        openingModel: 'DELETE',
        relatedStockCode: action.payload,
      };
    }
    case ID_PHOTO_DELETE_CONFIRM: {
      return {
        ...state,
        openingModel: 'ID_PHOTO_DELETE',
        relatedStockCode: action.payload.code,
        relatedPhotoId: action.payload.photoId,
      };
    }
    case SCAN_PHOTO_DELETE_CONFIRM: {
      return {
        ...state,
        openingModel: 'SCAN_PHOTO_DELETE',
        relatedStockCode: action.payload.code,
        relatedPhotoId: action.payload.photoId,
      };
    }
    case ITEM_FORM_HIDE:
    case EVENT_FORM_HIDE:
    case ID_PHOTO_FORM_HIDE:
    case SCAN_PHOTO_FORM_HIDE:
    case DELETE_CANCEL: {
      return {
        ...state,
        openingModel: initialState.openingModel,
        relatedStockCode: initialState.relatedStockCode,
      };
    }
    case ID_PHOTO_DELETE_CANCEL:
    case SCAN_PHOTO_DELETE_CANCEL: {
      return {
        ...state,
        openingModel: initialState.openingModel,
        relatedStockCode: initialState.relatedStockCode,
        relatedPhotoId: initialState.relatedPhotoId,
      };
    }
    default:
      return state;
  }
};
