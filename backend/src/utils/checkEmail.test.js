import checkEmail from "./checkEmail.js";

test('should return true for valid email', () => {
    expect(checkEmail("test@example.com")).toBe(true)
})

test('should return false for invalid email', () => {
    expect(checkEmail("invalid-email")).toBe(false)
})