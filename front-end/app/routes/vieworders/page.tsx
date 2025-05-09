import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "~/app/config/firebaseConfig";

type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
  rating: number;
  photo_url: string;
  add_ons?: string[];
  allergies?: string[];
};

type OrderItem = {
  quantity: number;
  options?: string[];
  menuItem: MenuItem;
};

type Order = {
  id: string;
  accountName: string;
  createdAt?: any;
  orderItems: OrderItem[];
};

export default function ViewOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [optionInput, setOptionInput] = useState<string[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const snapshot = await getDocs(collection(db, "orders"));
      const fetchedOrders: Order[] = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<Order, "id">),
      }));
      setOrders(fetchedOrders);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "orders", id));
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  const handleEdit = (order: Order) => {
    setEditingOrder(order);
  };

  const handleSave = async () => {
    if (!editingOrder) return;

    const ref = doc(db, "orders", editingOrder.id);
    await updateDoc(ref, {
      accountName: editingOrder.accountName,
      orderItems: editingOrder.orderItems,
    });

    setOrders((prev) =>
      prev.map((o) => (o.id === editingOrder.id ? editingOrder : o))
    );
    setEditingOrder(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-stone-900 mb-6 text-5xl font-pacifico flex flex-col items-center">
        View Orders
      </h1>
      {editingOrder && (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-300 max-w-xl mx-auto mb-10">
          <h2 className="text-2xl font-bold mb-4 text-stone-900">Edit Order</h2>
          <label className="block mb-2 text-sm font-medium text-stone-700">
            Customer Name
          </label>
          <input
            className="w-full p-2 border rounded-md mb-4"
            value={editingOrder.accountName}
            onChange={(e) =>
              setEditingOrder((prev) =>
                prev ? { ...prev, accountName: e.target.value } : prev
              )
            }
          />

          {editingOrder.orderItems.map((item, idx) => (
            <div key={idx} className="mb-4">
              <label className="text-sm font-medium text-stone-700">
                {item.menuItem.name} — Quantity
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded-md"
                value={item.quantity}
                onChange={(e) => {
                  const qty = parseInt(e.target.value);
                  setEditingOrder((prev) => {
                    if (!prev) return prev;
                    const updated = [...prev.orderItems];
                    updated[idx].quantity = qty;
                    return { ...prev, orderItems: updated };
                  });
                }}
              />
              <label className="text-sm font-medium text-stone-700 mt-2 block">
                Options
              </label>
              <input
                className="w-full p-2 border rounded-md"
                value={
                  optionInput[idx] !== undefined
                    ? optionInput[idx]
                    : item.options?.join(", ") || ""
                }
                onChange={(e) => {
                  const opts = e.target.value;
                  setOptionInput((prev) => {
                    const updated = [...prev];
                    updated[idx] = opts;
                    return updated;
                  });
                }}
                onBlur={() => {
                  setEditingOrder((prev) => {
                    if (!prev) return prev;
                    const updated = [...prev.orderItems];
                    updated[idx].options =
                      optionInput[idx]
                        ?.split(",")
                        .map((str) => str.trim())
                        .filter(Boolean) || [];
                    return { ...prev, orderItems: updated };
                  });
                }}
              />
            </div>
          ))}

          <div className="flex justify-between mt-6">
            <button
              onClick={() => setEditingOrder(null)}
              className="bg-gray-300 text-black px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {orders.length === 0 ? (
        <p className="text-stone-700">No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div
            key={order.id}
            className="bg-white rounded-lg shadow-md p-4 mb-6 border border-stone-300"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">Order {index + 1}</h2>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(order)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(order.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="text-stone-600 italic mb-2">
              Placed by: {order.accountName}
            </p>
            <ul className="mt-2">
              {order.orderItems.map((item, idx) => (
                <li key={idx} className="mb-3">
                  <div className="font-semibold text-stone-800">
                    {item.quantity}x {item.menuItem.name}
                  </div>
                  {(item.options ?? []).length > 0 && (
                    <div className="text-sm">
                      Custom: + {(item.options ?? []).join(" + ")}
                    </div>
                  )}
                  {item.menuItem.add_ons &&
                    item.menuItem.add_ons.length > 0 && (
                      <div className="text-sm text-blue-700">
                        Add-ons: {item.menuItem.add_ons.join(", ")}
                      </div>
                    )}
                  {(item.menuItem.allergies ?? []).filter(Boolean).length >
                    0 && (
                    <div className="text-sm text-red-600">
                      ⚠ Allergies:{" "}
                      {(item.menuItem.allergies ?? [])
                        .filter(Boolean)
                        .join(", ")}
                    </div>
                  )}
                  {item.menuItem.description && (
                    <div className="text-xs italic text-gray-500">
                      {item.menuItem.description}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
