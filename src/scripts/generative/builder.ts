{
  interface Builder {
    producePartA(): void;
    producePartB(): void;
    producePartC(): void;
  }

  class ConcreteBuilder1 implements Builder {
    private product!: Product1;

    constructor() {
      this.reset();
    }

    reset(): void {
      this.product = new Product1();
    }

    producePartA(): void {
      this.product.parts.push('PartA1');
    }

    producePartB(): void {
      this.product.parts.push('PartB1');
    }

    producePartC(): void {
      this.product.parts.push('PartC1');
    }

    getProduct(): Product1 {
      const result = this.product;
      this.reset();
      return result;
    }
  }

  class Product1 {
    parts: string[] = [];

    listParts(): void {
      console.log(`builder: ${this.parts.join(', ')}\n`);
    }
  }

  class Director {
    private builder!: Builder;

    setBuilder(builder: Builder): void {
      this.builder = builder;
    }

    buildMinimalViableProduct(): void {
      this.builder.producePartA();
    }

    buildFullFeaturedProduct(): void {
      this.builder.producePartA();
      this.builder.producePartB();
      this.builder.producePartC();
    }
  }

  const director = new Director();

  const builder = new ConcreteBuilder1();
  director.setBuilder(builder);

  director.buildMinimalViableProduct();
  builder.getProduct().listParts();

  director.buildFullFeaturedProduct();
  builder.getProduct().listParts();

  builder.producePartA();
  builder.producePartC();
  builder.getProduct().listParts();

  // ===============================================================================
  // Пример 1 (без директора)
  class CarBuilder {
    autoPilot: boolean;
    parctronic: boolean;
    signaling: boolean;
    engine: string;

    constructor() {
      this.autoPilot = false;
      this.parctronic = false;
      this.signaling = false;
      this.engine = 'v3';
    }
  }

  class CarConcreteBuilder1 {
    private car!: CarBuilder;

    constructor() {
      this.reset();
    }

    reset(): void {
      this.car = new CarBuilder();
    }

    addAutoPilot(autoPilot: boolean) {
      this.car.autoPilot = autoPilot;
      return this;
    }

    addParctronic(parctronic: boolean) {
      this.car.parctronic = parctronic;
      return this;
    }

    addSignaling(signaling: boolean) {
      this.car.signaling = signaling;
      return this;
    }

    updateEngine(engine: string) {
      this.car.engine = engine;
      return this;
    }

    getCar(): CarBuilder {
      const result = this.car;
      this.reset();
      return result;
    }
  }

  const carBuilder = new CarConcreteBuilder1().addAutoPilot(true).updateEngine('v12').getCar();
  console.log('bulder: carBuilder', carBuilder);

  const newCarBuilder = new CarConcreteBuilder1()
    .updateEngine('v8')
    .addParctronic(true)
    .addSignaling(true)
    .addAutoPilot(true)
    .getCar();

  console.log('bulder: newCarBuilder', newCarBuilder);

  console.log('====================================');
}
