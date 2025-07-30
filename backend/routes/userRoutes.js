import express from "express"
import { login, register } from "../controller/userController.js"
import authenticateToken from '../controller/authMiddleware.js';

const router = express.Router()

router.post("/login", authenticateToken, login)

router.post("/register", register)

export default router