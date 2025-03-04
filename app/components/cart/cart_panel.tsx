import type { CartItemInfo } from "~/types/types";

import CartItem from "./cart_item";

const cartData: CartItemInfo[] = [
  {
    quantity: 1,
    menuItem: {
      id: "1",
      name: "Pancakes",
      photo_url: "/placeholder/pancakes.jpg",
      description: "Fluffy pancakes with syrup",
      rating: 4.7,
      price: 8.99,
    },
    options: ["Add avocado"],
  },
  {
    quantity: 2,
    menuItem: {
      id: "3",
      name: "Burger",
      photo_url: "/placeholder/burger.jpg",
      description: "A simply good burger",
      rating: 4.5,
      price: 10.99,
    },
    options: ["No pickles", "Add bacon"],
  },
  {
    quantity: 2,
    menuItem: {
      id: "3",
      name: "Truffle Fries",
      photo_url: "/placeholder/burger.jpg",
      description: "A simply good burger",
      rating: 4.5,
      price: 10.99,
    },
    options: [],
  },
  {
    quantity: 3,
    menuItem: {
      id: "3",
      name: "Lemonade",
      photo_url: "/placeholder/burger.jpg",
      description: "A simply good burger",
      rating: 4.5,
      price: 10.99,
    },
    options: ["Extra mint"],
  },
];

export default function CartPanel() {
  return (
    <div className="w-9/10 rounded-2xl bg-white shadow-lg sticky top-30 p-4 m-4  mt-10">
      <h2 className="text-xl text-stone-700 font-bold">Cart</h2>
      <div className="flex flex-col space-y-4">
        {cartData.map((item) => (
          <CartItem key={item.menuItem.name} {...item} />
        ))}

        <div className="flex flex-row justify-between pt-3 border-t">
          <div className="text-stone-700 font-semibold">Total</div>
          <div className="text-stone-700 font-semibold">$32.50</div>
        </div>
        <button className="bg-red-400 text-stone-700 font-semibold p-2 rounded-lg ">
          Checkout
        </button>
      </div>
    </div>
  );
}
