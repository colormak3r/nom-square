"use client";
import type { OrderItemInfo } from "~/app/types/types";
import CartItem from "./cart_item";

export default function CheckoutModal({
  order,
  closeModal,
}: {
  order: OrderItemInfo[];
  closeModal: () => void;
}) {
  const orderSubtotal = order.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );
  const tax = 0.0775; // Assuming tax is 7.75%

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/40"
      onClick={closeModal}
    >
      <div
        className="bg-white p-6 rounded-lg max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mt-2">Checkout</h2>
        <div className="flex flex-col space-y-4">
          {order.map((item) => (
            <CartItem key={item.menuItem.name} {...item} />
          ))}

          <div className="flex flex-row justify-between pt-3 border-t">
            <div className="text-stone-700">Subtotal</div>
            <div className="text-stone-700">${orderSubtotal.toFixed(2)}</div>
          </div>

          <div className="flex flex-row justify-between">
            <div className="text-stone-700">Tax {tax * 100}%</div>
            <div className="text-stone-700">
              ${(orderSubtotal * tax).toFixed(2)}
            </div>
          </div>

          <div className="flex flex-row justify-between pt-3 border-t">
            <div className="text-stone-700 font-semibold">Total</div>
            <div className="text-stone-700 font-semibold">
              ${(orderSubtotal * (1 + tax)).toFixed(2)}
            </div>
          </div>

          <button className="bg-red-400 text-white font-semibold p-2 rounded-lg hover:cursor-pointer hover:bg-red-500">
            Send Order
          </button>
        </div>

        <button
          onClick={() => {
            closeModal();
          }}
          className="bg-white text-red-400 outline-2 outline-red-400  font-semibold py-2 px-4 mt-4 rounded-lg w-full hover:cursor-pointer hover:bg-red-500 hover:text-white hover:outline-white"
        >
          Back to Cart
        </button>
      </div>
    </div>
  );
}
