import React, { useState } from "react";

const Search = ({onSearch}) => {
    const [search, setSearch] = useState('');

    const onInputChange = (val) =>{
        setSearch(val);
        onSearch(val);
    }
    return(
        <input
        type = "text"
        className = "form-control"
        style={{width: "240px"}}
        placeholder = "Search any Data"
        value={search}
        onChange={(e) => onInputChange(e.target.value)}
        />
    )
}

export default Search;