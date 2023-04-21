{
  class Context {
    private state!: State;

    constructor(state: State) {
      this.transitionTo(state);
    }

    transitionTo(state: State): void {
      this.state = state;
      this.state.setContext(this);
    }

    request1(): void {
      this.state.handle1();
    }

    request2(): void {
      this.state.handle2();
    }
  }

  abstract class State {
    protected context!: Context;

    setContext(context: Context) {
      this.context = context;
    }

    abstract handle1(): void;

    abstract handle2(): void;
  }

  class ConcreteStateA extends State {
    handle1(): void {
      console.log('state: ConcreteStateA handles request1.');
      this.context.transitionTo(new ConcreteStateB());
    }

    handle2(): void {
      console.log('state: ConcreteStateA handles request2.');
    }
  }

  class ConcreteStateB extends State {
    handle1(): void {
      console.log('state: ConcreteStateB handles request1.');
    }

    handle2(): void {
      console.log('state: ConcreteStateB handles request2.');
      this.context.transitionTo(new ConcreteStateA());
    }
  }

  const context = new Context(new ConcreteStateA());
  context.request1();
  context.request2();

  // Пример 1
  class OrderStatus {
    private name: string;
    private nextStatus: WaitingForPayment | Shipping | Delivered | undefined;

    constructor(name: string, nextStatus: WaitingForPayment | Shipping | Delivered | undefined) {
      this.name = name;
      this.nextStatus = nextStatus;
    }

    next() {
      return this.nextStatus;
    }

    getName() {
      return this.name;
    }
  }

  class WaitingForPayment extends OrderStatus {
    constructor() {
      super('waitingForPayment', new Shipping());
    }
  }

  class Shipping extends OrderStatus {
    constructor() {
      super('shipping', new Delivered());
    }
  }

  class Delivered extends OrderStatus {
    constructor() {
      super('delivered', undefined);
    }
  }

  class Order {
    private state: WaitingForPayment | Shipping | Delivered | undefined;

    constructor() {
      this.state = new WaitingForPayment();
    }

    nextState() {
      this.state = this.state?.next();
    }

    getStateName() {
      return this.state?.getName();
    }
  }

  const myOrder = new Order();
  console.log('state: ', myOrder.getStateName());

  myOrder.nextState();
  console.log('state: ', myOrder.getStateName());

  myOrder.nextState();
  console.log('state: ', myOrder.getStateName());

  console.log('====================================');
}
