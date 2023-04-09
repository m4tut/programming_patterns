{
  interface Component {
    operation: () => string;
  }

  class ConcreteComponent implements Component {
    public operation(): string {
      return 'ConcreteComponent';
    }
  }

  class Decorator implements Component {
    protected component: Component;

    constructor(component: Component) {
      this.component = component;
    }

    public operation(): string {
      return this.component.operation();
    }
  }

  class ConcreteDecoratorA extends Decorator {
    public operation(): string {
      return `ConcreteDecoratorA(${super.operation()})`;
    }
  }

  class ConcreteDecoratorB extends Decorator {
    public operation(): string {
      return `ConcreteDecoratorB(${super.operation()})`;
    }
  }

  const simple = new ConcreteComponent();
  console.log('decorator: ', simple.operation());
  const decorator1 = new ConcreteDecoratorA(simple);
  const decorator2 = new ConcreteDecoratorB(decorator1);
  console.log('decorator: ', decorator2.operation());

  // Пример 1
  interface ICar {
    price: number;
    model: string;
    getPrice(): number;
    getModel(): string;
  }

  class Car implements ICar {
    price: number;
    model: string;

    constructor() {
      this.price = 1000;
      this.model = 'car';
    }

    getPrice() {
      return this.price;
    }

    getModel() {
      return this.model;
    }
  }

  class Tesla extends Car {
    constructor() {
      super();
      this.price = 25000;
      this.model = 'Tesla';
    }
  }

  class Autopilot implements ICar {
    price: number;
    model: string;

    constructor(car: ICar) {
      this.price = car.getPrice();
      this.model = car.getModel();
    }

    getPrice() {
      return this.price + 5000;
    }

    getModel() {
      return `${this.model} with autopilot`;
    }
  }

  class Parktronic implements ICar {
    price: number;
    model: string;

    constructor(car: ICar) {
      this.price = car.getPrice();
      this.model = car.getModel();
    }

    getPrice() {
      return this.price + 3000;
    }

    getModel() {
      return `${this.model} with parktronic`;
    }
  }

  let tesla = new Tesla();
  tesla = new Autopilot(tesla);
  tesla = new Parktronic(tesla);

  console.log('decorator: ', tesla.getModel());

  console.log('====================================');
}
