import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

function useIdentifyUser() {
  const [queryUserId, setQueryUserId] = useState<string | null>(null);

  useEffect(() => {
    let localId = localStorage.getItem("queryUserId");

    if (!localId) {
      localId = generateId();
      localStorage.setItem("queryUserId", localId);
    }

    setQueryUserId(localId);
  }, []);

  return queryUserId;
}

function generateId(): string {
  return uuid();
}

export default useIdentifyUser;
