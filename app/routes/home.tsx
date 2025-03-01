import CategoryBar from "~/components/categorybar";
import NavBar from "../components/navbar";
import MenuCard from "~/components/menucard";

const menuData = [
  {
    category: "Breakfast",
    items: [
      { name: "Pancakes", image: "/placeholder/pancakes.jpg", description: "Fluffy pancakes with syrup", rating: 4.7, price: 8.99 },
      { name: "Omelette", image: "/placeholder/omelette.jpg", description: "Cheesy omelette with veggies", rating: 4.6, price: 7.99 }
    ]
  },
  {
    category: "Lunch",
    items: [
      { name: "Burger", image: "/placeholder/burger.jpg", description: "A simply good burger", rating: 4.5, price: 10.99 },
      { name: "Caesar Salad", image: "/placeholder/salad.jpg", description: "Fresh romaine with caesar dressing", rating: 4.3, price: 9.50 }
    ]
  }
];

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="h-auto min-h-screen bg-gradient-to-b from-red-300 to-orange-200 items-center flex flex-col">
        <h1 className="text-6xl font-pacifico mt-10 text-center">Welcome to Nom Nom</h1>
        <div className="w-9/10 md:w-3/5 rounded-2xl shadow-lg p-4 m-4">
          {menuData.map(({ category, items }) => (
            <CategoryBar key={category} title={category}>
              {items.map(item => (
                <MenuCard key={item.name} {...item} />
              ))}
            </CategoryBar>
          ))}
        </div>
      </div>
    </>
  );
}
