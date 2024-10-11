import React, { useState, useEffect } from "react";
import "./WarmupList.css";
import warmupList from "../../data/warmupList";
import DateIndicator from "../DateIndicator/DateIndicator";
import AddListItemButton from "../AddListItemButton/AddListItemButton";

const WarmupList = () => {
  const [checkedItems, setCheckedItems] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date().toDateString());
  const [items, setItems] = useState(warmupList);
  const [newItem, setNewItem] = useState("");
  const [isAddingNewItem, setIsAddingNewItem] = useState(false);

  useEffect(() => {
    const checkDate = () => {
      const now = new Date();
      const today = now.toDateString();
      if (today !== currentDate) {
        setCurrentDate(today);
        setCheckedItems({}); // Reset checkedItems for new day
        setItems(warmupList); // Reset items for new day
      }
    };

    checkDate(); // Check immediately on mount
    const timer = setInterval(checkDate, 1000 * 60); // Check every minute

    return () => clearInterval(timer);
  }, [currentDate]);

  useEffect(() => {
    const storedData =
      JSON.parse(localStorage.getItem("warmupChecklist")) || {};

    if (storedData.date === currentDate) {
      setCheckedItems(storedData.items || {});
      setItems(storedData.list || warmupList);
    } else {
      setCheckedItems({});
      setItems(warmupList);
    }
  }, [currentDate]);

  useEffect(() => {
    localStorage.setItem(
      "warmupChecklist",
      JSON.stringify({
        date: currentDate,
        items: checkedItems,
        list: items,
      })
    );
  }, [checkedItems, currentDate, items]);

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
