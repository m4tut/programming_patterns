{
  interface Mediator {
    notify(sender: object, event: string): void;
  }

  class ConcreteMediator implements Mediator {
    private component1: Component1;
    private component2: Component2;

    constructor(c1: Component1, c2: Component2) {
      this.component1 = c1;
      this.component2 = c2;
      this.component1.setMediator(this);
      this.component2.setMediator(this);
    }

    notify(sender: { component1: Component1; component2: Component2 }, event: string): void {
      const { component1: c1, component2: c2 } = sender;

      if (event === 'A') {
        this.eventA(c2);
      }

      if (event === 'D') {
        this.eventD(c1, c2);
      }
    }

    eventA(c2: Component2) {
      console.log(`mediator: eventA triggers following operations - ${c2.doC()}`);
    }

    eventD(c1: Component1, c2: Component2) {
      console.log(`mediator: eventD triggers following operations - ${c1.doB()}, ${c2.doC()}`);
    }
  }

  class BaseComponent {
    protected mediator: Mediator;

    constructor(mediator?: Mediator) {
      this.mediator = mediator!;
    }

    setMediator(mediator: Mediator): void {
      this.mediator = mediator;
    }
  }

  class Component1 extends BaseComponent {
    doA(): string {
      this.mediator.notify(this.mediator, 'A');
      return '(Component 1 does A)';
    }

    doB(): string {
      this.mediator.notify(this.mediator, 'B');
      return '(Component 1 does B)';
    }
  }

  class Component2 extends BaseComponent {
    doC(): string {
      this.mediator.notify(this.mediator, 'C');
      return '(Component 2 does C)';
    }

    doD(): string {
      this.mediator.notify(this.mediator, 'D');
      return '(Component 2 does D)';
    }
  }

  const c1 = new Component1();
  const c2 = new Component2();
  const mediator = new ConcreteMediator(c1, c2);

  c1.doA();
  c2.doD();

  // Пример 1
  class OfficialDealer {
    private customers: string[];

    constructor() {
      this.customers = [];
    }

    orderAuto(customer: Customer, auto: string, info: string) {
      const name = customer.getName();
      this.addToCustomersList(name);
      console.log(`mediator: name - ${name}, auto - ${auto}, info - ${info}`);
    }

    addToCustomersList(name: string) {
      this.customers.push(name);
    }

    getCustomersList() {
      return this.customers;
    }
  }

  class Customer {
    private name: string;
    private dealerMediator: OfficialDealer;

    constructor(name: string, dealerMediator: OfficialDealer) {
      this.name = name;
      this.dealerMediator = dealerMediator;
    }

    getName(): string {
      return this.name;
    }

    makeOrder(auto: string, info: string) {
      this.dealerMediator.orderAuto(this, auto, info);
    }
  }

  const mediatorOfficialDealer = new OfficialDealer();
  const bob = new Customer('Bob', mediatorOfficialDealer);
  const misha = new Customer('Misha', mediatorOfficialDealer);

  bob.makeOrder('Tesla', 'With autopilot!');
  misha.makeOrder('Audi', 'With parktronic!');
  console.log(`mediator: ${mediatorOfficialDealer.getCustomersList()}`);

  // Пример 2
  class User {
    private name: string;
    private room: ChatRoom | null;

    constructor(name: string) {
      this.name = name;
      this.room = null;
    }

    getName() {
      return this.name;
    }

    setRoom(room: ChatRoom) {
      this.room = room;
    }

    send(message: string, to?: User) {
      if (!this.room) {
        return;
      }

      this.room.send(message, this, to);
    }

    receive(message: string, from: User) {
      console.log(`mediator: ${from.name} => ${this.name}: ${message}`);
    }
  }

  class ChatRoom {
    private users: { [key: string]: User } = <any>{};

    constructor() {
      this.users = {};
    }

    register(user: User) {
      this.users[user.getName()] = user;
      user.setRoom(this);
    }

    send(message: string, from: User, to?: User) {
      if (to) {
        to.receive(message, from);
      } else {
        Object.keys(this.users).forEach(key => {
          if (this.users[key] !== from) {
            this.users[key].receive(message, from);
          }
        });
      }
    }
  }

  const vlad = new User('Vlad');
  const lena = new User('Elena');
  const igor = new User('Igor');

  const room = new ChatRoom();

  room.register(vlad);
  room.register(lena);
  room.register(igor);

  vlad.send('Hello!', lena);
  lena.send('Hello hello!', vlad);
  igor.send('Vsem privet');

  console.log('====================================');
}
