import { InstallError } from './error';
import { addChain, getAccount, getSupportedChains, offAccountChanged, onAccountChanged, requestAccount, signAmino } from './tendermint';

export { InstallError };

export type Tendermint = {
  addChain: typeof addChain;
  getAccount: typeof getAccount;
  requestAccount: typeof requestAccount;
  signAmino: typeof signAmino;
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
        resolve({ addChain, requestAccount, signAmino, getSupportedChains, onAccountChanged, offAccountChanged, getAccount });
      }
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      reject(new InstallError());
    }, 500);
  });
}
