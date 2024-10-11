import React from "react";
import "./AddListItemButton.css";

const AddListItemButton = ({ handleClick }) => {
  return (
    <button onClick={handleClick} className="add-list-item-button">
      Add Item
    </button>
  );
};

export default AddListItemButton;
