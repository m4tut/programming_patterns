class Target {
  public request(): string {
      return 'target';
  }
}

class Adapted {
  public specificRequest(): string {
      return 'cificeps';
  }
}

class Adapter extends Target {
  private adapted: Adapted;

  constructor(adapted: Adapted) {
      super();
      this.adapted = adapted;
  }

  public request(): string {
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

console.log('====================================');