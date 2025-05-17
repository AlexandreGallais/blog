import type { ComputedSignal, Signal, SignalType } from './signal.type';

type SignalValueMap<T> = {
  [key in keyof T]: SignalType<T[key]>;
};

export const createComputedSignal = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  SignalMap extends Record<string, Signal<any>>,
  T,
>(
  signalMap: SignalMap,
  computed: (valueMap: SignalValueMap<SignalMap>) => T,
): ComputedSignal<T> => {
  const generateValueMap = (): SignalValueMap<SignalMap> =>
    // @ts-expect-error Return the good value.
    Object.fromEntries(
      Object.entries(signalMap).map(([key, value]) => [key, value()]),
    );

  let x = computed(generateValueMap());

  const subscribers = new Set<(value: T) => void>();

  Object.values(signalMap).forEach((signal) => {
    signal.subscribe(() => {
      const value = computed(generateValueMap());

      if (x === value) {
        return;
      }

      x = value;

      subscribers.forEach((callback) => {
        callback(value);
      });
    });
  });

  const computedSignal: ComputedSignal<T> = () => x;

  computedSignal.subscribe = (callback, emitOnSubscribe = false) => {
    subscribers.add(callback);

    if (emitOnSubscribe) {
      callback(x);
    }

    return (): boolean => subscribers.delete(callback);
  };

  return computedSignal;
};
