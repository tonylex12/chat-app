import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true, // Prevents access to the cookie via JavaScript
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    secure: process.env.NODE_ENV !== "development", // Only set cookie in production
    sameSite: "strict", // Prevents CSRF attacks
  });

  return token;
};
