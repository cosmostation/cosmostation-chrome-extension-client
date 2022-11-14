/* eslint-disable @typescript-eslint/no-explicit-any */
interface Window {
  cosmostation: {
    ethereum: {
      request: (message: { method: string; params?: unknown }) => Promise<T>;
      on: (eventName: string, eventHandler: (event?: unknown) => void) => unknown;
      off: (handler: unknown) => void;
      sendAsync: () => null;
    };
    cosmos: {
      request: (message: { method: string; params?: unknown }) => Promise<T>;
      on: (eventName: string, eventHandler: (event?: unknown) => void) => unknown;
      off: (handler: unknown) => void;
    };
    aptos: {
      request: (message: { method: string; params?: unknown }) => Promise<T>;
      on: (eventName: string, eventHandler: (event?: any) => void) => void;
      off: (eventName: string, eventHandler: (event?: any) => void) => void;
    };
    tendermint: {
      request: (message: { method: string; params?: unknown }) => Promise<T>;
      on: (eventName: string, eventHandler: (event?: unknown) => void) => unknown;
      off: (handler: unknown) => void;
    };
  };
}
