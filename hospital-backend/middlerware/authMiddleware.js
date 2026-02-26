import jwt from "jsonwebtoken";
import { userModel } from "../model/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.toLowerCase().startsWith("bearer ")) {
      console.log("Auth Error: Missing or malformed Authorization header");
      return res.status(401).json({ success: false, message: "Login required" });
    }

    const token = authHeader.split(/\s+/)[1];
    
    if (!token) {
      console.log("Auth Error: Token split failed");
      return res.status(401).json({ success: false, message: "Invalid token format" });
    }

    const secret = process.env.JWT_SECRET?.replace(/['"]/g, ""); // Strip quotes if present

    if (!secret) {
      console.error("CRITICAL: JWT_SECRET is missing!");
      return res.status(500).json({ success: false, message: "Server configuration error" });
    }

    const decoded = jwt.verify(token, secret);

    if (!decoded || !decoded.id) {
      console.log("Auth Error: Token decoded but no ID found");
      return res.status(401).json({ success: false, message: "Invalid token payload" });
    }

    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) {
      console.log("Auth Error: User not found for ID:", decoded.id);
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    const message = error.name === "TokenExpiredError" ? "Token expired" : "Invalid token";
    return res.status(401).json({ success: false, message: message, error: error.message });
  }
};
