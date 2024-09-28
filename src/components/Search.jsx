// src/components/Search.js
import React, { useContext } from "react";
import { ContactContext } from "../context/ContactContext";
import styles from "./Search.module.css"

const Search = () => {
  const { dispatch } = useContext(ContactContext);

  const handleSearch = (e) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: e.target.value });
  };

  return (
    <input
      type="text"
      placeholder="Search by name or email..."
      onChange={handleSearch}
      className={styles.input}
    />
  );
};

export default Search;
