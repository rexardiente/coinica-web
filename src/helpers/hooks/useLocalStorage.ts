import { useState, useEffect } from "react";

type StorageData = {
  storageValue: string;
  setStorageValue: (value: string) => void;
  removeStorageValue: (value?: string) => void;
};

export default function useLocalStorage(
  key: string,
  initialValue: string
): StorageData {
  const [storageValue, setStorage] = useState(() => {
    //Get value when initalize
    try {
      let item = window.localStorage.getItem(key);
      return item ? item : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  useEffect(() => {
    //Store value
    window.localStorage.setItem(key, storageValue);
  }, [key, storageValue]);

  //Set value for storage
  const setStorageValue = (value: string | Function) => {
    try {
      let newValue = typeof value === "function" ? value(storageValue) : value;
      setStorage(newValue);
    } catch (error) {
      console.log(error);
    }
  };

  const removeStorageValue = (initial: string = "") => {
    try {
      window.localStorage.removeItem(key);
      setStorage(initial ? initial : initialValue);
    } catch (error) {
      console.log("Key is not exist");
    }
  };

  return { storageValue, setStorageValue, removeStorageValue };
}
