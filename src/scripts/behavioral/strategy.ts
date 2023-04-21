{
  class Context {
    private strategy: Strategy;

    constructor(strategy: Strategy) {
      this.strategy = strategy;
    }

    setStrategy(strategy: Strategy) {
      this.strategy = strategy;
    }

    doSomeBusinessLogic(): string {
      const result = this.strategy.doAlgorithm(['a', 'b', 'c', 'd', 'e']).join(',');

      return result;
    }
  }

  interface Strategy {
    doAlgorithm(data: string[]): string[];
  }

  class ConcreteStrategyA implements Strategy {
    doAlgorithm(data: string[]): string[] {
      return data.sort();
    }
  }

  class ConcreteStrategyB implements Strategy {
    doAlgorithm(data: string[]): string[] {
      return data.reverse();
    }
  }

  const context = new Context(new ConcreteStrategyA());
  console.log('strategy: ConcreteStrategyA - ', context.doSomeBusinessLogic());

  context.setStrategy(new ConcreteStrategyB());
  console.log('strategy: ConcreteStrategyB - ', context.doSomeBusinessLogic());

  // Пример 1
  function baseStrategy(amount: number): number {
    return amount;
  }

  function premiumStrategy(amount: number): number {
    return amount * 0.85;
  }

  function platinumStrategy(amount: number): number {
    return amount * 0.65;
  }

  class AutoCart {
    private amount: number;
    private discount: (amount: number) => number;

    constructor(discount: (amount: number) => number) {
      this.amount = 0;
      this.discount = discount;
    }

    checkout() {
      return this.discount(this.amount);
    }

    setAmount(amount: number) {
      this.amount = amount;
    }

    setDiscount(discount: (amount: number) => number) {
      this.discount = discount;
    }
  }

  const autoCart = new AutoCart(baseStrategy);
  autoCart.setAmount(1000);
  console.log('strategy: baseStrategy -', autoCart.checkout());

  autoCart.setDiscount(premiumStrategy);
  console.log('strategy: premiumStrategy -', autoCart.checkout());

  autoCart.setDiscount(platinumStrategy);
  console.log('strategy: platinumStrategy -', autoCart.checkout());

  console.log('====================================');
}
