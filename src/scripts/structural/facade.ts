class Facade {
  protected subsystem1: Subsystem1;

  protected subsystem2: Subsystem2;

  constructor(subsystem1?: Subsystem1, subsystem2?: Subsystem2) {
    this.subsystem1 = subsystem1 || new Subsystem1();
    this.subsystem2 = subsystem2 || new Subsystem2();
  }

  public operation(): string {
    let result = 'facade:\n';
    result += this.subsystem1.operation1();
    result += this.subsystem2.operation1();
    result += this.subsystem1.operationN();
    result += this.subsystem2.operationZ();

    return result;
  }
}

class Subsystem1 {
  public operation1(): string {
    return 'Subsystem1: Ready!\n';
  }

  public operationN(): string {
    return 'Subsystem1: Go!\n';
  }
}

class Subsystem2 {
  public operation1(): string {
    return 'Subsystem2: Get ready!\n';
  }

  public operationZ(): string {
    return 'Subsystem2: Fire!';
  }
}

const subsystem1 = new Subsystem1();
const subsystem2 = new Subsystem2();
const facade = new Facade(subsystem1, subsystem2);
console.log(facade.operation());

// Пример 1
class Conveyor {
  setBody() {
    console.log('Body set!');
  }

  getEngine() {
    console.log('Engine get!');
  }

  setEngine() {
    console.log('Engine set!');
  }

  setInterior() {
    console.log('Interior set!');
  }

  getInterior() {
    console.log('Interior get!');
  }

  setExterior() {
    console.log('Exterior set!');
  }

  setWheels() {
    console.log('Wheels set!');
  }

  addElectronics() {
    console.log('Electronics added!');
  }

  paint() {
    console.log('Car painted!');
  }
}

class ConveyorFacade {
  car: Conveyor;

  constructor(car?: Conveyor) {
    this.car = car || new Conveyor();
  }

  assembleCar() {
    this.car.setBody();
    this.car.setEngine();
    this.car.getInterior();
    this.car.setExterior();
    this.car.setWheels();
    this.car.addElectronics();
    this.car.paint();
  }

  changeEngine(): void {
    this.car.getEngine();
    this.car.setEngine();
  }

  changeInterior(): void {
    this.car.getInterior();
    this.car.setInterior();
  }
}

const conveyor = new ConveyorFacade();
console.log('facade:');
conveyor.assembleCar();
conveyor.changeEngine();

console.log('====================================');
