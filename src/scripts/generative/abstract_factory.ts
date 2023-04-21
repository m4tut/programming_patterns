{
  interface AbstractFactory {
    createProductA(): AbstractProductA;
    createProductB(): AbstractProductB;
  }

  interface AbstractProductA {
    usefulFunctionA(): string;
  }

  interface AbstractProductB {
    usefulFunctionB(): string;
    anotherUsefulFunctionB(collaborator: AbstractProductA): string;
  }

  class ConcreteFactory1 implements AbstractFactory {
    createProductA(): AbstractProductA {
      return new ConcreteProductA1();
    }

    createProductB(): AbstractProductB {
      return new ConcreteProductB1();
    }
  }

  class ConcreteFactory2 implements AbstractFactory {
    createProductA(): AbstractProductA {
      return new ConcreteProductA2();
    }

    createProductB(): AbstractProductB {
      return new ConcreteProductB2();
    }
  }

  class ConcreteProductA1 implements AbstractProductA {
    usefulFunctionA(): string {
      return 'abstract_factory: Product A1';
    }
  }

  class ConcreteProductA2 implements AbstractProductA {
    usefulFunctionA(): string {
      return 'abstract_factory: Product A2';
    }
  }

  class ConcreteProductB1 implements AbstractProductB {
    usefulFunctionB(): string {
      return 'abstract_factory: Product B1';
    }

    anotherUsefulFunctionB(collaborator: AbstractProductA): string {
      const result = collaborator.usefulFunctionA();
      return `abstract_factory: B1 collaborating with the (${result})`;
    }
  }

  class ConcreteProductB2 implements AbstractProductB {
    usefulFunctionB(): string {
      return 'abstract_factory: The result of the product B2.';
    }

    anotherUsefulFunctionB(collaborator: AbstractProductA): string {
      const result = collaborator.usefulFunctionA();
      return `abstract_factory: B2 collaborating with the (${result})`;
    }
  }

  function clientCode(factory: AbstractFactory) {
    const productA = factory.createProductA();
    const productB = factory.createProductB();

    console.log(productB.usefulFunctionB());
    console.log(productB.anotherUsefulFunctionB(productA));
  }

  clientCode(new ConcreteFactory1());
  clientCode(new ConcreteFactory2());

  // ===============================================================================
  // Пример 1
  interface CarsFactory {
    createSedan: () => FordSedan | ToyotaSedan;
    createCoupe: () => FordCoupe | ToyotaCoupe;
  }

  interface Sedan {
    sedanInfo: () => void;
  }

  interface Coupe {
    coupeInfo: () => void;
  }

  class ToyotaFactory implements CarsFactory {
    createSedan() {
      return new ToyotaSedan();
    }

    createCoupe() {
      return new ToyotaCoupe();
    }
  }

  class FordFactory implements CarsFactory {
    createSedan() {
      return new FordSedan();
    }

    createCoupe() {
      return new FordCoupe();
    }
  }

  class ToyotaCoupe implements Coupe {
    coupeInfo() {
      console.log('abstract_factory: Create ToyotaCoupe');
    }
  }

  class ToyotaSedan implements Sedan {
    sedanInfo() {
      console.log('abstract_factory: Create ToyotaSedan ');
    }
  }

  class FordCoupe implements Coupe {
    coupeInfo() {
      console.log('abstract_factory: Create FordCoupe');
    }
  }

  class FordSedan implements Sedan {
    sedanInfo() {
      console.log('abstract_factory: Create FordSedan');
    }
  }

  const toyotaFactory = new ToyotaFactory();
  toyotaFactory.createSedan().sedanInfo();

  const fordFactory = new FordFactory();
  fordFactory.createCoupe().coupeInfo();

  console.log('====================================');
}
