{
  abstract class AbstractClass {
    templateMethod(): void {
      this.baseOperation1();
      this.requiredOperations1();
      this.baseOperation2();
      this.hook1();
      this.requiredOperation2();
      this.baseOperation3();
      this.hook2();
    }

    protected baseOperation1(): void {
      console.log('template_method: AbstractClass - baseOperation1');
    }

    protected baseOperation2(): void {
      console.log('template_method: AbstractClass - baseOperation2');
    }

    protected baseOperation3(): void {
      console.log('template_method: AbstractClass - baseOperation3');
    }

    protected abstract requiredOperations1(): void;

    protected abstract requiredOperation2(): void;

    protected hook1(): void {}

    protected hook2(): void {}
  }

  class ConcreteClass1 extends AbstractClass {
    protected requiredOperations1(): void {
      console.log('template_method: ConcreteClass1 - requiredOperations1');
    }

    protected requiredOperation2(): void {
      console.log('template_method: ConcreteClass1 - requiredOperations2');
    }
  }

  class ConcreteClass2 extends AbstractClass {
    protected requiredOperations1(): void {
      console.log('template_method: ConcreteClass2 - requiredOperations1');
    }

    protected requiredOperation2(): void {
      console.log('template_method: ConcreteClass2 - requiredOperations1');
    }

    protected hook1(): void {
      console.log('template_method: ConcreteClass2 - hook1');
    }
  }

  const concreteClass1 = new ConcreteClass1();
  concreteClass1.templateMethod();

  const concreteClass2 = new ConcreteClass2();
  concreteClass2.templateMethod();

  // Пример 1
  abstract class Builder {
    build() {
      this.addEngine();
      this.installChassis();
      this.addElectronic();
      this.collectAccessories();
    }

    protected abstract addEngine(): void;

    protected abstract installChassis(): void;

    protected abstract addElectronic(): void;

    protected abstract collectAccessories(): void;
  }

  class TeslaBuilder extends Builder {
    protected addEngine(): void {
      console.log('template_method: TeslaBuilder - addEngine');
    }

    protected installChassis(): void {
      console.log('template_method: TeslaBuilder - installChassis');
    }

    protected addElectronic(): void {
      console.log('template_method: TeslaBuilder - addElectronic');
    }

    protected collectAccessories(): void {
      console.log('template_method: TeslaBuilder - collectAccessories');
    }
  }

  class BmwBuilder extends Builder {
    protected addEngine(): void {
      console.log('template_method: BmwBuilder - addEngine');
    }

    protected installChassis(): void {
      console.log('template_method: BmwBuilder - installChassis');
    }

    protected addElectronic(): void {
      console.log('template_method: BmwBuilder - addElectronic');
    }

    protected collectAccessories(): void {
      console.log('template_method: BmwBuilder - collectAccessories');
    }
  }

  const teslaBuilder = new TeslaBuilder();
  teslaBuilder.build();

  const bmwBuilder = new BmwBuilder();
  bmwBuilder.build();

  // Пример 2
  class Employee {
    private name: string;
    private salary: number;

    constructor(name: string, salary: number) {
      this.name = name;
      this.salary = salary;
    }

    responsibilities() {}

    work() {
      return `${this.name} выполняет ${this.responsibilities()}`;
    }

    getPaid() {
      return `${this.name} имеет ЗП ${this.salary}`;
    }
  }

  class Developer extends Employee {
    constructor(name: string, salary: number) {
      super(name, salary);
    }

    responsibilities() {
      return 'процесс создания программ';
    }
  }

  class Tester extends Employee {
    constructor(name: string, salary: number) {
      super(name, salary);
    }

    responsibilities() {
      return 'процесс тестирования';
    }
  }

  const dev = new Developer('Влад', 100000);
  console.log(`template_method: ${dev.getPaid()}`);
  console.log(`template_method: ${dev.work()}`);

  const tester = new Tester('Виктория', 90000);
  console.log(`template_method: ${tester.getPaid()}`);
  console.log(`template_method: ${tester.work()}`);

  console.log('====================================');
}
