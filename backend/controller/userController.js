import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const login = async (req, res) => {
    try {
        const { email, password } = reg.body;
        // after find user in DB
        let user;
        if (!user) {
            return res.status(401).json({ message: "Authentication failed" })
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(401).json({ message: "Authentication failed" })
        }

        const token = jwt.sign({ "user_id": user.id }, 'your-secret-key', { expiresIn: "1h" })
        res.status(200).json({ token })
    } catch (error) {
        res.status(500).json({ message: "Login failed" })
    }
}

const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = bcrypt.hash(password, 10)

        // after save user to DB
        res.status(201).json({ message: "User registered successfully" })
    } catch (error) {
        res.status(500).json({ mesage: "Registration failed" })
    }
}

export { login, register }