export type Observer<T> = (x: T) => void;

export type Unobserve = () => boolean;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Observable<T, O = any> {
  observe: (observer: Observer<T>, options?: O) => Unobserve;

  (): T;
}

export type ObservableType<T> = T extends Observable<infer R> ? R : never;

export interface ClassObjectObservable<T> {
  toObject: Observable<T>;
}
