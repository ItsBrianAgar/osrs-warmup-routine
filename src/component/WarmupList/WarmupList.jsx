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

  const todayDate = new Date().toDateString();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("warmupChecklist"));

    if (storedData) {
      setItems(storedData.items || warmupList);

      if (storedData.date === todayDate) {
        setCheckedItems(storedData.checkedItems || {});
      } else {
        console.log("Date has changed; resetting checked items.");
        setCheckedItems({});
      }
    } else {
      setItems(warmupList);
      localStorage.setItem(
        "warmupChecklist",
        JSON.stringify({ items: warmupList, checkedItems: {}, date: todayDate })
      );
    }
  }, [todayDate]);

  useEffect(() => {
    const currentData = JSON.parse(localStorage.getItem("warmupChecklist"));
    const newData = JSON.stringify({
      items,
      checkedItems,
      date: todayDate,
    });

    if (!currentData || JSON.stringify(currentData) !== newData) {
      localStorage.setItem("warmupChecklist", newData);
    }
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
