import { useEffect, useState } from "react";
import type { MenuCategoryInfo, MenuItemInfo } from "@app/types/types";
import MenuPanel from "@app/components/menu/menu_panel";
import MenuCartBar from "@app/components/menu/menu_cart_bar";
import CartPanel from "@app/components/cart/cart_panel";
import { useMenuItemModal } from "../context/MenuItemModalContext";
import { useCartModal } from "../context/CartContext";
import MenuItemModal from "../components/menu/menu_modal_item";
import { useCheckout } from "../context/CheckoutContext";
import CheckoutModal from "../components/cart/checkout_modal";

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
        allergies: ["gluten"],
        add_ons: ["extra syrup", "whipped cream"],
      },
      {
        id: "2",
        name: "Omelette",
        photo_url: "/placeholder/omelette.jpg",
        description: "Cheesy omelette with veggies",
        rating: 4.6,
        price: 7.99,
        allergies: ["dairy"],
        add_ons: ["extra cheese", "avocado"],
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
        allergies: ["gluten"],
        add_ons: ["extra patty", "bacon"],
      },
      {
        id: "4",
        name: "Caesar Salad",
        photo_url: "/placeholder/salad.jpg",
        description: "Fresh romaine with caesar dressing",
        rating: 4.3,
        price: 9.5,
        allergies: ["dairy"],
        add_ons: ["grilled chicken", "croutons"],
      },
    ],
  },
];

export default function Home() {
  // Modal context for menu item
  const { selectedItem, closeItemModal } = useMenuItemModal();
  // Cart context for adding items to cart
  const { addToCart } = useCartModal();
  // Checkout context for checkout modal
  const { order, closeCheckoutModal } = useCheckout();
  // State for menu items
  const [categories, setCategories] = useState<MenuCategoryInfo[]>(menuData);

  useEffect(() => {
    fetch("http://localhost:4000/api/get-menu-items")
      .then((res) => res.json())
      .then((items: MenuItemInfo[]) => {
        // for now let’s assume you only ever want Breakfast:
        setCategories([
          {
            id: "1",
            name: "All Day",
            menuItems: items,
          },
        ]);
      })
      .catch(console.error);
  }, []);

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

      {selectedItem && (
        <MenuItemModal
          selectedItem={selectedItem}
          closeModal={closeItemModal}
          addToCart={addToCart}
        />
      )}

      {order.length > 0 && (
        <CheckoutModal order={order} closeModal={closeCheckoutModal} />
      )}

      {isMenuView ? (
        isMobile ? (
          <HomeMobile categories={categories} />
        ) : (
          <HomeDesktop categories={categories} />
        )
      ) : (
        <CartPanel />
      )}
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

function HomeDesktop({ categories }: { categories: MenuCategoryInfo[] }) {
  return (
    <div className="flex flex-row w-4/5 space-x-8">
      <div className="grow-4">
        <MenuPanel categories={categories} />
      </div>
      <div className="grow-3">
        <CartPanel />
      </div>
    </div>
  );
}

function HomeMobile({ categories }: { categories: MenuCategoryInfo[] }) {
  return <MenuPanel categories={categories} />;
}
