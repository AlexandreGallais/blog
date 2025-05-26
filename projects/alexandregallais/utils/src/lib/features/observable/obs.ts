import type { PrimitiveType } from '../../structures';
import type { Observable, Observer, Unobserve } from './observable.type';

interface ObsObserveOptions {
  emitOnObserve?: boolean;
}

interface ObsUpdateOptions {
  equalityCheck?: boolean;
}

interface ObsInitOptions extends ObsObserveOptions, ObsUpdateOptions {}

interface PrimitiveObservable<T> extends Observable<T, ObsObserveOptions> {
  set: (value: T, options?: ObsUpdateOptions) => void;
  update: (updater: (value: T) => T, options?: ObsUpdateOptions) => void;
}

export const obs = <T extends PrimitiveType>(
  value: T,
  initOptions: ObsInitOptions = { equalityCheck: true, emitOnObserve: false },
): PrimitiveObservable<T> => {
  const observers = new Set<Observer<T>>();
  let currentValue = value;

  const returnFn: PrimitiveObservable<T> = () => currentValue;

  returnFn.observe = (observer, options = initOptions): Unobserve => {
    observers.add(observer);

    if (options.emitOnObserve === true) {
      observer(currentValue);
    }

    return () => observers.delete(observer);
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  returnFn.set = (value, options = initOptions): void => {
    if (options.equalityCheck === true && Object.is(currentValue, value)) {
      return;
    }

    currentValue = value;

    observers.forEach((observer) => {
      observer(value);
    });
  };

  returnFn.update = (updater, options = initOptions): void => {
    returnFn.set(updater(currentValue), options);
  };

  return returnFn;
};
