import { isDeepEqual } from '../../utils';
import type {
  ClassObjectObservable,
  Observable,
  Observer,
  Unobserve,
} from './observable.type';

interface ObsObserveOptions {
  emitOnObserve?: boolean;
}

interface ObsUpdateOptions {
  equalityCheck?: boolean;
}

interface ObsInitOptions extends ObsObserveOptions, ObsUpdateOptions {}

interface ClassArrayObservable<T> extends Observable<T, ObsObserveOptions> {
  set: (list: T, options?: ObsUpdateOptions) => void;
  update: (updater: (list: T) => T, options?: ObsUpdateOptions) => void;
}

// eslint-disable-next-line max-lines-per-function, @typescript-eslint/no-explicit-any
export const obsClassArr = <T extends ClassObjectObservable<any>>(
  list: T[],
  initOptions: ObsInitOptions = {
    equalityCheck: true,
    emitOnObserve: false,
  },
): ClassArrayObservable<T[]> => {
  const observers = new Set<Observer<T[]>>();
  let currentList = [...list];

  const getUnobserve = (): Unobserve[] =>
    currentList.map((x) =>
      x.toObject.observe(() => {
        observers.forEach((observer) => {
          observer(currentList);
        });
      }),
    );

  let unobserve = getUnobserve();

  const returnFn: ClassArrayObservable<T[]> = () => currentList;

  returnFn.observe = (observer, options = initOptions): Unobserve => {
    observers.add(observer);

    if (options.emitOnObserve === true) {
      observer(currentList);
    }

    return () => observers.delete(observer);
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  returnFn.set = (list, options = initOptions): void => {
    if (options.equalityCheck === true && isDeepEqual(currentList, list)) {
      return;
    }

    currentList = list;

    unobserve.forEach((x) => {
      x();
    });

    unobserve = getUnobserve();

    observers.forEach((observer) => {
      observer(currentList);
    });
  };

  returnFn.update = (updater, options = initOptions): void => {
    returnFn.set(updater([...currentList]), options);
  };

  return returnFn;
};
