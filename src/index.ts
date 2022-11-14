import * as aptosFunctions from './aptos';
import * as cosmosFunctions from './cosmos';
import { InstallError } from './error';
import * as tendermintFunctions from './tendermint';

export { InstallError };

export function isInstalled() {
  return !!window.cosmostation;
}

export type Cosmos = typeof cosmosFunctions;
export type Aptos = typeof aptosFunctions;

export function cosmos(): Promise<Cosmos> {
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

export function aptos(): Promise<Aptos> {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (isInstalled()) {
        clearInterval(interval);
        resolve(aptosFunctions);
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

// legacy
export type Tendermint = typeof tendermintFunctions;

export function tendermint(): Promise<Tendermint> {
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
