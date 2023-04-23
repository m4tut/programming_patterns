{
  class Target {
    request(): string {
      return 'target';
    }
  }

  class Adapted {
    specificRequest(): string {
      return 'cificeps';
    }
  }

  class Adapter extends Target {
    private adapted: Adapted;

    constructor(adapted: Adapted) {
      super();
      this.adapted = adapted;
    }

    request(): string {
      const result = this.adapted.specificRequest().split('').reverse().join('');
      return `(TRANSLATED) ${result}`;
    }
  }

  const target = new Target();
  console.log('adapter: target - ', target.request());

  const adapted = new Adapted();
  console.log('adapter: ', adapted.specificRequest());

  const adapter = new Adapter(adapted);
  console.log('adapter: specific - ', adapter.request());

  // Пример 1
  class OldCalc {
    operations(t1: number, t2: number, operation: 'add' | 'sub') {
      switch (operation) {
        case 'add': return t1 + t2;
        case 'sub': return t1 - t2;
        default: return NaN;
      }
    }
  }

  class NewCalc {
    add(t1: number, t2: number) {
      return t1 + t2;
    }

    sub(t1: number, t2: number) {
      return t1 - t2;
    }
  }

  class CalcAdapter extends OldCalc {
    private calc: NewCalc;

    constructor() {
      super();
      this.calc = new NewCalc();
    }

    operations(t1: number, t2: number, operation: 'add' | 'sub') {
      switch (operation) {
        case 'add': return this.calc.add(t1, t2);
        case 'sub': return this.calc.sub(t1, t2);
        default: return NaN;
      }
    }
  }

  const calc = new CalcAdapter();
  console.log(`adapter: ${calc.operations(2, 2, 'add')}`);

  console.log('====================================');
}
