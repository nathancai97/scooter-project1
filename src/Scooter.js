class Scooter{
  // scooter code here
  static nextSerial = 1;

  constructor(station) {
    this.station = station;
    this.user = null;
    this.serial = Scooter.nextSerial;
    Scooter.nextSerial++;
    this.charge = 100;
    this.isBroken = false;
    this.chargeTimer = null;
    this.repairTimer = null;
  }
  rent(user) {
    if(this.charge >= 20 && !this.isBroken) {
      this.station = null;
      this.user = user;
      console.log(`Scooter ${this.serial} checked out by ${this.user}.`)
    } else if(this.charge < 20){
      throw new Error(`Scooter ${this.serial} needs to charge.`);
    } else {
      throw new Error(`Scooter ${this.serial} needs repair.`);
    }
  }

  dock(station) {
    this.station = station;
    this.user = null;
  }

  recharge() {
    if(this.chargeTimer) {
      console.log(`Scooter ${this.serial} charging already in progress!`);
      return;
    }

    console.log(`Scooter ${this.serial} is charging...`);
    this.chargeTimer = setInterval(() => {
      if(this.charge < 100) {
        this.charge += 10;
        console.log(`Scooter ${this.serial} charge percentage is now ${this.charge}%.`);
      } else {
        clearInterval(this.chargeTimer);
        this.chargeTimer = null;
        console.log(`Scooter ${this.serial} has finished charging.`)
      }
    }, 2000)
  }

  requestRepair() {
    if(!this.isBroken) {
      console.log(`Scooter ${this.serial} is working!`);
      return;
    }

    console.log(`Scooter repair for Scooter ${this.serial} has been requested.`)
    this.repairTime = setTimeout(() => {
      this.isBroken = false;
      this.repairTimer = null;
      console.log(`Scooter ${this.serial} repair completed!`)
    }, 5000);
  }
}

module.exports = Scooter;
