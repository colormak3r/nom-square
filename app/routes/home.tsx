import React, { useEffect, useState } from "react";
import type { MenuCategoryInfo } from "~/types/types";
import MenuPanel from "~/components/menu/menu_panel";
import MenuCartBar from "../components/menu/menu_cart_bar";
import CartPanel from "~/components/cart/cart_panel";

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
  // Show mobile view if screen width is less than 1280px
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 1280
  );

  // Update isMobile state when window is resized
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1280);

      if (window.innerWidth > 1280) {
        setView(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // State for message
  const [isMenuView, setView] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem("view") === "true" || true;
    }
    return true;
  });

  useEffect(() => {
    window.localStorage.setItem("view", isMenuView.toString());
  }, [isMenuView]);

  const handleMenuButtonClick = () => {
    setView(true);
  };

  const handleCartButtonClick = () => {
    setView(false);
  };

  return (
    <div className="items-center flex flex-col">
      {isMenuView && (
        <h1 className="text-6xl font-pacifico mt-10 text-center">
          Welcome to Nom Nom
        </h1>
      )}

      {isMenuView ? isMobile ? <HomeMobile /> : <HomeDesktop /> : <CartPanel />}
      <div className="h-10"></div>
      {isMobile && (
        <MenuCartBar
          isMenuView={isMenuView}
          onMenuButtonClick={handleMenuButtonClick}
          onCartButtonClick={handleCartButtonClick}
        />
      )}
    </div>
  );
}

function HomeDesktop() {
  return (
    <div className="flex flex-row w-4/5 space-x-8">
      <div className="grow-4">
        <MenuPanel categories={menuData} />
      </div>
      <div className="grow-3">
        <CartPanel />
      </div>
    </div>
  );
}

function HomeMobile() {
  return <MenuPanel categories={menuData} />;
}
