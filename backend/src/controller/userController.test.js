import { jest } from "@jest/globals"
import { login } from "./userController.js"

jest.mock("bcrypt", () => ({
    compare: jest.fn(),
    // Add any other bcrypt functions you might use, like `hash`
    // hash: jest.fn()
}));

import User from "../model/User.js"
//import checkEmail from "../utils/checkEmail.js"
//import checkPassword from "../utils/checkPassword.js"

const checkEmail = jest.fn()
const checkPassword = jest.fn()


jest.mock("jsonwebtoken")
jest.mock("../model/User.js")
jest.mock("../utils/checkEmail.js")
jest.mock("../utils/checkPassword.js")

const jwt = (await import("jsonwebtoken")).default;
const bcrypt = (await import("bcrypt")).default;

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
        expect(res.json).toHaveBeenCalledWith("Invalid Password")
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
        checkPassword.mockReturnValue(true)
        await login(req, res)

        const UserMock = jest.fn().mockResolvedValue({ id: 1, email: "test@example.com", password: "hash" })

        await UserMock()

        bcrypt.compare.mockResolvedValue(true);

        jwt.sign.mockReturnValue("accessToken")

        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith("accessToken")
    })
})