export interface Allergies {
  id: string; // Firestore document ID
  name: string; // Allergy name (e.g., "Peanuts")
}

export interface MenuItem {
  id: string; // Firestore document ID
  name: string;
  description: string;
  price: number;
  photo_url: string;
  allergies: string[];
  add_ons: string[];
}

export interface AddOn {
  id: string; // Firestore document ID
  name: string;
  price: number;
}

export interface Photos {
  id: string; // Firestore document ID
  url: string;
  menuItemId: string; // Reference to MenuItem
}

export interface RestaurantCategories {
  id: string; // Firestore document ID
  name: string;
  menuItems: string[]; // Array of MenuItem IDs
}

export interface OrderItems {
  menuItem: MenuItem;
  quantity: number;
}

export interface Restaurant {
  id: string;  // Firestore document ID
  name: string;
  location: string;
}

export interface Tables {
  id: string; // Firestore document ID
  number: number;
  capacity: number;
}

export interface Orders {
  id: string;  // Firestore document ID
  employeeId: string;
  tableId: string;
  items: MenuItem[];
}

export interface Employee {
  id: string; // Firestore document ID
  name: string;
  role: string;
  orders: string[]; // Array of order IDs
}

export interface EmployeeWorkplace {
  id: string; // Firestore document ID
  name: string;
  location: string;
  employees: Employee[];
}

