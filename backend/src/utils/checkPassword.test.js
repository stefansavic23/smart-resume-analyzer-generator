import checkPassword from "./checkPassword.js";

test("should return true for correct password", () => {
    expect(checkPassword("Test1234")).toBe(true)
})

test("should return false for incorrect password", () => {
    expect(checkPassword("incorrectPassword")).toBe(false)
})

