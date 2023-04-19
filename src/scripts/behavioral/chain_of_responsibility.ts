{
  interface Handler {
    setNext(handler: Handler): Handler;

    handle(request: string): string | null;
  }

  abstract class AbstractHandler implements Handler {
    private nextHandler: Handler | undefined;

    public setNext(handler: Handler): Handler {
      this.nextHandler = handler;

      return handler;
    }

    public handle(request: string): string | null {
      if (this.nextHandler) {
        return this.nextHandler.handle(request);
      }

      return null;
    }
  }

  class MonkeyHandler extends AbstractHandler {
    public handle(request: string): string | null {
      if (request === 'Banana') {
        return `chain_of_responsibility: ${request}.`;
      }

      return super.handle(request);
    }
  }

  class SquirrelHandler extends AbstractHandler {
    public handle(request: string): string | null {
      if (request === 'Nut') {
        return `chain_of_responsibility: ${request}.`;
      }
      return super.handle(request);
    }
  }

  class DogHandler extends AbstractHandler {
    public handle(request: string): string | null {
      if (request === 'MeatBall') {
        return `chain_of_responsibility: ${request}.`;
      }
      return super.handle(request);
    }
  }

  function clientCode(handler: Handler) {
    const foods = ['Coffee', 'Banana', 'MeatBall', 'Nut'];

    for (const food of foods) {
      console.log(handler.handle(food));
    }
    console.log('-');
  }

  const monkey = new MonkeyHandler();
  const squirrel = new SquirrelHandler();
  const dog = new DogHandler();

  monkey.setNext(squirrel).setNext(dog);

  clientCode(monkey);
  clientCode(squirrel);
  clientCode(dog);

  // Пример 1
  interface IAccount {
    pay: (orderPrice: number) => void;
    canPay: (amount: number) => boolean;
    setNext: (account: Account) => Account;
    show: () => void;
  }

  abstract class Account implements IAccount {
    protected name: string = '';
    protected balance: number = 0;
    private incomer: Account | null = null;

    pay(orderPrice: number) {
      if (this.canPay(orderPrice)) {
        console.log(`chain_of_responsibility: paid ${orderPrice} using ${this.name}`);
      } else if (this.incomer) {
        console.log(`chain_of_responsibility: cannot pay using ${this.name}`);
        this.incomer.pay(orderPrice);
      } else {
        console.log('chain_of_responsibility: failed');
      }
    }

    canPay(amount: number) {
      return this.balance >= amount;
    }

    setNext(account: Account) {
      this.incomer = account;

      return account;
    }

    show() {
      console.log('chain_of_responsibility: ', this);
    }
  }

  class Master extends Account {
    constructor(balance: number) {
      super();
      this.name = 'Master';
      this.balance = balance;
    }
  }

  class Paypal extends Account {
    constructor(balance: number) {
      super();
      this.name = 'Paypal';
      this.balance = balance;
    }
  }

  class Qiwi extends Account {
    constructor(balance: number) {
      super();
      this.name = 'Qiwi';
      this.balance = balance;
    }
  }

  const paypal = new Paypal(100);
  const qiwi = new Qiwi(1000);
  const master = new Master(10000);

  paypal.setNext(qiwi).setNext(master);

  paypal.pay(2000);
  paypal.show();

  console.log('====================================');
}
