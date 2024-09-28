// src/App.js
import React from "react";
import { ContactProvider } from "./context/ContactContext";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";
import Search from "./components/Search";
import "./App.css";

function App() {
  return (
    <ContactProvider>
      <div className="app">
        <h1>Contact App</h1>
        <Search />
        <ContactForm />
        <ContactList />
      </div>
    </ContactProvider>
  );
}

export default App;
