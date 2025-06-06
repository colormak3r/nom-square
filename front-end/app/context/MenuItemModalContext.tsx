"use client";
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { MenuItemInfo } from "~/app/types/types";

type MenuItemModalContextType = {
  selectedItem: MenuItemInfo | null;
  openItemModal: (menuItem: MenuItemInfo) => void;
  closeItemModal: () => void;
};

const MenuItemModalContext = createContext<
  MenuItemModalContextType | undefined
>(undefined);

export const MenuItemModalProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedItem, setSelectedItem] = useState<MenuItemInfo | null>(null);

  const openItemModal = (menuItem: MenuItemInfo) => {
    setSelectedItem(menuItem);
  };

  const closeItemModal = () => {
    setSelectedItem(null);
  };

  return (
    <MenuItemModalContext.Provider
      value={{ selectedItem, openItemModal, closeItemModal }}
    >
      {children}
    </MenuItemModalContext.Provider>
  );
};

export const useMenuItemModal = () => {
  const context = useContext(MenuItemModalContext);
  if (!context)
    throw new Error(
      "useMenuItemModal must be used inside a MenuItemModalProvider"
    );
  return context;
};
