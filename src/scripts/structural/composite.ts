{
  interface IComponent {
    setParent: (parent: Component | null) => void;
    getParent: () => Component | null;
    add: (component: Component) => void;
    remove: (component: Component) => void;
    isComposite: () => boolean;
    operation: () => string;
  }

  abstract class Component implements IComponent {
    protected parent!: Component | null;

    setParent(parent: Component | null) {
      this.parent = parent;
    }

    getParent(): Component | null {
      return this.parent;
    }

    add(component: Component): void {}

    remove(component: Component): void {}

    isComposite(): boolean {
      return false;
    }

    abstract operation(): string;
  }

  class Leaf extends Component {
    operation(): string {
      return 'Leaf';
    }
  }

  class Composite extends Component {
    protected children: Component[] = [];

    add(component: Component): void {
      this.children.push(component);
      component.setParent(this);
    }

    remove(component: Component): void {
      const componentIndex = this.children.indexOf(component);
      this.children.splice(componentIndex, 1);

      component.setParent(null);
    }

    isComposite(): boolean {
      return true;
    }

    operation(): string {
      const results = [];
      for (const child of this.children) {
        results.push(child.operation());
      }

      return `Branch(${results.join('+')})`;
    }
  }

  const simple = new Leaf();
  console.log(`composite: ${simple.operation()}`);

  const tree = new Composite();
  const branch1 = new Composite();
  branch1.add(new Leaf());
  branch1.add(new Leaf());
  const branch2 = new Composite();
  branch2.add(new Leaf());
  tree.add(branch1);
  tree.add(branch2);
  console.log(`composite: ${tree.operation()}`);

  if (tree.isComposite()) {
    tree.add(simple);
  }
  console.log(`composite: ${tree.operation()}`);

  // Пример 1
  class ComponentEquipment {
    private price: number = 0;
    private name: string = '';

    getPrice() {
      return this.price || 0;
    }

    getName() {
      return this.name;
    }

    setName(name: string) {
      this.name = name;
    }

    setPrice(price: number) {
      this.price = price;
    }
  }

  class LeafEngine extends ComponentEquipment {
    constructor() {
      super();
      this.setName('Engine');
      this.setPrice(800);
    }
  }

  class LeafBody extends ComponentEquipment {
    constructor() {
      super();
      this.setName('Body');
      this.setPrice(3000);
    }
  }

  class LeafTools extends ComponentEquipment {
    constructor() {
      super();
      this.setName('Tools');
      this.setPrice(4000);
    }
  }

  class CompositeAuto extends ComponentEquipment {
    protected children: ComponentEquipment[] = [];

    add(equipment: ComponentEquipment) {
      this.children.push(equipment);
    }

    getPrice(): number {
      return this.children.map(equipment => equipment.getPrice()).reduce((acc, item) => acc + item);
    }
  }

  class CompositeCar extends CompositeAuto {
    constructor(name: string) {
      super();
      this.setName(name);
    }
  }

  const compositeAudi = new CompositeCar('Audi');

  compositeAudi.add(new LeafEngine());
  compositeAudi.add(new LeafBody());
  compositeAudi.add(new LeafTools());

  console.log(`composite: ${compositeAudi.getName()} -> ${compositeAudi.getPrice()}$`);

  console.log('====================================');
}
