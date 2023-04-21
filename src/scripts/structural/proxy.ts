{
  interface Subject {
    request(): void;
  }

  class RealSubject implements Subject {
    request(): void {
      console.log('proxy: RealSubject - Handling request.');
    }
  }

  class Proxy implements Subject {
    private realSubject: RealSubject;

    constructor(realSubject?: RealSubject) {
      this.realSubject = realSubject || new RealSubject();
    }

    request(): void {
      this.realSubject.request();
      this.logAccess();
    }

    private logAccess(): void {
      console.log('proxy: log');
    }
  }

  const realSubject = new RealSubject();
  realSubject.request();

  const proxy = new Proxy(realSubject);
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

  console.log('====================================');
}
