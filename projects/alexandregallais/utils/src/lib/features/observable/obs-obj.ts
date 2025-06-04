import type { ObjectType } from '../../structures';
import { isDeepEqualUtil } from '../../utils';
import type { Observable, Observer, Unobserve } from './index';

interface ObsObserveOptions {
  emitOnObserve?: boolean;
}

interface ObsUpdateOptions {
  equalityCheck?: boolean;
}

interface ObsInitOptions extends ObsObserveOptions, ObsUpdateOptions {}

interface ObjectObservable<T> extends Observable<T, ObsObserveOptions> {
  set: (object: T, options?: ObsUpdateOptions) => void;
  update: (updater: (object: T) => T, options?: ObsUpdateOptions) => void;
}

export const obsObj = <T extends ObjectType>(
  object: T,
  initOptions: ObsInitOptions = {
    equalityCheck: true,
    emitOnObserve: false,
  },
): ObjectObservable<T> => {
  const observers = new Set<Observer<T>>();
  let currentObject = { ...object };

  const returnFn: ObjectObservable<T> = () => currentObject;

  returnFn.observe = (observer, options = initOptions): Unobserve => {
    observers.add(observer);

    if (options.emitOnObserve === true) {
      observer(currentObject);
    }

    return () => observers.delete(observer);
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  returnFn.set = (object, options = initOptions): void => {
    if (
      options.equalityCheck === true &&
      isDeepEqualUtil(currentObject, object)
    ) {
      return;
    }

    currentObject = object;

    observers.forEach((observer) => {
      observer(object);
    });
  };

  returnFn.update = (updater, options = initOptions): void => {
    returnFn.set(updater({ ...currentObject }), options);
  };

  return returnFn;
};
