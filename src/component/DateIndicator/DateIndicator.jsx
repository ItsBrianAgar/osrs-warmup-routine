import React, { useState, useEffect } from "react";
import "./DateIndicator.css";

const DateIndicator = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 1000 * 60); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  return <div className="date-indicator">{formatDate(currentDate)}</div>;
};

export default DateIndicator;
