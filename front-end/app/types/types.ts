export interface AllergyInfo {
  id: string; // Firestore document ID
  name: string; // Allergy name (e.g., "Peanuts")
}

export interface MenuItemInfo {
  id: string; // Firestore document ID
  name: string;
  description: string;
  price: number;
  rating: number;
  photo_url: string;
  // allergies: Allergies[];
  // add_ons: AddOn[];
}

export interface AddOnInfo {
  id: string; // Firestore document ID
  name: string;
  price: number;
}

export interface PhotoInfo {
  id: string; // Firestore document ID
  url: string;
  menuItemId: string; // Reference to MenuItem
}

export interface MenuCategoryInfo {
  id: string; // Firestore document ID
  name: string;
  menuItems: MenuItemInfo[]; // Array of MenuItem IDs
}

export interface CartItemInfo {
  menuItem: MenuItemInfo;
  quantity: number;
  options: string[];
}

export interface RestaurantInfo {
  id: string;  // Firestore document ID
  name: string;
  location: string;
}

export interface TableInfo {
  id: string; // Firestore document ID
  number: number;
  capacity: number;
}

export interface OrderInfo {
  id: string;  // Firestore document ID
  employeeId: string;
  tableId: string;
  items: MenuItemInfo[];
}

export interface EmployeeInfo {
  id: string; // Firestore document ID
  name: string;
  role: string;
  orders: string[]; // Array of order IDs
}

export interface EmployeeWorkplaceInfo {
  id: string; // Firestore document ID
  name: string;
  location: string;
  employees: EmployeeInfo[];
}

export interface CreateEmployeeAccountInfo {
  name: string;
  email: string;
  password: string;
  role: "Admin" | "Manager" | "Waiter" | "Chef";
}
