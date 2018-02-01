import * as types from '../constants/ActionTypes';

const initialState = [{
    id: 1,
    name: 'Bananas',
    price: 12,
    starred: true
  },
  {
    id: 2,
    name: 'Lemons',
    price: 10,
    starred: false
  },
  {
    id: 3,
    name: 'Red Seedless crapes',
    price: 8,
    starred: false
  },
  {
    id: 4,
    name: 'Avocados',
    price: 20,
    starred: false
  }
];

export default function products(state = initialState, action) {
  switch (action.type) {
    case types.STAR_PRODUCT:
      let products = [...state];
      let productIndex = products.findIndex(({id}) => id === action.productId);
      products[productIndex].starred = !products[productIndex].starred;

      return products;

    default:
      return state;
  }
}