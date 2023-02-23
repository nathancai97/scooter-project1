const Scooter = require("../src/Scooter");

describe("Scooter", () => {
  beforeEach(() => {
    Scooter.nextSerial = 1;
  });

  test("constructor initializes properties correctly", () => {
    const scooter = new Scooter("Station A");
    expect(scooter.station).toBe("Station A");
    expect(scooter.user).toBeNull();
    expect(scooter.serial).toBe(1);
    expect(scooter.charge).toBe(100);
    expect(scooter.isBroken).toBe(false);
    expect(scooter.chargeTimer).toBeNull();
    expect(scooter.repairTimer).toBeNull();
  });

  // rent method
  test("renting a scooter updates its properties correctly", () => {
    const scooter = new Scooter("Station A");
    const user = { name: "Nathan" };
    scooter.rent(user);
    expect(scooter.station).toBeNull();
    expect(scooter.user).toBe(user);
  });

  test("renting a scooter with low charge throws an error", () => {
    const scooter = new Scooter("Station A");
    const user = { name: "Nathan" };
    scooter.charge = 10;
    expect(() => {
      scooter.rent(user);
    }).toThrowError("Scooter 1 needs to charge.");
  });

  test("renting a broken scooter throws an error", () => {
    const scooter = new Scooter("Station A");
    const user = { name: "Nathan" };
    scooter.isBroken = true;
    expect(() => {
      scooter.rent(user);
    }).toThrowError("Scooter 1 needs repair.");
  });

  // dock method
  test("docking a scooter updates its properties correctly", () => {
    const scooter = new Scooter("Station A", "Nathan");
    const user = { name: "Nathan" };
    scooter.rent(user);
    scooter.dock("Station B");
    expect(scooter.station).toBe("Station B");
    expect(scooter.user).toBeNull();
  });

  // requestRepair method
  test("repairing a scooter updates isBroken", () => {
    const scooter = new Scooter();
    scooter.isBroken = true;
    jest.useFakeTimers();
    scooter.requestRepair();
    jest.runAllTimers();
    expect(scooter.isBroken).toBe(false);
    jest.useRealTimers();
  });

  // charge method
  test("charging scooter should charge correctly", () => {
    const scooter = new Scooter();
    scooter.charge = 50;
    jest.useFakeTimers();
    scooter.recharge();
    jest.advanceTimersByTime(2000);
    expect(scooter.charge).toBe(60);
    jest.advanceTimersByTime(8000);
    expect(scooter.charge).toBe(100);
    jest.useRealTimers();
  });
});