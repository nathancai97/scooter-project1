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
    user = new User("nathan", "password123", 25);
  });

  test("should create a new user with the correct properties", () => {
    expect(user.username).toBe("nathan");
    expect(user.password).toBe("password123");
    expect(user.age).toBe(25);
    expect(user.loggedIn).toBe(false);
  });

  test("should be able to log in with the correct password", () => {
    user.login("password123");
    expect(user.loggedIn).toBe(true);
  });

  test("should throw an error when logging in with an incorrect password", () => {
    expect(() => {
      user.login("password12");
    }).toThrow("incorrect password");
    expect(user.loggedIn).toBe(false);
  });

  test("should be able to log out", () => {
    user.login("password123");
    user.logout();
    expect(user.loggedIn).toBe(false);
  });
});
