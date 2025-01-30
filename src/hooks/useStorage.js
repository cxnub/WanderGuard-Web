import { useState } from "react";
import Cookies from "js-cookie";


export const useCookies = (keyName, defaultValue) => {
  const [storedCookies, setStoredCookies] = useState(() => {
    try {
      // Get the cookie value
      const value = Cookies.get(keyName);

      // If the cookie value is not null, return the parsed value
      if (value) {
        return JSON.parse(value);

      // If the cookie value is null, return the default value
      } else {
        Cookies.set(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch {
      // If there is an error, return the default value
      return defaultValue;
    }
  });

  const setCookie = (value) => {
    try {
      // Save the cookie value
      Cookies.set(keyName, JSON.stringify(value));
    } catch (error) {
      // Log the error
      console.error(error);
    }
    // set the state
    setStoredCookies(value);
  }

  return [storedCookies, setCookie];
}