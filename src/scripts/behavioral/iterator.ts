{
  interface Iterator<T> {
    // Возврат текущего элемента.
    current(): T;

    // Возврат текущего элемента и переход к следующему элементу.
    next(): T;

    // Возврат ключа текущего элемента.
    key(): number;

    // Проверяет корректность текущей позиции.
    valid(): boolean;

    // Перемотка Итератора к первому элементу.
    rewind(): void;
  }

  interface Aggregator {
    getIterator(): Iterator<string>;
  }

  class AlphabeticalOrderIterator implements Iterator<string> {
    private collection: WordsCollection;
    private position: number = 0;
    private reverse: boolean = false;

    constructor(collection: WordsCollection, reverse: boolean = false) {
      this.collection = collection;
      this.reverse = reverse;

      if (reverse) {
        this.position = collection.getCount() - 1;
      }
    }

    rewind() {
      this.position = this.reverse ? this.collection.getCount() - 1 : 0;
    }

    current(): string {
      return this.collection.getItems()[this.position];
    }

    key(): number {
      return this.position;
    }

    next(): string {
      const item = this.collection.getItems()[this.position];
      this.position += this.reverse ? -1 : 1;
      return item;
    }

    valid(): boolean {
      if (this.reverse) {
        return this.position >= 0;
      }

      return this.position < this.collection.getCount();
    }
  }

  class WordsCollection implements Aggregator {
    private items: string[] = [];

    getItems(): string[] {
      return this.items;
    }

    getCount(): number {
      return this.items.length;
    }

    addItem(item: string): void {
      this.items.push(item);
    }

    getIterator(): Iterator<string> {
      return new AlphabeticalOrderIterator(this);
    }

    getReverseIterator(): Iterator<string> {
      return new AlphabeticalOrderIterator(this, true);
    }
  }

  const collection = new WordsCollection();
  collection.addItem('First');
  collection.addItem('Second');
  collection.addItem('Third');

  const iterator = collection.getIterator();

  while (iterator.valid()) {
    console.log(`iterator: ${iterator.next()}`);
  }

  const reverseIterator = collection.getReverseIterator();
  while (reverseIterator.valid()) {
    console.log(`iterator: ${reverseIterator.next()}`);
  }

  // Пример 1
  interface ICar {
    model: string;
    color: string;
  }

  class IteratorExample {
    private index: number;
    private elements: { [key: string]: ICar };
    private keys: any;

    constructor(elements: { [key: string]: ICar }) {
      this.index = 0;
      this.elements = elements;
      this.keys = Object.keys(elements);
    }

    next() {
      return this.elements[this.keys[this.index++]];
    }

    hasNext(): boolean {
      return this.index < this.keys.length;
    }
  }

  const autos = {
    audi: { model: 'Audi', color: 'green' },
    fiat: { model: 'Fiat', color: 'gray' },
  };
  const iteratorExample = new IteratorExample(autos);
  while (iteratorExample.hasNext()) {
    console.log('iterator: ', iteratorExample.next());
  }

  console.log('====================================');
}
