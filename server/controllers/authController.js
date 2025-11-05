const bcrypt = require("bcrypt");
const userService = require("../services/userService");

const SALT_ROUNDS = 10;

async function signup(req, res) {
  try {
    const { name, password, role } = req.body;
    if (!name || !password)
      return res.status(400).json({ error: "name and password required" });
    if (!["teacher", "student"].includes(role))
      return res.status(400).json({ error: "role must be teacher or student" });

    const existing = await userService.findByName(name);
    if (existing)
      return res.status(400).json({ error: "user name already exists" });

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await userService.createUser({ name, passwordHash, role });

    return res.status(201).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "internal server error" });
  }
}

async function login(req, res) {
  try {
    const { name, password } = req.body;
    if (!name || !password)
      return res.status(400).json({ error: "name and password required" });

    const user = await userService.findByName(name);
    if (!user) return res.status(401).json({ error: "invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "invalid credentials" });

    return res.json({
      id: user._id.toString(),
      name: user.name,
      role: user.role,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "internal server error" });
  }
}

module.exports = {
  signup,
  login,
};