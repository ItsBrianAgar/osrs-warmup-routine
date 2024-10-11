import React, { useState, useEffect } from "react";
import "./App.css";
import WarmupList from "./component/WarmupList/WarmupList";
import fetchDailyImage from "./utils/storageUnsplashImage";
import { Helmet } from "react-helmet";
// hooks
import useLightEffect from "./hooks/useLightEffect";
// assets
import favicon from "./favicon.png";

function App() {
  const { lightRef, wrapperRef } = useLightEffect(0.01); // Adjust this value to change the follow speed (lower = slower)
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
      <Helmet>
        <title>OSRS | Warmup Checklist</title>
        <link rel="icon" href={favicon} type="image/x-icon" />
      </Helmet>
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
