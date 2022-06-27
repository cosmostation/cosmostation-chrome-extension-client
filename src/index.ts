import { InstallError } from './error';
import { addChain, getAccount, getSupportedChains, offAccountChanged, onAccountChanged, requestAccount, signAmino, signDirect } from './tendermint';

export { InstallError };

export type Tendermint = {
  addChain: typeof addChain;
  getAccount: typeof getAccount;
  requestAccount: typeof requestAccount;
  signAmino: typeof signAmino;
  signDirect: typeof signDirect;
  getSupportedChains: typeof getSupportedChains;
  onAccountChanged: typeof onAccountChanged;
  offAccountChanged: typeof offAccountChanged;
};

export function isInstalled() {
  return !!window.cosmostation;
}

export function tendermint(): Promise<Tendermint> {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (isInstalled()) {
        clearInterval(interval);
        resolve({ addChain, requestAccount, signAmino, signDirect, getSupportedChains, onAccountChanged, offAccountChanged, getAccount });
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
