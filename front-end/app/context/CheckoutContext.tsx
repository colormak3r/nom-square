"use client";
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { OrderItemInfo} from "~/app/types/types";

type CheckoutContextType = {
  order: OrderItemInfo[];
  openCheckoutModal: (order: OrderItemInfo[]) => void;
  closeCheckoutModal: () => void;
};

export const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
);

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const [order, setOrder] = useState<OrderItemInfo[]>([]);

  const openCheckoutModal = (order: OrderItemInfo[]) => {
    setOrder(order);
  };

  const closeCheckoutModal = () => {
    setOrder([]);
  };

  return (
    <CheckoutContext.Provider
      value={{ order, openCheckoutModal, closeCheckoutModal }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context)
    throw new Error("useCheckout must be used inside a CheckoutProvider");
  return context;
};
