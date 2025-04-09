import React, { useState, useEffect } from "react";
import "./TodoList.css";
import AddListItemButton from "../AddListItemButton/AddListItemButton";
import DateIndicator from "../DateIndicator/DateIndicator";

const TodoList = () => {
  const [items, setItems] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [newItem, setNewItem] = useState("");
  const [isAddingNewItem, setIsAddingNewItem] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("todoChecklist"));
    if (storedData) {
      setItems(storedData.items || []);
      setCheckedItems(storedData.checkedItems || {});
    }
  }, []);

  // Save data to localStorage whenever items or checkedItems change
  useEffect(() => {
    localStorage.setItem(
      "todoChecklist",
      JSON.stringify({
        items,
        checkedItems,
      })
    );
  }, [items, checkedItems]);

  const handleItemClick = (item) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item]: !prev[item], // Toggle the checked state for the item
    }));
  };

  const handleAddNewItem = () => {
    setIsAddingNewItem(true);
  };

  const handleNewItemChange = (e) => {
    setNewItem(e.target.value);
  };

  const handleNewItemSubmit = (e) => {
    e.preventDefault();
    if (newItem.trim()) {
      setItems([...items, newItem.trim()]);
      setNewItem("");
      setIsAddingNewItem(false);
    }
  };

  const handleRemoveItem = (itemToRemove) => {
    setItems(items.filter((item) => item !== itemToRemove));
    setCheckedItems((prev) => {
      const newCheckedItems = { ...prev };
      delete newCheckedItems[itemToRemove];
      return newCheckedItems;
    });
  };

  return (
    <section className="todo-list-wrapper">
      {/* Empty State */}
      {items.length === 0 && (
        <div className="empty-state">
          <p>This list is empty.</p>
        </div>
      )}

      <ol className="todo-list">
        {items.map((item) => (
          <li key={item} className="todo-list-item">
            <div
              className="todo-list-item-content"
              onClick={() => handleItemClick(item)}
            >
              <input
                className="todo-list-item-checkbox"
                type="checkbox"
                checked={checkedItems[item] || false}
                readOnly
              />
              <p className="todo-list-item-text">{item}</p>
            </div>
            <button
              className="remove-item-button"
              onClick={() => handleRemoveItem(item)}
            >
              &times;
            </button>
          </li>
        ))}
        {isAddingNewItem && (
          <li className="todo-list-item new-item">
            <form onSubmit={handleNewItemSubmit}>
              <input
                type="text"
                value={newItem}
                onChange={handleNewItemChange}
                placeholder="Enter new event"
                className="new-item-input"
                autoFocus
              />
            </form>
          </li>
        )}
      </ol>
      <AddListItemButton handleClick={handleAddNewItem} />
      <DateIndicator />
    </section>
  );
};

export default TodoList;
