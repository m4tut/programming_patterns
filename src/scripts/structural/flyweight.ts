{
  class Flyweight {
    private sharedState: any;

    constructor(sharedState: any) {
      this.sharedState = sharedState;
    }

    public operation(uniqueState: any): void {
      const s = JSON.stringify(this.sharedState);
      const u = JSON.stringify(uniqueState);
      console.log(`flyweight: Displaying shared (${s}) and unique (${u}) state.`);
    }
  }

  class FlyweightFactory {
    private flyweights: { [key: string]: Flyweight } = <any>{};

    constructor(initialFlyweights: string[][]) {
      for (const state of initialFlyweights) {
        this.flyweights[this.getKey(state)] = new Flyweight(state);
      }
    }

    private getKey(state: string[]): string {
      return state.join('_');
    }

    public getFlyweight(sharedState: string[]): Flyweight {
      const key = this.getKey(sharedState);

      if (!(key in this.flyweights)) {
        this.flyweights[key] = new Flyweight(sharedState);
      }

      return this.flyweights[key];
    }
  }

  const factory = new FlyweightFactory([
    ['Chevrolet', 'Camaro2018', 'pink'],
    ['Mercedes Benz', 'C300', 'black'],
    ['Mercedes Benz', 'C500', 'red'],
    ['BMW', 'M5', 'red'],
    ['BMW', 'X6', 'white'],
  ]);

  function addCarToPoliceDatabase(
    ff: FlyweightFactory,
    plates: string,
    owner: string,
    brand: string,
    model: string,
    color: string
  ) {
    const flyweight = ff.getFlyweight([brand, model, color]);
    flyweight.operation([plates, owner]);
  }

  addCarToPoliceDatabase(factory, 'CL234IR', 'James Doe', 'BMW', 'M5', 'red');
  addCarToPoliceDatabase(factory, 'CL234IR', 'James Doe', 'BMW', 'X1', 'red');

  // Пример 1
  class Auto {
    private model: string;

    constructor(model: string) {
      this.model = model;
    }

    getModel(): string {
      return this.model;
    }
  }

  class AutoFactory {
    private models: { [key: string]: Auto } = <any>{};

    constructor() {
      this.models = {};
    }

    create(name: string) {
      const model = this.models[name];

      if (model) {
        return model;
      }

      this.models[name] = new Auto(name);
      return this.models[name];
    }

    getModels() {
      return this.models;
    }
  }

  const autoFactory = new AutoFactory();
  autoFactory.create('BMW');
  autoFactory.create('BMW');
  autoFactory.create('Audi');
  autoFactory.create('Tesla');
  console.log('flyweight: ', autoFactory.getModels());

  console.log('====================================');
}
