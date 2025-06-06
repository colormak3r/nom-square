'use client';
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { OrderItemInfo, MenuCategoryInfo} from '~/app/types/types';

type OrderContextType = {
  cart: OrderItemInfo[];
  addToCart: (
      menuItem: MenuCategoryInfo["menuItems"][number],
      options: string[]
    ) => void;
};

const CartContext = createContext<OrderContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<OrderItemInfo[]>([]);

  const addToCart = (menuItem: OrderItemInfo["menuItem"], options: string[]) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.menuItem.id === menuItem.id &&
          JSON.stringify(item.options) === JSON.stringify(options)
      );

      if (existingIndex !== -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [
          ...prevCart,
          { menuItem, quantity: 1, options }
        ];
      }
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartModal = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside a CartProvider');
  return context;
};
