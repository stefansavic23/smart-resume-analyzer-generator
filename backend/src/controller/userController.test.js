import { jest } from "@jest/globals"
import { login } from "./userController.js"

jest.mock("bcrypt", () => ({
    ...jest.requireActual("bcrypt"), // Use the actual implementation for everything else
    compare: jest.fn(), // But specifically mock the 'compare' function
}));

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../model/User.js"
//import checkEmail from "../utils/checkEmail.js"
//import checkPassword from "../utils/checkPassword.js"

const checkEmail = jest.fn()
const checkPassword = jest.fn()

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

    it("should return 400 if password is invalid", async () => {
        checkPassword.mockReturnValue(false)

        await login(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith("Invalid Password")
    })

    it("should return 400 if email is invalid", async () => {
        checkEmail.mockReturnValue(false)

        await login(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith("Invalid email")
    })

    it("should return 404 if user does not exist", async () => {
        checkEmail.mockReturnValue(true)
        checkPassword.mockReturnValue(true)
        const UserMock = jest.fn().mockResolvedValue(User.findOne())

        await UserMock()
        await login(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith("Invalid Password")
    })

    it("should return 401 if password is incorrect", async () => {
        checkEmail.mockReturnValue(true)
        checkPassword.mockReturnValue(true)
        const UserMock = jest.fn().mockResolvedValue({ id: 1, email: "test@example.com", password: "hash" })

        await UserMock()

        await login(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith("Invalid Password")

    })

    it("should return 201 with accessToken if login is successful", async () => {
        checkEmail.mockReturnValue(true)
        checkPassword.mockReturnValue(true)
        const UserMock = jest.fn().mockResolvedValue({ id: 1, email: "test@example.com", password: "hash" })

        await UserMock()

        jwt.sign.mockReturnValue("mockedToken")

        await login(req, res)

        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith("mockedToken")
    })
})