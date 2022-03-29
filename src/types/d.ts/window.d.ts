interface Window {
  cosmostation: {
    ethereum: {
      request: (message: unknown) => Promise<T>;
      on: (eventName: unknown, eventHandler: (event?: unknown) => void) => void;
    };
    tendermint: {
      request: (message: unknown) => Promise<T>;
      on: (eventName: unknown, eventHandler: (event?: unknown) => void) => void;
      off: (handler: (event: MessageEvent<unknown>) => void) => void;
    };
  };
}
