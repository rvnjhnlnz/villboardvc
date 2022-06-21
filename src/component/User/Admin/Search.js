import React, { useState } from "react";
import "./Account/Accounts.css";
const Search = ({onSearch}) => {
    const [search, setSearch] = useState('');

    const onInputChange = (val) =>{
        setSearch(val);
        onSearch(val);
    }
    return(
        <input
        type = "text"
        className = "searchbar"
        placeholder = "Search any Data"
        value={search}
        onChange={(e) => onInputChange(e.target.value)}
        />
    )
}

export default Search;