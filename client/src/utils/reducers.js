import { useReducer } from 'react';

import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  ADD_TO_CART,
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  TOGGLE_CART
} from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    // if action type value is the value of UPDATE_PRODUCTS, return a new state obj
    //with an updated products array
    case UPDATE_PRODUCTS:
      return {
        // return a new obj with a copy of the state arg and set products key to a value
        //of a new array with the action.products value spread across it
        ...state,
        products: [...action.products],
      };
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories]
      };
    case UPDATE_CURRENT_CATEGORY:
      return {
        //...state preserves everything else on state
        ...state,
        currentCategory: action.currentCategory
      };
    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product]
      };
    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };
    case REMOVE_FROM_CART:
      let newState = state.cart.filter(product => {
        return product._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState
      };
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        // map is used because the original state should be treated as immutable
        cart: state.cart.map(product => {
          if (action._id === product._id) {
            product.purchaseQuantity = action.purchaseQuantity;
          }
          return product;
        })
      };
    case CLEAR_CART:
      return {
        ...state, 
        cartOpen: false, 
        cart: []
      };
    case TOGGLE_CART:
      return {
        ...state, 
        cartOpen: !state.cartOpen
      };
    // if it's none of these actions, do not update state at all and keep all the same
    default:
      return state;
  }
};

// takes in the state and updates it via reducer()
export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}