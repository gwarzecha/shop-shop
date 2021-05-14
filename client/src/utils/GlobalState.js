// createContext creates container to hold the global state
// useContext is a Hook that allows the state created in createContext to be used
import React, { createContext, useContext } from 'react';
import { useProductReducer } from './reducers';

// In short, the following code creates our own functionality to manage state at a 
//global level and make it available to all of the other components through a 
//special <provider> component

// instantiates the global object
const StoreContext = createContext();
const { Provider } = StoreContext;

// It's important to incl ...props here because StoreProvider is passed in to App.js 
//and everything that is wrapped inside of it are considered its children
const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useProductReducer({
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: '',
  });
  // use this to confirm it works!
  console.log(state);
  // if ...props is not included here, nothing on the page would be rendered
  return <Provider value={[state, dispatch]} {...props} />;
};

// Creates the custom function(Hook) to be used by the components that need the data
const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };