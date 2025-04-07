import { useState, useEffect } from "react";
import { db } from "../config/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import type { MenuItemInfo as MenuItemType } from "../types/types";
import userAuth from "@app/components/auth/userAuth";
import NoPermission from "@app/error/401";

export default function AddMenuItem() {
  const { user } = userAuth();
  if (!user) {
    return <NoPermission />;
  }
  const [menuItem, setMenuItem] = useState<MenuItemType>({
    id: "",
    name: "",
    description: "",
    price: 0,
    rating: 0,
    photo_url: "",
  });
  const [file, setFile] = useState<File | null>(null); // To hold the uploaded file
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]); // State to hold the list of menu items

  // Fetch current menu items from Firestore
  useEffect(() => {
    const fetchMenuItems = async () => {
      const querySnapshot = await getDocs(collection(db, "menu_items"));
      const items: MenuItemType[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as MenuItemType);
      });
      setMenuItems(items);
    };
    fetchMenuItems();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMenuItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if a file was uploaded
    if (!file) {
      alert("Please upload a photo");
      return;
    }

    try {
      // Upload the file to Firebase Storage
      const storage = getStorage();
      const fileRef = ref(storage, `menu_photos/${file.name}`);
      await uploadBytes(fileRef, file);

      // Get the download URL
      const downloadURL = await getDownloadURL(fileRef);

      // Add the menu item to Firestore with the download URL for the photo
      const docRef = await addDoc(collection(db, "menu_items"), {
        name: menuItem.name,
        description: menuItem.description,
        price: parseFloat(menuItem.price.toString()),
        rating: parseFloat(menuItem.rating.toString()),
        photo_url: downloadURL, // Save the file URL
      });

      console.log("Document written with ID: ", docRef.id);

      // Reset the form
      setMenuItem({
        id: "",
        name: "",
        description: "",
        price: 0,
        rating: 0,
        photo_url: "",
      });
      setFile(null); // Reset the file input

      // Re-fetch the menu items to include the newly added one
      const updatedMenuItems = [
        ...menuItems,
        { ...menuItem, photoUrl: downloadURL },
      ];
      setMenuItems(updatedMenuItems);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col justify-center items-center">
      <div className="p-4 rounded-lg shadow-md w-100 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-stone-900">Add Menu Item</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <label className="text-stone-700 mt-4">Name</label>
          <input
            name="name"
            value={menuItem.name}
            onChange={handleChange}
            type="text"
            className="p-2 border border-stone-300 rounded-md"
          />
          <label className="text-stone-700 mt-4">Description</label>
          <input
            name="description"
            value={menuItem.description}
            onChange={handleChange}
            type="text"
            className="p-2 border border-stone-300 rounded-md"
          />
          <label className="text-stone-700 mt-4">Price</label>
          <input
            name="price"
            value={menuItem.price}
            onChange={handleChange}
            type="number"
            className="p-2 border border-stone-300 rounded-md"
          />
          <label className="text-stone-700 mt-4">Rating</label>
          <input
            name="rating"
            value={menuItem.rating}
            onChange={handleChange}
            type="number"
            className="p-2 border border-stone-300 rounded-md"
          />
          <label className="text-stone-700 mt-4">Upload Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="p-2 border border-stone-300 rounded-md"
          />
          <button
            className="p-2 mt-4 bg-stone-700 text-white rounded-md"
            type="submit"
          >
            Add Item
          </button>
        </form>
      </div>

      {/* Display current menu items */}
      <div className="mt-10 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-stone-900">
          Current Menu Items
        </h2>
        <ul className="space-y-4 mt-4">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className="p-4 border border-stone-300 rounded-md shadow-md"
            >
              <h3 className="font-bold text-lg">{item.name}</h3>
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
              <p>Rating: {item.rating}</p>
              <img
                src={item.photo_url}
                alt={item.name}
                className="mt-2 w-32 h-32 object-cover"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
