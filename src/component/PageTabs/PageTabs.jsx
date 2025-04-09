import React from "react";
import "./PageTabs.css";

const PageTabs = () => {
  return (
    <nav className="page-tabs-wrapper">
      <button className="page-tab-button page-tab-button-active">
        Warmup List
      </button>
      <button className="page-tab-button">Todo List</button>
    </nav>
  );
};

export default PageTabs;
