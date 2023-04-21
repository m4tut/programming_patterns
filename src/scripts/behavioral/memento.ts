{
  class Originator {
    private state: string;

    constructor(state: string) {
      this.state = state;
    }

    doSomething(): void {
      this.state = this.generateRandomString(30);
    }

    private generateRandomString(length: number = 10): string {
      const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let str = '';

      for (let i = 0; i < length; i++) {
        str += charSet[Math.round(Math.random() * (charSet.length - 1))];
      }

      return str;
    }

    save(): Memento {
      return new ConcreteMemento(this.state);
    }

    restore(memento: Memento): void {
      this.state = memento.getState();
    }

    getState(): string {
      return this.state;
    }
  }

  interface Memento {
    getState(): string;

    getName(): string;

    getDate(): string;
  }

  class ConcreteMemento implements Memento {
    private state: string;

    private date: string;

    constructor(state: string) {
      this.state = state;
      this.date = new Date().toLocaleString();
    }

    getState(): string {
      return this.state;
    }

    getName(): string {
      return `${this.date} / (${this.state.substring(0, 9)}...)`;
    }

    getDate(): string {
      return this.date;
    }
  }

  class Caretaker {
    private mementos: Memento[] = [];

    private originator: Originator;

    constructor(originator: Originator) {
      this.originator = originator;
    }

    backup(): void {
      this.mementos.push(this.originator.save());
    }

    undo(): void {
      if (!this.mementos.length) {
        return;
      }
      const memento = this.mementos.pop();

      if (memento) {
        this.originator.restore(memento);
      }
    }

    showHistory(): void {
      for (const memento of this.mementos) {
        console.log(`memento: ${memento.getName()}`);
      }
    }

    getHistory(): Memento[] {
      return this.mementos;
    }
  }

  const originator = new Originator('Super-duper-super-puper-super.');
  const caretaker = new Caretaker(originator);

  caretaker.backup();
  originator.doSomething();
  caretaker.backup();
  originator.doSomething();
  caretaker.backup();
  originator.doSomething();
  caretaker.backup();
  originator.doSomething();

  caretaker.showHistory();
  caretaker.undo();
  caretaker.undo();
  caretaker.undo();
  console.log('memento: undo history -', caretaker.getHistory());

  // Пример 1
  class Memento {
    private value: string;

    constructor(value: string) {
      this.value = value;
    }

    getValue() {
      return this.value;
    }
  }

  class CaretakerExample {
    private values: Memento[];

    constructor() {
      this.values = [];
    }

    addMemento(memento: Memento) {
      this.values.push(memento);
    }

    getMemento(index: number) {
      return this.values[index];
    }
  }

  const creator = {
    save: (val: string) => new Memento(val),
    restore: (memento: Memento) => memento.getValue(),
  };

  const caretakerExample = new CaretakerExample();

  caretakerExample.addMemento(creator.save('hello'));
  caretakerExample.addMemento(creator.save('hello world'));
  caretakerExample.addMemento(creator.save('Hello World!!!'));
  console.log('memento:', creator.restore(caretakerExample.getMemento(1)));
  console.log('====================================');
}
