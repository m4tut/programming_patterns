class Singleton {
  private static instance: Singleton;

  private constructor() {}

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }

    return Singleton.instance;
  }

  public someBusinessLogic() {}
}

const s1 = Singleton.getInstance();
const s2 = Singleton.getInstance();

if (s1 === s2) {
  console.log('singleton: s1 === s2');
} else {
  console.log('singleton: s1 !== s2');
}

// Пример 1
class CountSingleton {
  private static instance: CountSingleton;

  private count: number = 0;

  private constructor(count: number) {
    this.count = count;
  }

  public static getInstance(count: number): CountSingleton {
    if (!CountSingleton.instance) {
      CountSingleton.instance = new CountSingleton(count);
    }

    return CountSingleton.instance;
  }

  public getCount() {
    return CountSingleton.instance.count;
  }
}

const countSingleton1 = CountSingleton.getInstance(10);
const countSingleton2 = CountSingleton.getInstance(20);

console.log('singleton countSingleton1: ',countSingleton1.getCount());
console.log('singleton countSingleton2: ', countSingleton2.getCount());
console.log('singleton countSingleton1 === countSingleton2: ', countSingleton1 === countSingleton2);

console.log('====================================');
