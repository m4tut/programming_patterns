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

  // Пример 2
  class Light {
    private light: string;

    constructor(light: string) {
      this.light = light;
    }

    getLight() {
      return this.light;
    }
  }

  class RedLight extends Light {
    constructor() {
      super('red');
    }

    sign() {
      return 'СТОП';
    }
  }

  class YellowLight extends Light {
    constructor() {
      super('yellow');
    }

    sign() {
      return 'ГОТОВЬСЯ';
    }
  }

  class GreenLight extends Light {
    constructor() {
      super('green');
    }

    sign() {
      return 'ЕДЬ!';
    }
  }

  type LightEnum = RedLight | YellowLight | GreenLight;

  class TrafficLight {
    private states: LightEnum[];
    private current: LightEnum;

    constructor() {
      this.states = [new RedLight(), new YellowLight(), new GreenLight()];
      this.current = this.states[0];
    }

    change() {
      const total = this.states.length;
      let index = this.states.findIndex(light => light === this.current);

      if (index + 1 < total) {
        this.current = this.states[index + 1];
      } else {
        this.current = this.states[0];
      }
    }

    sign() {
      return this.current.sign();
    }
  }

  const traffic = new TrafficLight();
  console.log('state: ', traffic.sign());
  traffic.change();

  console.log('state: ', traffic.sign());
  traffic.change();

  console.log('state: ', traffic.sign());
  traffic.change();

  console.log('state: ', traffic.sign());
  traffic.change();

  console.log('state: ', traffic.sign());
  traffic.change();

  console.log('state: ', traffic.sign());

  console.log('====================================');
}
