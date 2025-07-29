import 'dotenv/config'

import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from '../model/user.js'

const login = async (req, res) => {
    try {
        await sequelize.sync({ force: true });

        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Authentication failed" })
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(401).json({ message: "Authentication failed" })
        }

        const token = jwt.sign({ "user_id": user.id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })
        res.status(200).json({ token })
    } catch (error) {
        res.status(500).json({ message: "Login failed" })
    }
}

const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ email: email, password: hashedPassword })

        res.status(201).json({ message: "User registered successfully" })
    } catch (error) {
        res.status(500).json({ message: "Registration failed", error })
    }
}

export { login, register }