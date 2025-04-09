import React, { useState, useEffect } from "react";
import "./App.css";
import WarmupList from "./component/WarmupList/WarmupList";
import TodoList from "./component/TodoList/TodoList"; // Import TodoList
import PageTabs from "./component/PageTabs/PageTabs"; // Import PageTabs
import { Helmet } from "react-helmet";
// hooks
import useLightEffect from "./hooks/useLightEffect";
// assets
import favicon from "./favicon.png";

function App() {
  const { lightRef, wrapperRef } = useLightEffect(0.01); // Adjust this value to change the follow speed (lower = slower)
  const [backgroundImage, setBackgroundImage] = useState("");
  const [preferredBackground, setPreferredBackground] = useState("");
  const [activeTab, setActiveTab] = useState("warmup"); // Default active tab

  // Load background image on mount

  // Load active tab from localStorage on mount
  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab");
    if (savedTab) {
      setActiveTab(savedTab); // Set the saved tab as the active tab
    }
  }, []);

  // Save active tab to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  return (
    // <div className="App" style={{ backgroundImage: `url(${backgroundImage})` }}>
    <div className="App">
      <Helmet>
        <title>OSRS | Checklist</title>
        <link rel="icon" href={favicon} type="image/x-icon" />
      </Helmet>
      <div className="app-wrapper">
        {/* Pass activeTab state and setter to PageTabs */}
        <PageTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <main ref={wrapperRef} className="content-wrapper">
          <div ref={lightRef} className="light-effect"></div>
          <header className="page-header">
            <h1 className="page-title">
              {activeTab === "warmup" ? "Warmup Checklist" : "Todo Planner"}
            </h1>
            <p className="page-description">
              {activeTab === "warmup" ? "Lock in!" : "Plan your adventure!"}
            </p>
          </header>
          {/* Conditional Rendering Based on Active Tab */}
          {activeTab === "warmup" ? <WarmupList /> : <TodoList />}
        </main>
      </div>
    </div>
  );
}

export default App;
