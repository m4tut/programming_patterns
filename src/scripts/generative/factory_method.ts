{
  // ===============================================================================
  /*
* Минусы:
** Быстро разрастается

* Плюсы:
** Упрощает создание объектов в конструкторе, особенно если данные беруться из нескольких источников
** Упрощает создание объектов с одинаковой структурой, но разными данными
*/
  // ===============================================================================
  interface IProduct {
    operation(): string;
  }

  abstract class Creator {
    public abstract factoryMethod(): IProduct;

    public someOperation() {
      const product = this.factoryMethod();

      return product.operation();
    }
  }

  // ===============================================================================
  // Пример 1:
  class ConcreteCreator1 extends Creator {
    public factoryMethod(): IProduct {
      return new ConcreteProduct1();
    }
  }

  class ConcreteCreator2 extends Creator {
    public factoryMethod(): IProduct {
      return new ConcreteProduct2();
    }
  }

  class ConcreteProduct1 implements IProduct {
    public operation(): string {
      return 'ConcreteProduct1';
    }
  }

  class ConcreteProduct2 implements IProduct {
    public operation(): string {
      return 'ConcreteProduct2';
    }
  }

  console.log('factory_method:', new ConcreteCreator1().someOperation());
  console.log('factory_method:', new ConcreteCreator2().someOperation());

  // Пример 2:
  class Car {
    color: string;
    maxSpeed: number;
    wheels: number;

    constructor() {
      this.color = 'white';
      this.maxSpeed = 300;
      this.wheels = 4;
    }
  }

  class Moto {
    color: string;
    maxSpeed: number;
    wheels: number;

    constructor() {
      this.color = 'black';
      this.maxSpeed = 200;
      this.wheels = 2;
    }
  }

  const types = {
    Moto,
    Car,
  };
  class TransportFactory {
    static createTransport(type: 'Moto' | 'Car') {
      return new types[type]();
    }
  }

  const moto = TransportFactory.createTransport('Moto');
  const car = TransportFactory.createTransport('Car');

  console.log('factory_method:', moto);
  console.log('factory_method:', car);

  // Пример 3:
  interface IInsurance {
    id: number;
    status: string;
    setVehicle(vehice: any): void;
    submit(): Promise<boolean>;
  }

  class TFInsurance implements IInsurance {
    id!: number;
    status!: string;

    setVehicle(vehice: any): void {
      throw new Error('Method not implemented 1.');
    }

    submit(): Promise<boolean> {
      throw new Error('Method not implemented 1.');
    }
  }

  class ABInsurance implements IInsurance {
    id!: number;
    status!: string;

    setVehicle(vehice: any): void {
      throw new Error('Method not implemented 2.');
    }

    submit(): Promise<boolean> {
      throw new Error('Method not implemented 2.');
    }
  }

  const INSURANCE_TYPE = {
    tf: new TFInsurance(),
    ab: new ABInsurance(),
  };

  type IT = typeof INSURANCE_TYPE;

  class InsuranceFactory {
    private db: any;

    creteInsurance<T extends keyof IT>(type: T): IT[T] {
      return INSURANCE_TYPE[type];
    }

    saveHistory(ins: IInsurance) {
      this.db.save(ins.id, ins.status);
    }
  }

  const insuranceFactory = new InsuranceFactory();
  const TFInsuranceFactory = insuranceFactory.creteInsurance('tf');
  const ABInsuranceFactory = insuranceFactory.creteInsurance('ab');
  console.log('factory_method:', TFInsuranceFactory);
  console.log('factory_method:', ABInsuranceFactory);

  console.log('====================================');
}
