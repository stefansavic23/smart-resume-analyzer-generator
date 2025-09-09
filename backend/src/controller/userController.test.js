import {jest} from "@jest/globals"
import { login } from "./userController.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../model/User.js"
import checkEmail from "../utils/checkEmail.js"
import checkPassword from "../utils/checkPassword.js"

jest.mock("bcrypt")
jest.mock("jsonwebtoken")
jest.mock("../model/User.js")
jest.mock("../utils/checkEmail.js")
jest.mock("../utils/checkPassword.js")


describe("login", () => {
    let req, res;

    beforeEach(() => {
        req = { body: { email: "test@example.com", password: "secret" } };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        jest.clearAllMocks()
    })

    it("should return 400 if email is invalid", async () => {
        checkEmail.mockReturnValue(false)

        await login(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ message: "Invalid email" })
    })

    it("should return 400 if password is invalid", async () => {
        checkEmail.mockReturnValue(true)
        checkPassword.mockReturnValue(false)

        await login(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ message: "Invalid password" })
    })

    it("should return 404 if user does not exist", async () => {
        checkEmail.mockReturnValue(true)
        checkPassword.mockReturnValue(true)
        User.findOne.mockResolvedValue()

        await login(req, res)

        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({ message: "User doesn't exist" })
    })

    it("should return 401 if password is incorrect", async () => {
        checkEmail.mockReturnValue(true)
        checkPassword.mockReturnValue(true)
        User.findOne.mockResolvedValue({ id: 1, email: "test@example.com", password: "hash" })
        bcrypt.compare.mockImplementation((pw, hashed, cb) => cb(null, false))

        await login(req, res)

        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({ message: "Incorrect password" })

    })

    it("should return 201 with accessToken if login is successful", async () => {
        checkEmail.mockReturnValue(true)
        checkPassword.mockReturnValue(true)
        User.findOne.mockResolvedValue({ id: 1, email: "test@example.com", password: "hashed" })
        bcrypt.compare.mockImplementation((pw, hashed, cb) => cb(null, true))
        jwt.sign.mockReturnValue("mockedToken")

        await login(req, res)

        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith({ accessToken: "mockedToken" })
    })
})