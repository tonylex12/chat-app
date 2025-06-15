import express from "express";
import {
  getMessages,
  getUnseenMessages,
  getUsers,
  sendMessage,
  updateSeenStatus,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/users", protectRoute, getUsers);

router.get("/seen", protectRoute, getUnseenMessages);

router.get("/:id", protectRoute, getMessages);

router.post("/send/:id", protectRoute, sendMessage);

router.put("/seen/:messageId", protectRoute, updateSeenStatus);

export default router;
