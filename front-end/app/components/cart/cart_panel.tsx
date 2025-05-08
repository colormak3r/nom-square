import { useCartModal } from "~/app/context/CartContext";
import { useCheckout } from "~/app/context/CheckoutContext";
import CartItem from "./cart_item";

export default function CartPanel() {
  const { cart } = useCartModal();
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );
  const tax = 0.0775; // Assuming tax is 7.75%
  const { openCheckoutModal } = useCheckout();
  return (
    <div className="w-9/10 rounded-2xl bg-white shadow-lg sticky top-30 p-4 m-4  mt-10">
      <h2 className="text-xl text-stone-700 font-bold">Cart</h2>
      <div className="flex flex-col space-y-4">
        {cart.map((item) => (
          <CartItem key={item.menuItem.name} {...item} />
        ))}

        <div className="flex flex-row justify-between pt-3 border-t">
          <div className="text-stone-700">Subtotal</div>
          <div className="text-stone-700">${cartSubtotal.toFixed(2)}</div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="text-stone-700">Tax {tax * 100}%</div>
          <div className="text-stone-700">
            ${(cartSubtotal * tax).toFixed(2)}
          </div>
        </div>
        <div className="flex flex-row justify-between pt-3 border-t">
          <div className="text-stone-700 font-semibold">Total</div>
          <div className="text-stone-700 font-semibold">
            ${(cartSubtotal * (1 + tax)).toFixed(2)}
          </div>
        </div>
        <button
          onClick={() => {
            openCheckoutModal(cart);
          }}
          className="bg-red-400 text-stone-700 font-semibold p-2 rounded-lg hover:cursor-pointer hover:bg-red-500"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
