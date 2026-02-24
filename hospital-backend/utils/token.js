import jwt from "jsonwebtoken";

export const createToken = async (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "1h" });
};
