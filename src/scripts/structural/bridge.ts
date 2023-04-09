{
  class Abstraction {
    protected implementation: Implementation;

    constructor(implementation: Implementation) {
      this.implementation = implementation;
    }

    public operation(): string {
      const result = this.implementation.operationImplementation();
      return `bridge: abstraction base operation with:\n${result}`;
    }
  }

  class ExtendedAbstraction extends Abstraction {
    public operation(): string {
      const result = this.implementation.operationImplementation();
      return `bridge: extendedAbstraction extended operation with:\n${result}`;
    }
  }

  interface Implementation {
    operationImplementation(): string;
  }

  class ConcreteImplementationA implements Implementation {
    public operationImplementation(): string {
      return "concreteImplementationA here's the result on the platform A.";
    }
  }

  class ConcreteImplementationB implements Implementation {
    public operationImplementation(): string {
      return "concreteImplementationB here's the result on the platform B.";
    }
  }

  let implementation = new ConcreteImplementationA();
  let abstraction = new Abstraction(implementation);
  console.log(abstraction.operation());

  implementation = new ConcreteImplementationB();
  abstraction = new ExtendedAbstraction(implementation);
  console.log(abstraction.operation());

  implementation = new ConcreteImplementationB();
  abstraction = new Abstraction(implementation);
  console.log(abstraction.operation());

  // Пример 1
  interface IModel {
    paint: () => string;
  }

  class Model {
    color: IColor;

    constructor(color: IColor) {
      this.color = color;
    }
  }

  interface IColor {
    getType: () => string;
  }

  class Color implements IColor {
    type: string;

    constructor(type: string) {
      this.type = type;
    }

    getType() {
      return this.type;
    }
  }

  class BlackColor extends Color {
    constructor() {
      super('dark-black');
    }
  }

  class SilverColor extends Color {
    constructor() {
      super('silver');
    }
  }

  class Audi extends Model implements IModel {
    constructor(color: IColor) {
      super(color);
    }

    paint() {
      return `bridge: auto: Audi, Color: ${this.color.getType()}`;
    }
  }

  class Bmw extends Model implements IModel {
    constructor(color: IColor) {
      super(color);
    }

    paint() {
      return `bridge: auto: Bmw, Color: ${this.color.getType()}`;
    }
  }

  const blackColor = new BlackColor();
  const silverColor = new SilverColor();

  const audiBlack = new Audi(blackColor);
  const bmwBlack = new Bmw(blackColor);
  const bmwSilver = new Bmw(silverColor);

  console.log(audiBlack.paint());
  console.log(bmwBlack.paint());
  console.log(bmwSilver.paint());

  console.log('====================================');
}
