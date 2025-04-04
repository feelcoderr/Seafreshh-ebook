// src/context/AppContext.js
"use client";
import { createContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const openOrderModal = () => {
    setIsOrderModalOpen(true);
  };

  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        isOrderModalOpen,
        openOrderModal,
        closeOrderModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
