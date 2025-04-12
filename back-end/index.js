import cors from "cors";
import admin from "firebase-admin";
import dotenv from "dotenv";
import express from "express";
import { createRequire } from "module";
import { getFirestore } from "firebase-admin/firestore";

// Load env vars
dotenv.config();
const app = express();
// Load Firebase Admin credentials
const require = createRequire(import.meta.url);
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = getFirestore();

app.use(
  cors({
    origin: [
      "http://localhost:8000",
      "http://localhost:5173",
      "http://localhost:3000",
    ],
  })
);
app.use(express.json());

// Route to delete a user
app.post("/api/delete-user", async (req, res) => {
  console.log("Received request to delete user:", req.body);
  const { uid, id } = req.body;
  if (!uid || !id) {
    return res.status(400).json({ error: "Missing uid or id" });
  }
  const docRef = db.collection("employees").doc(id);
  try {
    await admin.auth().deleteUser(uid);
    console.log(`✅ Auth user ${uid} deleted.`);

    await docRef.delete();
    console.log(`✅ Firestore doc ${id} deleted.`);

    return res
      .status(200)
      .json({ message: `User ${uid} and document ${id} deleted.` });
  } catch (error) {
    console.error("❌ Error deleting user or document:", error);
    return res.status(500).json({ error: error.message });
  }
});

app.post("/api/add-user", async (req, res) => {
  console.log("Received request to add user:", req.body);
  const { email, password, name, role, uid } = req.body;
  if (!email || !password || !name || !role) {
    return res.status(400).json({ error: "Missing email, password or name" });
  }
  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      name,
    });
    console.log(`✅ Auth user ${userRecord.uid} created.`);

    const docRef = db.collection("employees").doc(userRecord.uid);
    await docRef.set({
      name: name,
      email: email,
      uid: userRecord.uid,
      role: role,
      password: password,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log(`✅ Firestore doc ${userRecord.uid} created.`);

    return res.status(200).json({ message: `User ${userRecord.uid} created.` });
  } catch (error) {
    console.error("❌ Error creating user or document:", error);
    return res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Nom Square Server is running.");
});

app.post("/api/get-users", async (req, res) => {
  const { id, uid } = req.body;
  if (!id || !uid) {
    return res.status(400).json({ error: "Missing id or uid" });
  }
  console.log("Received request to get users:", req.body);
  try {
    const snapshot = await db.collection("employees").get();
    const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log(`✅ Retrieved ${users.length} users.`);

    return res.status(200).json(users);
  } catch (error) {
    console.error("❌ Error retrieving users:", error);
    return res.status(500).json({ error: error.message });
  }
});

app.post("/api/update-user", async (req, res) => {
  console.log("Received request to update user:", req.body);
  const { uid, name, email, role } = req.body;
  if (!uid || !name || !email || !role) {
    return res.status(400).json({ error: "Missing uid, name, email or role" });
  }

  try {
    const docRef = db.collection("employees").doc(uid);
    await docRef.update({
      name: name,
      email: email,
      role: role,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log(`✅ Firestore doc ${uid} updated.`);

    return res.status(200).json({ message: `User ${uid} updated.` });
  } catch (error) {
    console.error("❌ Error updating user or document:", error);
    return res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
