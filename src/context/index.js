import { createContext } from "react";

export const context = createContext({
  value: "",
  onChange: (_value = "") => {
    // unimplemented
  }
});

export const timeContext = createContext({
  value: "",
  onChange: (_value = "") => {
    // unimplemented
  }
});
