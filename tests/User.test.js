const User = require("../src/User");

// User tests here

// test username

// test password

// test age

// test login

// test logout

describe("User", () => {
  let user;

  beforeEach(() => {
    user = new User("johndoe", "password123", 30);
  });

  it("should create a new user with the correct properties", () => {
    expect(user.username).toBe("johndoe");
    expect(user.password).toBe("password123");
    expect(user.age).toBe(30);
    expect(user.loggedIn).toBe(false);
  });

  it("should be able to log in with the correct password", () => {
    user.login("password123");
    expect(user.loggedIn).toBe(true);
  });

  it("should throw an error when logging in with an incorrect password", () => {
    expect(() => {
      user.login("incorrectpassword");
    }).toThrow("Incorrect password");
    expect(user.loggedIn).toBe(false);
  });

  it("should be able to log out", () => {
    user.login("password123");
    user.logout();
    expect(user.loggedIn).toBe(false);
  });
});
