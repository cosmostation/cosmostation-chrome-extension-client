interface Window {
  cosmostation: {
    ethereum: {
      request: (message: { method: string; params?: unknown }) => Promise<T>;
      on: (eventName: string, eventHandler: (event?: unknown) => void) => unknown;
      off: (handler: unknown) => void;
      sendAsync: () => null;
    };
    tendermint: {
      request: (message: { method: string; params?: unknown }) => Promise<T>;
      on: (eventName: string, eventHandler: (event?: unknown) => void) => unknown;
      off: (handler: unknown) => void;
    };
  };
}
