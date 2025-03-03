import MenuCategory from "./menu_category";
import type { MenuCategoryInfo } from "~/types/types";

export default function MenuPanel({
  categories,
}: {
  categories: MenuCategoryInfo[];
}) {
  return (
    <div className="w-9/10 md:w-3/5 rounded-2xl shadow-lg p-4 m-4">
      {categories.map((category) => (
        <MenuCategory key={category.id} {...category} />
      ))}
    </div>
  );
}
