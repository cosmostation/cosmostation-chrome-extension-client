import * as cosmosFunctions from './cosmos';
import { InstallError } from './error';
import * as tendermintFunctions from './tendermint';

export { InstallError };

export function isInstalled() {
  return !!window.cosmostation;
}

export function cosmos(): Promise<typeof cosmosFunctions> {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (isInstalled()) {
        clearInterval(interval);
        resolve(cosmosFunctions);
      }
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      reject(new InstallError());
    }, 500);
  });
}

// legacy
export function tendermint(): Promise<typeof tendermintFunctions> {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (isInstalled()) {
        clearInterval(interval);
        resolve(tendermintFunctions);
      }
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      reject(new InstallError());
    }, 500);
  });
}

export function ethereum(): Promise<{
  request: (message: { method: string; params?: unknown }) => Promise<unknown>;
  on: (eventName: string, eventHandler: (event?: unknown) => void) => unknown;
  off: (handler: unknown) => void;
  sendAsync: () => null;
}> {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (isInstalled()) {
        clearInterval(interval);
        resolve(window.cosmostation.ethereum);
      }
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      reject(new InstallError());
    }, 500);
  });
}
