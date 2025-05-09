import type { OrderItemInfo } from "~/app/types/types";

export default function CartItem(item: OrderItemInfo) {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row">
        <div className="text-stone-700 font-semibold mr-1">{item.quantity} x</div>
        <div className="flex flex-col">
          <div className="text-stone-700 font-semibold">
            {item.menuItem.name}
          </div>
          {item.options.map((option) => (
            <div key={option} className="text-stone-500 text-sm">
              {option}
            </div>
          ))}
        </div>
      </div>
      <div className="text-stone-700 font-semibold">${item.menuItem.price}</div>
    </div>
  );
}
