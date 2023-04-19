{
  interface Command {
    execute(): void;
  }

  class SimpleCommand implements Command {
    private payload: string;

    constructor(payload: string) {
      this.payload = payload;
    }

    public execute(): void {
      console.log(`command: SimpleCommand(${this.payload})`);
    }
  }

  class ComplexCommand implements Command {
    private receiver: Receiver;

    private a: string;
    private b: string;

    constructor(receiver: Receiver, a: string, b: string) {
      this.receiver = receiver;
      this.a = a;
      this.b = b;
    }

    public execute(): void {
      console.log('command: ComplexCommand');
      this.receiver.doSomething(this.a);
      this.receiver.doSomethingElse(this.b);
    }
  }

  class Receiver {
    public doSomething(a: string): void {
      console.log(`command: receiver - working on (${a}.)`);
    }

    public doSomethingElse(b: string): void {
      console.log(`command: receiver - also working on (${b}.)`);
    }
  }

  class Invoker {
    private onStart: Command | undefined;
    private onFinish: Command | undefined;

    public setOnStart(command: Command): void {
      this.onStart = command;
    }

    public setOnFinish(command: Command): void {
      this.onFinish = command;
    }

    public doSomethingImportant(): void {
      if (this.isCommand(this.onStart)) {
        this.onStart.execute();
      }

      if (this.isCommand(this.onFinish)) {
        this.onFinish.execute();
      }
    }

    private isCommand(object: Command | undefined): object is Command {
      return !!object && object.execute !== undefined;
    }
  }

  const invoker = new Invoker();
  invoker.setOnStart(new SimpleCommand('Say Hi!'));
  const receiver = new Receiver();
  invoker.setOnFinish(new ComplexCommand(receiver, 'Send email', 'Save report'));
  invoker.doSomethingImportant();

  // Пример 1
  class Driver implements Command {
    private command: any;

    constructor(command: any) {
      this.command = command;
    }

    execute() {
      this.command.execute();
    }
  }

  class Engine {
    on() {
      console.log('command: engine on');
    }

    off() {
      console.log('command: engine off');
    }
  }

  class OnStartCommand implements Command {
    private engine: Engine;

    constructor(engine: Engine) {
      this.engine = engine;
    }

    execute() {
      this.engine.on();
    }
  }

  class OnSwitchOffCommand implements Command {
    private engine: Engine;

    constructor(engine: Engine) {
      this.engine = engine;
    }

    execute() {
      this.engine.off();
    }
  }

  const engine = new Engine();
  const onStartCommand = new OnStartCommand(engine);
  const onSwitchOffCommand = new OnSwitchOffCommand(engine);
  const driver = new Driver(onStartCommand)
  driver.execute();

  console.log('====================================');
}
