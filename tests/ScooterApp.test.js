const Scooter = require("../src/Scooter");
const User = require("../src/User");
const ScooterApp = require("../src/ScooterApp");

// ScooterApp tests here

// register user

// log in

// log out

// rent scooter

// dock scooter

describe("ScooterApp", () => {
  let app;

  beforeEach(() => {
    app = new ScooterApp();
  });

  describe("registerUser", () => {
    it("should register a user with valid details", () => {
      const username = "testuser";
      const password = "testpassword";
      const age = 18;
      expect(app.registerUser(username, password, age)).toBe(username);
      expect(app.registeredUsers[username]).toBe(password);
    });

    it("should throw an error when registering an already registered user", () => {
      const username = "testuser";
      const password = "testpassword";
      const age = 18;
      app.registerUser(username, password, age);
      expect(() => app.registerUser(username, password, age)).toThrow(
        "already registered"
      );
    });

    it("should throw an error when registering a user under 18", () => {
      const username = "testuser";
      const password = "testpassword";
      const age = 17;
      expect(() => app.registerUser(username, password, age)).toThrow(
        "too young to registered"
      );
    });
  });

  describe("loginUser", () => {
    it("should log in a registered user with correct details", () => {
      const username = "testuser";
      const password = "testpassword";
      app.registerUser(username, password, 18);
      app.loginUser(username, password);
      expect(User.loggedIn).toBe(true);
    });

    it("should throw an error when logging in with incorrect details", () => {
      const username = "testuser";
      const password = "testpassword";
      expect(() => app.loginUser(username, password)).toThrow(
        "Username or password is incorrect"
      );
    });
  });

  describe("logoutUser", () => {
    it("should log out a logged in user", () => {
      const username = "testuser";
      const password = "testpassword";
      app.registerUser(username, password, 18);
      app.loginUser(username, password);
      app.logoutUser(username);
      expect(User.loggedIn).toBe(false);
    });

    it("should throw an error when logging out a user that is not logged in", () => {
      const username = "testuser";
      expect(() => app.logoutUser(username)).toThrow(
        "no such user is logged in"
      );
    });
  });

  describe("createScooter", () => {
    it("should create a new scooter at a valid station", () => {
      const station = "A";
      const scooter = app.createScooter(station);
      expect(scooter.station).toBe(station);
      expect(app.stations[station]).toContain(scooter);
    });

    it("should throw an error when creating a scooter at an invalid station", () => {
      const station = "D";
      expect(() => app.createScooter(station)).toThrow("no such station");
    });
  });

  describe("dockScooter", () => {
    test("should add a scooter to the station", () => {
      const scooter = new Scooter();
      const station = "A";
      app.dockScooter(scooter, station);
      expect(app.stations[station]).toContain(scooter);
    });

    test("should throw an error if station does not exist", () => {
      const scooter = new Scooter();
      const station = "D";
      expect(() => app.dockScooter(scooter, station)).toThrow(
        "no such station"
      );
    });

    test("should throw an error if scooter is already at the station", () => {
      const scooter = new Scooter();
      const station = "A";
      app.dockScooter(scooter, station);
      expect(() => app.dockScooter(scooter, station)).toThrow(
        "scooter already at station"
      );
    });
  });

  describe("rentScooter", () => {
    test("should remove the scooter from the station and rent it to the user", () => {
      const scooter = new Scooter();
      const user = "John";
      const station = "A";
      app.dockScooter(scooter, station);
      app.rentScooter(scooter, user);
      expect(app.stations[station]).not.toContain(scooter);
      expect(scooter.user).toBe(user);
    });

    test("should throw an error if scooter is not available at any station", () => {
      const scooter = new Scooter();
      const user = "John";
      expect(() => app.rentScooter(scooter, user)).toThrow(
        "scooter not available"
      );
    });

    test("should throw an error if scooter is already rented", () => {
      const scooter = new Scooter();
      const user1 = "John";
      const user2 = "Jane";
      const station = "A";
      app.dockScooter(scooter, station);
      app.rentScooter(scooter, user1);
      expect(() => app.rentScooter(scooter, user2)).toThrow(
        "scooter already rented"
      );
    });
  });
});
