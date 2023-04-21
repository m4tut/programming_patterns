{
  interface Subject {
    attach(observer: Observer): void;
    detach(observer: Observer): void;
    notify(): void;
  }

  class ConcreteSubject implements Subject {
    public state: number | undefined;
    private observers: Observer[] = [];

    public attach(observer: Observer): void {
      if (this.observers.includes(observer)) {
        return;
      }

      this.observers.push(observer);
    }

    public detach(observer: Observer): void {
      const observerIndex = this.observers.indexOf(observer);
      if (observerIndex === -1) {
        return;
      }

      this.observers.splice(observerIndex, 1);
    }

    public notify(): void {
      for (const observer of this.observers) {
        observer.update(this);
      }
    }

    public someBusinessLogic(): void {
      this.state = Math.floor(Math.random() * (10 + 1));
      console.log(`observer: My state has just changed to - ${this.state}`);
      this.notify();
    }
  }

  interface Observer {
    update(subject: Subject): void;
  }

  class ConcreteObserverA implements Observer {
    public update(subject: Subject): void {
      if (subject instanceof ConcreteSubject && subject.state && subject.state < 6) {
        console.log('observer: ConcreteObserverA - Reacted to the event.');
      }
    }
  }

  class ConcreteObserverB implements Observer {
    public update(subject: Subject): void {
      if (subject instanceof ConcreteSubject && subject.state && subject.state >= 6) {
        console.log('observer: ConcreteObserverB - Reacted to the event.');
      }
    }
  }

  const subject = new ConcreteSubject();
  const observer1 = new ConcreteObserverA();
  const observer2 = new ConcreteObserverB();

  subject.attach(observer1);
  subject.attach(observer2);

  subject.someBusinessLogic();
  subject.someBusinessLogic();

  subject.detach(observer1);
  subject.detach(observer2);

  subject.someBusinessLogic();

  // Пример 1
  class AutoNews {
    private news: string;
    private actions: Subscriber[];

    constructor() {
      this.news = '';
      this.actions = [];
    }

    setNews(news: string) {
      this.news = news;
      this.notifyAll();
    }

    notifyAll() {
      this.actions.forEach(subs => subs.inform(this));
    }

    register(observer: Subscriber) {
      this.actions.push(observer);
    }

    unregister(observer: Subscriber) {
      this.actions = this.actions.filter(el => !(el === observer));
    }

    getNews() {
      return this.news
    }
  }

  interface Subscriber {
    inform(news: AutoNews): void;
  }

  class Jack implements Subscriber {
    inform(news: AutoNews) {
      console.log(`observer: Jack has been informed about - ${news.getNews()}`);
    }
  }

  class Bob implements Subscriber {
    inform(news: AutoNews) {
      console.log(`observer: Bob has been informed about - ${news.getNews()}`);
    }
  }

  const autoNews = new AutoNews();
  autoNews.register(new Jack());
  autoNews.register(new Bob());

  autoNews.setNews('New Tesla price is 40 000$');

  console.log('====================================');
}
