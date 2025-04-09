import React, { useState, useEffect } from "react";
import "./WarmupList.css";
import warmupList from "../../data/warmupList";
import DateIndicator from "../DateIndicator/DateIndicator";
import AddListItemButton from "../AddListItemButton/AddListItemButton";

const WarmupList = () => {
  const [checkedItems, setCheckedItems] = useState({});
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [isAddingNewItem, setIsAddingNewItem] = useState(false);

  // Get today's date as a string
  const todayDate = new Date().toDateString();

  // Load data from localStorage on mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("warmupChecklist"));

    if (storedData) {
      if (storedData.date === todayDate) {
        // Load saved data if it's for today
        setItems(storedData.items || warmupList);
        setCheckedItems(storedData.checkedItems || {});
      } else {
        // Reset only checked items for a new day but keep the list
        setItems(storedData.items || warmupList);
        setCheckedItems({}); // Reset checked items for a new day
      }
    } else {
      // Initialize with default warmup list if no saved data exists
      setItems(warmupList);
      localStorage.setItem(
        "warmupChecklist",
        JSON.stringify({ items: warmupList, checkedItems: {}, date: todayDate })
      );
    }
  }, [todayDate]);

  // Save data to localStorage whenever items or checkedItems change
  useEffect(() => {
    localStorage.setItem(
      "warmupChecklist",
      JSON.stringify({
        items,
        checkedItems,
        date: todayDate,
      })
    );
  }, [items, checkedItems, todayDate]);

  const handleItemClick = (step) => {
    setCheckedItems((prev) => ({
      ...prev,
      [step]: !prev[step],
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
    <section className="warmup-list-wrapper">
      {/* Empty State */}
      {items.length === 0 && (
        <div className="empty-state">
          <p>This list is empty.</p>
        </div>
      )}

      <ol className="warmup-list">
        {items.map((step) => (
          <li key={step} className="warmup-list-item">
            <div
              className="warmup-list-item-content"
              onClick={() => handleItemClick(step)}
            >
              <input
                className="warmup-list-item-checkbox"
                type="checkbox"
                checked={checkedItems[step] || false}
                readOnly
              />
              <p className="warmup-list-item-text">{step}</p>
            </div>
            <button
              className="remove-item-button"
              onClick={() => handleRemoveItem(step)}
            >
              &times;
            </button>
          </li>
        ))}
        {isAddingNewItem && (
          <li className="warmup-list-item new-item">
            <form onSubmit={handleNewItemSubmit}>
              <input
                type="text"
                value={newItem}
                onChange={handleNewItemChange}
                placeholder="Enter new item"
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

export default WarmupList;
