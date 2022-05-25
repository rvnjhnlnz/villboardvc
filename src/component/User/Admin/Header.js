import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
const Header = ({ headers, onSorting }) => {
  const [sortingField, setSortingField] = useState("");
  const [sortingOrder, setSortingOrder] = useState("asc");
  const onSortingChange = (field) => {
    const order =
      field === sortingField && sortingOrder === "asc" ? "desc " : "asc";
    setSortingField(field);
    setSortingOrder(order);
    onSorting(field, order);
  };
  return (
    <thead>
      <tr>
        {headers.map(({ name, field, sortable }) => (
          <th
            key={name}
            style={{ cursor: "pointer" }}
            onClick={() => (sortable ? onSortingChange(field) : null)}
          >
            {name} &nbsp;&nbsp;
            {(sortingField && sortingField === field && (
              <FontAwesomeIcon
                icon={sortingOrder === "asc" ? faArrowDown : faArrowUp}
              />
            )) || <FontAwesomeIcon icon={faArrowUp} />}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default Header;
