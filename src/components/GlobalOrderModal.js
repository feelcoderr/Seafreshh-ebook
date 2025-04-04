// src/components/GlobalOrderModal.js
"use client";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import OrderModal from "./OrderModal";
import { handleFormSubmit } from "../utils/payment";

export default function GlobalOrderModal() {
  const { isOrderModalOpen, closeOrderModal } = useContext(AppContext);

  const onSubmit = async (formData) => {
    await handleFormSubmit(formData);
    closeOrderModal(); // Close modal after payment is initiated
  };

  return (
    <OrderModal
      isOpen={isOrderModalOpen}
      onClose={closeOrderModal}
      onSubmit={onSubmit}
    />
  );
}
