import React from "react";
import "./PageTabs.css";

const PageTabs = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="page-tabs-wrapper">
      <button
        className={`page-tab-button ${
          activeTab === "warmup" ? "page-tab-button-active" : ""
        }`}
        onClick={() => setActiveTab("warmup")}
      >
        Warmup List
      </button>
      <button
        className={`page-tab-button ${
          activeTab === "todo" ? "page-tab-button-active" : ""
        }`}
        onClick={() => setActiveTab("todo")}
      >
        Todo List
      </button>
    </nav>
  );
};

export default PageTabs;
