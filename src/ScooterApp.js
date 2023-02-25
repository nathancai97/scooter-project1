const User = require("./User");
const Scooter = require("./Scooter");

class ScooterApp {
  // ScooterApp code here
  constructor() {
    this.stations = {
      A: [],
      B: [],
      C: [],
    };
    this.registeredUsers = {};
  }

  registerUser(username, password, age) {
    if (!(username in this.registeredUsers) && age >= 18) {
      const user = new User(username, password, age);
      this.registeredUsers[username] = password;
      console.log(`user has been registered`);
      return user.username;
    } else if (username in this.registeredUsers) {
      throw new Error(`already registered`);
    } else {
      throw new Error(`too young to registered`);
    }
  }

  loginUser(username, password) {
    const user = this.registeredUsers[username];
    if (user) {
      user.login(password);
      console.log(`User ${username} has been logged in.`);
    } else {
      throw new Error("Username or password is incorrect.");
    }
  }

  logoutUser(username) {
    if (username in this.registeredUsers) {
      this.registeredUsers[username].logout()
      // user.logout();
      console.log(`user is logged out`);
    } else {
      throw new Error(`no such user is logged in`);
    }
  }

  createScooter(station) {
    if(station in this.stations) {
      const newScooter = new Scooter(station);
      this.stations[station].push(newScooter);
      console.log(`created new scooter`);
      return newScooter;
    } else {
      throw new Error(`no such station`);
    }
  }

  dockScooter(scooter, station) {
    if(!(station in this.stations)) {
      throw new Error(`no such station`);
    }
    if(this.stations[station].indexOf(scooter) === -1) {
      this.stations[station].push(scooter);
      Scooter.dock(station);
      console.log(`scooter is docked`);
    } else {
      throw new Error(`scooter already at station`);
    }
  }

  rentScooter(scooter, user) {
    for(let key in this.stations) {
      let currStation = this.stations[key];
      if(currStation.includes(scooter)) {
        let index = currStation.indexOf(scooter);
        currStation.splice(index, 1);
        Scooter.rent(user);
        console.log(`scooter is rented`);
        break;
      }
    }
    throw new Error(`scooter already rented`);
  }

  print() {
    console.log(`Registered Users: ${this.registeredUsers}`);
    console.log(`List of Stations: ${this.stations}`);
    for(let key in this.stations) {
      console.log(`Station: ${key}`);
      console.log(`Number of scooters in ${key} ${this.stations[key].length}`);
    }
  }
}

module.exports = ScooterApp;
