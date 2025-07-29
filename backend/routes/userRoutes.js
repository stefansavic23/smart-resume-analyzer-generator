import express from "express"
import { login, register } from "../controller/userController.js"
import verifyToken from '../controller/authMiddleware.js';

const router = express.Router()

router.post("/login", verifyToken, login)

router.post("/register", register)

export default router