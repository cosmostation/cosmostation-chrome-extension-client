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
    tendermint: {
      request: (message: { method: string; params?: unknown }) => Promise<T>;
      on: (eventName: string, eventHandler: (event?: unknown) => void) => unknown;
      off: (handler: unknown) => void;
    };
  };
}
