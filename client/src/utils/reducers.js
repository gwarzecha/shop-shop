import { useReducer } from 'react';

import {
  UPDATE_PRODUCTS,
  UPDATE_CURRENT_CATEGORY,
  UPDATE_CATEGORIES
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
        ...state,
        currentCategory: action.currentCategory
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