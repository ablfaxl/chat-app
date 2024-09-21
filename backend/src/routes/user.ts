import { privateRoute } from "./../middlewares/privateRoute";
import { Router } from "express";
import { getUsers, signIn, signOut, signUp } from "../controller/user";

const userRouter = Router();

userRouter.post("/signup", signUp);
userRouter.post("/signin", signIn);
userRouter.post("/signout", signOut);
userRouter.get("/", privateRoute, getUsers);

export default userRouter;
