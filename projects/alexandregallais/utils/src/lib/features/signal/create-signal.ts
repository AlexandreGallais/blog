import type { Signal } from './signal.type';

export const createSignal = <T>(value: T): Signal<T> => {
  let x = value;

  const subscribers = new Set<(value: T) => void>();

  const signal: Signal<T> = () => x;

  // eslint-disable-next-line @typescript-eslint/no-shadow
  signal.set = (value): void => {
    if (x === value) {
      return;
    }

    x = value;

    subscribers.forEach((callback) => {
      callback(value);
    });
  };

  signal.update = (updater): void => {
    signal.set(updater(x));
  };

  signal.subscribe = (callback, emitOnSubscribe = false) => {
    subscribers.add(callback);

    if (emitOnSubscribe) {
      callback(x);
    }

    return (): boolean => subscribers.delete(callback);
  };

  return signal;
};
