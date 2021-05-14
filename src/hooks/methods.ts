import type { Dispatch, SetStateAction } from 'react';
import { useRef, useState } from 'react';

export type NativeReducers<S> = Record<string, (state: S, ...args: any[]) => S>;

export type ImmerReducers<S> = Record<string, (state: S, ...args: any[]) => S | void>;

type Strip<T> = T extends (state: any, ...args: infer P) => any ? (...args: P) => void : never;

export type Methods<S, R extends NativeReducers<S> | ImmerReducers<S>> = {
  [K in keyof R]: Strip<R[K]>;
};

export type NativeMethodsHook<S, R extends NativeReducers<S>> = [
  S,
  Methods<S, R>,
  Dispatch<SetStateAction<S>>,
];

export function useMethodsExtensionNative<S, R extends NativeReducers<S>>(
  reducers: R,
  setState: Dispatch<SetStateAction<S>>,
): Methods<S, R> {
  const methodsRef = useRef<Methods<S, R> | undefined>(undefined);

  if (!methodsRef.current) {
    methodsRef.current = Object.keys(reducers).reduce((methods, key) => {
      const fn = reducers[key];
      const bound = (...args: any[]) => setState((s) => fn(s, ...args));
      Object.assign(methods, { [key]: bound });
      return methods;
    }, {} as Methods<S, R>);
  }

  return methodsRef.current;
}

export function useMethodsNative<S, R extends NativeReducers<S>>(
  reducers: R,
  initialState: S | (() => S),
): NativeMethodsHook<S, R> {
  const [state, setState] = useState(initialState);
  const boundMethods = useMethodsExtensionNative(reducers, setState);
  return [state, boundMethods, setState];
}
