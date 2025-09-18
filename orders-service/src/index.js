const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 5000;
const USERS_SERVICE_URL = process.env.USERS_SERVICE_URL || "http://users-service:4000";

const orders = [
  { id: 101, userId: 1, product: "Laptop" },
  { id: 102, userId: 2, product: "Phone" }
];

app.get("/orders", async (req, res) => {
  try {
    const { data: users } = await axios.get(`${USERS_SERVICE_URL}/users`);
    const ordersWithUsers = orders.map(order => ({
      ...order,
      user: users.find(u => u.id === order.userId)
    }));
    res.json(ordersWithUsers);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch users" });
  }
});

app.listen(PORT, () => console.log(`📦 Orders service running on port ${PORT}`));
