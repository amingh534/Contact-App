// src/components/ContactList.js
import React, { useContext } from 'react';
import { ContactContext } from '../context/ContactContext';
import styles from "./ContactList.module.css"

const ContactList = () => {
  const { state, dispatch } = useContext(ContactContext);

  if (state.loading) {
    return <p>Loading...</p>;
  }

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/contacts/${id}`, { method: 'DELETE' })
      .then(() => dispatch({ type: 'DELETE_CONTACT', payload: id }));
  };

  const handleSelect = (id) => {
    if (state.selectedContacts.includes(id)) {
      dispatch({ type: 'DESELECT_CONTACT', payload: id });
    } else {
      dispatch({ type: 'SELECT_CONTACT', payload: id });
    }
  };

  const handleDeleteSelected = () => {
    state.selectedContacts.forEach(id => handleDelete(id));
    dispatch({ type: 'DELETE_SELECTED_CONTACTS' });
  };

  const filteredContacts = state.contacts.filter(contact => 
    contact.firstName.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
    contact.lastName.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(state.searchQuery.toLowerCase())
  );

  return (
    <div className={styles.contactlist}>
      <button onClick={handleDeleteSelected}>Delete Selected</button>
      {filteredContacts.map(contact => (
        <div key={contact.id}>
          <input
            type="checkbox"
            checked={state.selectedContacts.includes(contact.id)}
            onChange={() => handleSelect(contact.id)}
          />
          <h3>{contact.firstName} {contact.lastName}</h3>
          <p>{contact.email}</p>
          <button onClick={() => handleDelete(contact.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
