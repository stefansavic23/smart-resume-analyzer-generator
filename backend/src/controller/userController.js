import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../model/User.js"
import checkEmail from '../utils/checkEmail.js'
import checkPassword from '../utils/checkPassword.js'
import { ACCESS_TOKEN_SECRET } from "../constants/tokens.js"
import errorHandler from "./errorHandler.js"

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (checkPassword(password) === false) {
            return res.status(400).json("Invalid Password");
        }

        if (checkEmail(email) === false) {
            return res.status(400).json("Invalid email");
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json("User doesn't exist");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json("Invalid Password");
        }

        const userData = {
            email,
            password,
            userId: user.id
        };
        const accessToken = jwt.sign(userData, ACCESS_TOKEN_SECRET);

        return res.status(201).json({ accessToken: accessToken });

    } catch (error) {
        errorHandler(error);
    }
};

const register = async (req, res) => {
    try {
        const { email, password } = req.body

        if (checkEmail(email) === false) {
            return res.status(400).json("Invalid email")
        }

        if (checkPassword(password) === false) {
            return res.status(400).json("Invalid password")
        }

        const hashedPassword = bcrypt.hash(password, 10)
        const userData = { email, hashedPassword }

        const user = await User.create({ email, password: (await hashedPassword).toString() })

        userData["userId"] = user.id

        const accessToken = jwt.sign(userData, ACCESS_TOKEN_SECRET)

        await user.save()
        res.status(201).json({ accessToken: accessToken })
    } catch (error) {
        errorHandler(error)
    }
}

export { login, register }