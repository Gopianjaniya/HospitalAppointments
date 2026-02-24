import bcrypt from "bcrypt";

export const hassPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password, hashPass) => {
  return await bcrypt.compare(password, hashPass);
};
