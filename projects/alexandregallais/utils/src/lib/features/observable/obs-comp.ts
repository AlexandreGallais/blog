import type { Observable, Observer, Unobserve } from './index';

type ValuesType<T> = {
  [K in keyof T]: T[K] extends Observable<infer R> ? R : never;
};

interface ObsObserveOptions {
  emitOnObserve?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const obsComp = <T, V extends Record<string, Observable<any>>>(
  values: V,
  computed: (values: ValuesType<V>) => T,
  initOptions: ObsObserveOptions = { emitOnObserve: false },
): Observable<T, ObsObserveOptions> => {
  const observers = new Set<Observer<T>>();

  const getValues = (): ValuesType<V> =>
    // @ts-expect-error Same type
    Object.fromEntries(
      Object.entries(values).map(([key, value]) => [key, value()]),
    );

  Object.values(values).forEach((value) => {
    value.observe(() => {
      observers.forEach((observer) => {
        observer(computed(getValues()));
      });
    });
  });

  const returnFn: Observable<T, ObsObserveOptions> = () =>
    computed(getValues());

  returnFn.observe = (observer, options = initOptions): Unobserve => {
    observers.add(observer);

    if (options.emitOnObserve === true) {
      observer(computed(getValues()));
    }

    return () => observers.delete(observer);
  };

  return returnFn;
};
