import { Response } from "express";
import jwt from "jsonwebtoken";

const generateToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET_KEY!, { expiresIn: "1d" });
};
export const setCookie = (userId: string, res: Response) => {
  const token = generateToken(userId);
  res.cookie("token", token, {
    maxAge: 24 * 60 * 3600,
    httpOnly: true,
    sameSite: "strict",
    secure: false,
  });
};

export const getAvatar = (firstName: string, lastName: string) => {
  return `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`;
};

export function omitFields<T, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  // Create a new object by copying the input object
  const newObj = { ...obj };

  // Loop through the keys to remove them from the new object
  keys.forEach((key) => {
    delete newObj[key];
  });

  return newObj;
}
