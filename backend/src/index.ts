// server Rest Api - Real Time
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import createRouter from "./routes";
import { app, server } from "./socket";
import { FRONT_URL } from "./utils/constant";

const port = process.env.PORT || 3001;
const router = createRouter();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use("/api", router);

server.listen(port, () =>
  console.log(`🚀 Server listening at http://localhost:${port}`)
);
