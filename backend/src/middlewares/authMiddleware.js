import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, "SECRET_KEY", (err, decoded) => {
    if (err)
      return res.status(401).json({ error: "Token inválido o expirado" });
    req.user = decoded;
    next();
  });
};

export default authMiddleware;
