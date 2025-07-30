import 'dotenv/config'

import jwt from "jsonwebtoken"
import bcrypt, { hashSync } from "bcrypt"
import User from '../model/user.js'

const login = async (req, res) => {
   
}

const register = async (req, res) => {
    try {
        const { email, password } = req.body
        const hashedPassword = bcrypt.hash(password, 10)
        const userData = { email, hashedPassword }

        const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.create({ email, password: hashedPassword })

        await user.save()
        res.status(201).json({ accessToken: accessToken })
    } catch (err) {
        res.status(500).json({ message: "Registration failed", err })
    }
}

export { login, register }