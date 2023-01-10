import { useEffect, useState } from "react";

const useRequestThrottle = (disableQueryFor: number) => {
  const [isQueryDisabled, setIsQueryDisabled] = useState(true);
  const [timeUntilEnabled, setTimeUntilEnabled] = useState(0);

  useEffect(() => {
    const lastClickTime = localStorage.getItem("lastClickTime");
    if (lastClickTime?.length) {
      const timeSinceLastClick = Date.now() - Number(lastClickTime);
      const timeUntil = Math.max(0, disableQueryFor - timeSinceLastClick);
      if (timeUntil > 0) {
        setIsQueryDisabled(true);
        setTimeUntilEnabled(timeUntil);

        setTimeout(() => setIsQueryDisabled(false), timeUntil);
      } else {
        setIsQueryDisabled(false);
      }
    } else {
      setIsQueryDisabled(false);
    }
  }, [disableQueryFor]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeUntilEnabled > 0) {
        setTimeUntilEnabled((prevTime) => prevTime - 1000);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timeUntilEnabled]);

  const startThrottle = () => {
    setIsQueryDisabled(true);
    setTimeUntilEnabled(disableQueryFor);
    localStorage.setItem("lastClickTime", Date.now().toString());
    setTimeout(() => setIsQueryDisabled(false), disableQueryFor);
  };

  return {
    isQueryDisabled,
    timeUntilEnabled,
    startThrottle,
  };
};

export default useRequestThrottle;
