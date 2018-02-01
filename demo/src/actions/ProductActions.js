import * as types from '../constants/ActionTypes';

export const purchaseProduct = (productId, name, price) => {
  return {
    type: types.PURCHASE_PRODUCT,
    data: {
      productId,
      name,
      price
    }
  };
};

export const starProduct = productId => {
  return {
    type: types.STAR_PRODUCT,
    productId
  };
};
