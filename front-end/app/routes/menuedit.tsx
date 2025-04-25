import { useState, useEffect } from "react";
import type { MenuItemInfo as MenuItemType } from "../types/types";
import userAuth from "@app/components/auth/userAuth";
import NoPermission from "@app/error/401";

export default function AddMenuItem() {
  const { user } = userAuth();
  if (!user) return <NoPermission />;

  const [menuItem, setMenuItem] = useState<MenuItemType>({
    id: "",
    name: "",
    description: "",
    price: 0,
    rating: 0,
    photo_url: "",
    allergies: [],
    add_ons: [],
  });

  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/get-menu-items")
      .then((res) => res.json())
      .then((data) => setMenuItems(data))
      .catch((err) =>
        console.error("❌ Failed to fetch menu items:", err.message)
      );
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setMenuItem((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `http://localhost:4000/api/update-menu-item/${editingId}`
      : "http://localhost:4000/api/add-menu-item";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...menuItem, photo_url: "" }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed");

      if (isEditing) {
        setMenuItems((prev) =>
          prev.map((item) =>
            item.id === editingId ? { ...menuItem, id: editingId } : item
          )
        );
        setSuccessMsg("Menu item updated!");
      } else {
        setMenuItems((prev) => [...prev, { ...menuItem, id: result.id }]);
        setSuccessMsg("Menu item added!");
      }

      setMenuItem({
        id: "",
        name: "",
        description: "",
        price: 0,
        rating: 0,
        photo_url: "",
        allergies: [],
        add_ons: [],
      });
      setIsEditing(false);
      setEditingId(null);
    } catch (err) {
      console.error("❌ Error submitting menu item:", err);
      alert("Failed to submit item.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:4000/api/delete-menu-item/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");

      setMenuItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("❌ Error deleting item:", err);
    }
  };

  return (
    <div className="flex flex-col items-center px-4">
      <h1 className="text-5xl font-pacifico mt-10 mb-6 text-center text-stone-900">
        {isEditing ? "Edit Menu Item" : "Add Menu Item"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-lg flex flex-col gap-4"
      >
        <input
          name="name"
          value={menuItem.name}
          onChange={handleChange}
          placeholder="Name"
          className="p-3 border border-stone-300 rounded-md"
          required
        />
        <input
          name="description"
          value={menuItem.description}
          onChange={handleChange}
          placeholder="Description"
          className="p-3 border border-stone-300 rounded-md"
          required
        />
        <input
          name="price"
          value={menuItem.price || ""}
          onChange={handleChange}
          type="number"
          placeholder="Price (e.g. 8.99)"
          className="p-3 border border-stone-300 rounded-md"
          required
        />
        <input
          name="rating"
          value={menuItem.rating || ""}
          onChange={handleChange}
          type="number"
          placeholder="Rating (1 to 5)"
          className="p-3 border border-stone-300 rounded-md"
        />
        <input
          name="allergies"
          value={menuItem.allergies.join(", ")}
          onChange={(e) =>
            setMenuItem((prev) => ({
              ...prev,
              allergies: e.target.value.split(",").map((a) => a.trim()),
            }))
          }
          placeholder="Allergies (comma separated)"
          className="p-3 border border-stone-300 rounded-md"
        />
        <input
          name="add_ons"
          value={menuItem.add_ons.join(", ")}
          onChange={(e) =>
            setMenuItem((prev) => ({
              ...prev,
              add_ons: e.target.value.split(",").map((a) => a.trim()),
            }))
          }
          placeholder="Add-ons (comma separated)"
          className="p-3 border border-stone-300 rounded-md"
        />
        <button
          type="submit"
          className="bg-stone-800 text-white py-3 rounded-md text-lg hover:bg-stone-700 transition"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? isEditing
              ? "Updating..."
              : "Adding..."
            : isEditing
            ? "Update Item"
            : "Add Item"}
        </button>

        {successMsg && (
          <p className="text-green-600 font-medium text-center mt-2">{successMsg}</p>
        )}
      </form>

      <div className="mt-12 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-stone-800">
          Current Menu Items
        </h2>
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className="p-4 border border-gray-300 rounded-md bg-white shadow-sm flex justify-between items-start"
            >
              <div>
                <h3 className="text-lg font-semibold text-stone-900">
                  {item.name}
                </h3>
                <p className="text-sm text-stone-700">{item.description}</p>
                <p className="text-sm text-stone-700">
                  Price: ${item.price || "N/A"} | Rating: {item.rating || "N/A"}
                </p>
                <p className="text-sm text-stone-700">
                  Allergies: {item.allergies?.join(", ") || "None"}
                </p>
                <p className="text-sm text-stone-700">
                  Add-ons: {item.add_ons?.join(", ") || "None"}
                </p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => {
                    setMenuItem(item);
                    setIsEditing(true);
                    setEditingId(item.id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
