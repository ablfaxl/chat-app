import { Router } from "express";
import { sendMessage, getMessages } from "../controller/message";
import { privateRoute } from "../middlewares/privateRoute";

const messageRouter = Router();

messageRouter.post("/send/:receiverId", privateRoute, sendMessage);
messageRouter.get("/:receiverId", privateRoute, getMessages);

export default messageRouter;
