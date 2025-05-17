type Unsubscribe = () => boolean;

type Subscription<T> = (
  callback: (value: T) => void,
  emitOnSubscribe?: boolean,
) => Unsubscribe;

export type Signal<T> = {
  set: (value: T) => void;
  update: (updater: (value: T) => T) => void;
  subscribe: Subscription<T>;

  (): T;
};

export type ComputedSignal<T> = {
  subscribe: Subscription<T>;

  (): T;
};

export type SignalType<T> = T extends Signal<infer U> ? U : never;
