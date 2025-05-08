import type { MenuItemInfo } from "~/app/types/types";
import { useCartModal } from "~/app/context/CartContext";
import { useMenuItemModal } from "~/app/context/MenuItemModalContext";

export default function MenuCard(item: MenuItemInfo) {
  const { addToCart } = useCartModal();
  const { openItemModal } = useMenuItemModal();
  return (
    <div
      onClick={() => openItemModal(item)}
      className="w-full rounded-2xl shadow-lg bg-white m-2 hover:cursor-pointer"
    >
      <div className="flex flex-col md:flex-row">
        <img
          src={item.photo_url}
          alt={item.name}
          className="sm.w-full md.w-40 aspect-square h-40 object-cover rounded-lg"
        />
        <div className="flex flex-col sm.flex-row justify-between w-full ml-2">
          <div>
            <p className="text-xl text-stone-700 font-semibold">{item.name}</p>
            <p className="text-stone-700">{item.description}</p>
          </div>
          <div className="flex justify-end items-end m-2">
            <p className="text-stone-700 font-semibold m-2">☆ {item.rating}</p>
            <p className="text-stone-700 font-semibold m-2">
              ${item.price.toFixed(2)}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(item, []);
              }}
              className="bg-red-400 text-white font-semibold py-2 px-4 mx-2 rounded-lg hover:cursor-pointer hover:bg-red-500"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
