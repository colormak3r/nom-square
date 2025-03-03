import NavBar from "../components/common/navbar";
import MenuPanel from "~/components/menu/menu_panel";
import type { MenuCategoryInfo } from "~/types/types";

const menuData: MenuCategoryInfo[] = [
  {
    id: "1",
    name: "Breakfast",
    menuItems: [
      {
        id: "1",
        name: "Pancakes",
        photo_url: "/placeholder/pancakes.jpg",
        description: "Fluffy pancakes with syrup",
        rating: 4.7,
        price: 8.99,
      },
      {
        id: "2",
        name: "Omelette",
        photo_url: "/placeholder/omelette.jpg",
        description: "Cheesy omelette with veggies",
        rating: 4.6,
        price: 7.99,
      },
    ],
  },
  {
    id: "2",
    name: "Lunch",
    menuItems: [
      {
        id: "3",
        name: "Burger",
        photo_url: "/placeholder/burger.jpg",
        description: "A simply good burger",
        rating: 4.5,
        price: 10.99,
      },
      {
        id: "4",
        name: "Caesar Salad",
        photo_url: "/placeholder/salad.jpg",
        description: "Fresh romaine with caesar dressing",
        rating: 4.3,
        price: 9.5,
      },
    ],
  },
];

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="h-auto min-h-screen bg-gradient-to-b from-red-300 to-orange-200 items-center flex flex-col">
        <h1 className="text-6xl font-pacifico mt-10 text-center">
          Welcome to Nom Nom
        </h1>
        <MenuPanel categories={menuData} />
      </div>
    </>
  );
}
