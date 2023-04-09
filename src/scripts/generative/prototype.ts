{
  class Prototype {
    public primitive: any;
    public component!: object;
    public circularReference!: ComponentWithBackReference;

    public clone(): this {
      const clone = Object.create(this);

      clone.component = Object.create(this.component);

      clone.circularReference = {
        ...this.circularReference,
        prototype: { ...this },
      };

      return clone;
    }
  }

  class ComponentWithBackReference {
    public prototype;

    constructor(prototype: Prototype) {
      this.prototype = prototype;
    }
  }

  const p1 = new Prototype();
  p1.primitive = 245;
  p1.component = new Date();
  p1.circularReference = new ComponentWithBackReference(p1);

  const p2 = p1.clone();
  if (p1.primitive === p2.primitive) {
    console.log('prototype: p1.primitive === p2.primitive');
  } else {
    console.log('prototype: p1.primitive !== p2.primitive');
  }
  if (p1.component === p2.component) {
    console.log('prototype: p1.component === p2.component');
  } else {
    console.log('prototype: p1.component !== p2.component');
  }

  if (p1.circularReference === p2.circularReference) {
    console.log('prototype: p1.circularReference === p2.circularReference');
  } else {
    console.log('prototype: p1.circularReference !== p2.circularReference');
  }

  if (p1.circularReference.prototype === p2.circularReference.prototype) {
    console.log('prototype: p1.circularReference.prototype === p2.circularReference.prototype');
  } else {
    console.log('prototype: p1.circularReference.prototype !== p2.circularReference.prototype');
  }

  // Пример 1
  class CarPrototype {
    model: string;
    price: number;
    interior: string;
    autopilot: boolean;

    constructor(model: string, price: number, interior: string, autopilot: boolean) {
      this.model = model;
      this.price = price;
      this.interior = interior;
      this.autopilot = autopilot;
    }

    clone() {
      return new CarPrototype(this.model, this.price, this.interior, this.autopilot);
    }
  }

  const carPrototype = new CarPrototype('S', 8000000, 'black', false);

  const carPrototypeClone1 = carPrototype.clone();
  const carPrototypeClone2 = carPrototype.clone();

  carPrototypeClone1.interior = 'white';

  console.log('prototype: carPrototypeClone1', carPrototypeClone1);
  console.log('prototype: carPrototypeClone2', carPrototypeClone2);

  console.log('====================================');
}
