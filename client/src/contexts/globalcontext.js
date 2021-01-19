import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// Initial state
const initialState = {
  journalList: [{
      id: '100',
      content: "Hey what are you doing i am great at doing this",
      count: "10",
      sentences: "2",
      completed: true,
      date: "17 January 2021",
  },
  {
    id: '254',
    content: "Hey what are you doing i am great at doing this",
    count: "10",
    sentences: "2",
    completed: false,
    date: "17 January 2021",
},
{
    id: '121',
    content: "Hey what are you doing i am great at doing this",
    count: "10",
    sentences: "2",
    completed: false,
    date: "17 January 2021",
}
      
  ]
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function deleteJournal(id) {
    dispatch({
      type: 'DELETE_JOURNAL',
      payload: id
    });
  }

  function addJournal(transaction) {
    dispatch({
      type: 'ADD_JOURNAL',
      payload: transaction
    });
  }

  return (<GlobalContext.Provider value={{
    journalList: state.journalList,
    deleteJournal,
    addJournal
  }}>
    {children}
  </GlobalContext.Provider>);
}