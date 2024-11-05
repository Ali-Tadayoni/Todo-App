import React, { useEffect, useState } from "react";

const Notification: React.FC<{ message: string }> = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000); // hide after 3 seconds
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 10,
        right: 10,
        background: "#4CAF50",
        color: "#fff",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      {message}
    </div>
  );
};

export default Notification;
