"use client";
import { use, useState } from "react";
import type { MenuItemInfo } from "~/app/types/types";

export default function MenuItemModal({
  selectedItem,
  closeModal,
  addToCart,
}: {
  selectedItem: MenuItemInfo;
  closeModal: () => void;
  addToCart: (item: MenuItemInfo, options: string[]) => void;
}) {
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const toggleAddOn = (option: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/40"
      onClick={closeModal}
    >
      <div
        className="bg-white p-6 rounded-lg max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={selectedItem.photo_url}
          alt={selectedItem.name}
          className="w-full h-40 object-cover rounded"
        />
        <h2 className="text-xl font-bold mt-2">{selectedItem.name}</h2>
        <p className="text-gray-600">{selectedItem.description}</p>
        <p className="font-semibold mt-1">${selectedItem.price.toFixed(2)}</p>

        {selectedItem.add_ons.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold text-sm text-gray-700">Add-ons</h3>
            <ul className="space-y-1">
              {selectedItem.add_ons.map((option) => (
                <li key={option}>
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedAddOns.includes(option)}
                      onChange={() => toggleAddOn(option)}
                      className="form-checkbox hover:outline-2 hover:outline-red-400 rounded-xl"
                    />
                    <span>{option}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={() => {
            addToCart(selectedItem, selectedAddOns);
            closeModal();
          }}
          className="bg-red-400 text-white font-semibold py-2 px-4 mt-4 rounded-lg w-full hover:cursor-pointer hover:bg-red-500"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
