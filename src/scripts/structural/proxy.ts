{
  interface Subject {
    request(): void;
  }

  class RealSubject implements Subject {
    request(): void {
      console.log('proxy: RealSubject - Handling request.');
    }
  }

  class ProxyClass implements Subject {
    private realSubject: RealSubject;

    constructor(realSubject?: RealSubject) {
      this.realSubject = realSubject || new RealSubject();
    }

    request(): void {
      this.realSubject.request();
      this.logAccess();
    }

    private logAccess(): void {
      console.log('proxy: logAccess');
    }
  }

  const realSubject = new RealSubject();
  realSubject.request();

  const proxy = new ProxyClass(realSubject);
  proxy.request();

  // Пример 1
  interface ICarAccess {
    open: () => void;
    close: () => void;
  }

  class CarAccess implements ICarAccess {
    open() {
      console.log('proxy: CarAccess - open');
    }

    close() {
      console.log('proxy: CarAccess - close');
    }
  }

  class SecuritySystem implements ICarAccess {
    private door: CarAccess;

    constructor(door?: CarAccess) {
      this.door = door || new CarAccess();
    }

    open() {
      this.authenticated();
      this.door.open();
    }

    authenticated() {
      console.log('proxy: SecuritySystem - authenticated');
    }

    close() {
      this.door.close();
    }
  }

  const securitySystem = new SecuritySystem();
  securitySystem.open();

  // Пример 2
  const networkFetch = (url: string) => `proxy: ${url} - server`;

  const cache = new Set();

  const proxiesFetch = new Proxy(networkFetch, {
    apply(target: Function, thisArg: any, args: never[]) {
      const url = args[0];

      if (cache.has(url)) {
        return `proxy: ${url} - cache`;
      } else {
        cache.add(url);
        return Reflect.apply(target, thisArg, args);
      }
    },
  });

  console.log(proxiesFetch('angular.io'));
  console.log(proxiesFetch('react.io'));
  console.log(proxiesFetch('angular.io'));

  console.log('====================================');
}
