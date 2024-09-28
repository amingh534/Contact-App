import React, { createContext, useReducer, useEffect } from "react";

const initialState = {
  contacts: [],
  loading: false,
  selectedContacts: [],
  searchQuery: "",
};

export const ContactContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_CONTACTS":
      return { ...state, contacts: action.payload, loading: false };
    case "ADD_CONTACT":
      return { ...state, contacts: [...state.contacts, action.payload] };
    case "EDIT_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
      };
    case "DELETE_SELECTED_CONTACTS":
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => !state.selectedContacts.includes(contact.id)
        ),
        selectedContacts: [],
      };
    case "SELECT_CONTACT":
      return {
        ...state,
        selectedContacts: [...state.selectedContacts, action.payload],
      };
    case "DESELECT_CONTACT":
      return {
        ...state,
        selectedContacts: state.selectedContacts.filter(
          (id) => id !== action.payload
        ),
      };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    default:
      return state;
  }
};

export const ContactProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch("http://localhost:5000/contacts")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "FETCH_CONTACTS", payload: data }));
  }, []);

  return (
    <ContactContext.Provider value={{ state, dispatch }}>
      {children}
    </ContactContext.Provider>
  );
};
