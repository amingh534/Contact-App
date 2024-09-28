// src/components/ContactForm.js
import React, { useState, useContext } from "react";
import { ContactContext } from "../context/ContactContext";
import { inputs } from "../constans/inputs";
import styles from "./ContactForm.module.css"

const ContactForm = () => {
  const { dispatch } = useContext(ContactContext);
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    })
      .then((res) => res.json())
      .then((data) => dispatch({ type: "ADD_CONTACT", payload: data }));
    setContact({ firstName: "", lastName: "", email: "" });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {inputs.map((input, index) => (
        <input
          key={index}
          type={input.type}
          placeholder={input.placeholder}
          name={input.name}
          value={contact[input.name]}
          status={input.status}
          onChange={handleChange}
          className={styles.input}
        />
      ))}
      <button type="submit">Add Contact</button>
    </form>
  );
};

export default ContactForm;
