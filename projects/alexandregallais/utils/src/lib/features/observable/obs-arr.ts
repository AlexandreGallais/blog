import { isDeepEqualUtil } from '../../utils';
import type { Observable, Observer, Unobserve } from './index';

interface ObsObserveOptions {
  emitOnObserve?: boolean;
}

interface ObsUpdateOptions {
  equalityCheck?: boolean;
}

interface ObsInitOptions extends ObsObserveOptions, ObsUpdateOptions {}

interface ArrayObservable<T> extends Observable<T, ObsObserveOptions> {
  set: (list: T, options?: ObsUpdateOptions) => void;
  update: (updater: (list: T) => T, options?: ObsUpdateOptions) => void;
}

export const obsArr = <T>(
  list: T[],
  initOptions: ObsInitOptions = {
    equalityCheck: true,
    emitOnObserve: false,
  },
): ArrayObservable<T[]> => {
  const observers = new Set<Observer<T[]>>();
  let currentList = [...list];

  const returnFn: ArrayObservable<T[]> = () => currentList;

  returnFn.observe = (observer, options = initOptions): Unobserve => {
    observers.add(observer);

    if (options.emitOnObserve === true) {
      observer(currentList);
    }

    return () => observers.delete(observer);
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  returnFn.set = (list, options = initOptions): void => {
    if (options.equalityCheck === true && isDeepEqualUtil(currentList, list)) {
      return;
    }

    currentList = list;

    observers.forEach((observer) => {
      observer(list);
    });
  };

  returnFn.update = (updater, options = initOptions): void => {
    returnFn.set(updater([...currentList]), options);
  };

  return returnFn;
};
