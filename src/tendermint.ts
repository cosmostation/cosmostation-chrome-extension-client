import type {
  AccountResponse,
  AddChainParams,
  RequestAccountResponse,
  SignAminoDoc,
  SignAminoResponse,
  SignDirectDoc,
  SignDirectResponse,
  SupportedChainNamesResponse,
} from './types/message';

export function getSupportedChains() {
  return window.cosmostation.tendermint.request({ method: 'ten_supportedChainNames' }) as Promise<SupportedChainNamesResponse>;
}

export function getAccount(chainName: string) {
  return window.cosmostation.tendermint.request({ method: 'ten_account', params: { chainName } }) as Promise<AccountResponse>;
}

export function requestAccount(chainName: string) {
  return window.cosmostation.tendermint.request({ method: 'ten_requestAccount', params: { chainName } }) as Promise<RequestAccountResponse>;
}

export function addChain(chain: AddChainParams) {
  return window.cosmostation.tendermint.request({ method: 'ten_addChain', params: { ...chain } }) as Promise<boolean>;
}

export function signAmino(chainName: string, doc: SignAminoDoc, options?: { memo?: boolean; fee?: boolean }) {
  return window.cosmostation.tendermint.request({
    method: 'ten_signAmino',
    params: { chainName, doc, isEditMemo: !!options?.memo, isEditFee: !!options?.fee },
  }) as Promise<SignAminoResponse>;
}

export function signDirect(chainName: string, doc: SignDirectDoc, options?: { memo?: boolean; fee?: boolean }) {
  return window.cosmostation.tendermint.request({
    method: 'ten_signDirect',
    params: { chainName, doc, isEditMemo: !!options?.memo, isEditFee: !!options?.fee },
  }) as Promise<SignDirectResponse>;
}

export function onAccountChanged(handler: () => void) {
  return window.cosmostation.tendermint.on('accountChanged', handler);
}

export function offAccountChanged(event: unknown) {
  window.cosmostation.tendermint.off(event);
}
