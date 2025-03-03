import MenuCard from "./menu_card";
import type { MenuCategoryInfo } from "~/types/types";

export default function MenuCategories(categories: MenuCategoryInfo) {
  return (
    <div className="w-full">
      <details className="group" open>
        <summary className="flex justify-between items-center cursor-pointer bg-gray-100 rounded-xl p-4 m-2">
          <h2 className="text-xl text-stone-700 font-semibold">
            ○ {categories.name}
          </h2>
        </summary>
        <div className="mr-6 m-2">
          {categories.menuItems.map((menuItem) => (
            <MenuCard key={menuItem.id} {...menuItem} />
          ))}
        </div>
      </details>
    </div>
  );
}
