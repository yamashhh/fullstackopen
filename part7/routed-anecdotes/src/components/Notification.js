import { useEffect } from "react";

const Notification = ({ notification, setNotification }) => {
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(""), 5_000);
      return () => clearTimeout(timer);
    }
  }, [notification, setNotification]);

  return notification && <p>{notification}</p>;
};

export default Notification;
