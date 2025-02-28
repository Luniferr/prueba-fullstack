import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = Router();

const MOCK_USER = {
  username: "admin",
  password: "$2b$10$Lf9advBlZC51cCMJWNCXF.Gux9aqzH/sILxsVPxNSuWdNmlNQP4se",
};

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (username !== MOCK_USER.username)
    return res.status(401).json({ error: "Usuario no existe" });

  const match = await bcrypt.compare(password, MOCK_USER.password);
  if (!match) return res.status(401).json({ error: "Contraseña inválida" });

  const token = jwt.sign({ username }, "SECRET_KEY", { expiresIn: "1h" });
  res.json({ token });
});

export default router;
