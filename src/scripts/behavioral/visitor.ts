{
  interface Component {
    accept(visitor: Visitor): void;
  }

  class ConcreteComponentA implements Component {
    public accept(visitor: Visitor): void {
      visitor.visitConcreteComponentA(this);
    }

    public exclusiveMethodOfConcreteComponentA(): string {
      return 'exclusiveMethodOfConcreteComponentA';
    }
  }

  class ConcreteComponentB implements Component {
    public accept(visitor: Visitor): void {
      visitor.visitConcreteComponentB(this);
    }

    public specialMethodOfConcreteComponentB(): string {
      return 'specialMethodOfConcreteComponentB';
    }
  }

  interface Visitor {
    visitConcreteComponentA(element: ConcreteComponentA): void;

    visitConcreteComponentB(element: ConcreteComponentB): void;
  }

  class ConcreteVisitor1 implements Visitor {
    public visitConcreteComponentA(element: ConcreteComponentA): void {
      console.log(`visitor: ${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor1`);
    }

    public visitConcreteComponentB(element: ConcreteComponentB): void {
      console.log(`visitor: ${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor1`);
    }
  }

  class ConcreteVisitor2 implements Visitor {
    public visitConcreteComponentA(element: ConcreteComponentA): void {
      console.log(`visitor: ${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor2`);
    }

    public visitConcreteComponentB(element: ConcreteComponentB): void {
      console.log(`visitor: ${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor2`);
    }
  }

  function clientCode(components: Component[], visitor: Visitor) {
    for (const component of components) {
      component.accept(visitor);
    }
  }

  const components = [new ConcreteComponentA(), new ConcreteComponentB()];

  const visitor1 = new ConcreteVisitor1();
  clientCode(components, visitor1);

  const visitor2 = new ConcreteVisitor2();
  clientCode(components, visitor2);

  // Пример 1
  interface Car {
    accept(visitor: (arg0: this) => void): void;
  }

  class Tesla implements Car {
    info() {
      return 'Tesla car';
    }

    accept(visitor: (arg0: this) => void) {
      return visitor(this);
    }
  }

  class Audi implements Car {
    info() {
      return 'Audi car';
    }

    accept(visitor: (arg0: this) => void) {
      return visitor(this);
    }
  }

  function exportVisitor(auto: Tesla | Audi) {
    if (auto instanceof Tesla) {
      return auto.info();
    }

    if (auto instanceof Audi) {
      return auto.info();
    }
  }

  const tesla = new Tesla();
  const audi = new Audi();

  console.log(`visitor: ${tesla.accept(exportVisitor)}`);
  console.log(`visitor: ${audi.accept(exportVisitor)}`);

  console.log('====================================');
}
