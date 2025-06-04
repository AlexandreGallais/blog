// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ConstructorType<T, A extends any[] = any[]> = new (...args: A) => T;
