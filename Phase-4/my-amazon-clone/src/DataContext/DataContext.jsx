import React, { createContext, useReducer, useContext } from 'react';

// 1. Context መፍጠር
export const DataContext = createContext();

// 2. DataProvider Component
export const DataProvider = ({ reducer, initialState, children }) => {
  return (
    <DataContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </DataContext.Provider>
  );
};

// 3. Custom Hook - በየ Component ውስጥ ዳታውን ለማንበብና ለማዘመን
export const useDataValue = () => useContext(DataContext);