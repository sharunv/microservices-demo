const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];

app.get("/users", (req, res) => res.json(users));

app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  user ? res.json(user) : res.status(404).json({ error: "User not found" });
});

app.listen(PORT, () => console.log(`👤 Users service running on port ${PORT}`));
