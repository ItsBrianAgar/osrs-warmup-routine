import React, { useState, useEffect } from "react";
import "./App.css";
import WarmupList from "./component/WarmupList/WarmupList";
import fetchDailyImage from "./utils/storageUnsplashImage";
// hooks
import useLightEffect from "./hooks/useLightEffect";

function App() {
  const { lightRef, wrapperRef } = useLightEffect();
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    fetchDailyImage().then((imageUrl) => {
      if (imageUrl) {
        setBackgroundImage(imageUrl);
      }
    });
  }, []);

  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <main ref={wrapperRef} className="content-wrapper">
        <div ref={lightRef} className="light-effect"></div>
        <header className="page-header">
          <h1 className="page-title">Warmup Checklist</h1>
          <p className="page-description">Lock in!</p>
        </header>
        <WarmupList />
      </main>
    </div>
  );
}

export default App;
