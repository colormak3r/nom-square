import MenuCard from "./menu_card";
import type { MenuCategoryInfo } from "~/app/types/types";

export default function Menucategory(category: MenuCategoryInfo) {
  return (
    <div className="w-full">
      <details className="group" open>
        <summary className="flex justify-between items-center cursor-pointer bg-gray-100 rounded-xl p-4 m-2">
          <h2 className="text-xl text-stone-700 font-semibold">
            ○ {category.name}
          </h2>
        </summary>
        <div className="mr-6 m-2">
          {category.menuItems.map((menuItem) => (
            <MenuCard key={menuItem.id} {...menuItem}/>
          ))}
        </div>
      </details>
    </div>
  );
}
