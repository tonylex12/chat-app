import express from "express";
import {
  getMessages,
  getUsers,
  markMessageAsSeen,
  sendMessage,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/users", protectRoute, getUsers);

router.get("/:id", protectRoute, getMessages);

router.put("/mark/:id", protectRoute, markMessageAsSeen);

router.post("/send/:id", protectRoute, sendMessage);

export default router;
