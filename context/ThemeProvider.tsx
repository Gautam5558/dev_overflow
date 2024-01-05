"use client";

import React, { createContext, useEffect, useState } from "react";

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  let systemTheme = null;
  const val =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (val) {
    systemTheme = "dark";
  } else {
    systemTheme = "light";
  }
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || systemTheme
  );

  const handleChange = () => {
    if (theme === "light") {
      localStorage.setItem("theme", "light");
      if (Array.from(document.documentElement.classList).includes("dark")) {
        document.documentElement.classList.remove("dark");
      }
      document.documentElement.classList.add("light");
    } else {
      localStorage.setItem("theme", "dark");
      if (Array.from(document.documentElement.classList).includes("light")) {
        document.documentElement.classList.remove("light");
      }
      document.documentElement.classList.add("dark");
    }
  };

  useEffect(() => {
    handleChange();
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
