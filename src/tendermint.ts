import type { AddChainParams, RequestAccountsResponse, SignAminoDoc, SignAminoResponse, SupportedChainNamesResponse } from './types/message';

export function supportedChainNames() {
  return window.cosmostation.tendermint.request({ method: 'ten_supportedChainNames' }) as Promise<SupportedChainNamesResponse>;
}

export function requestAccount(chainName: string) {
  return window.cosmostation.tendermint.request({ method: 'ten_requestAccounts', params: { chainName } }) as Promise<RequestAccountsResponse>;
}

export function addChain(chain: AddChainParams) {
  return window.cosmostation.tendermint.request({ method: 'ten_addChain', params: { ...chain } }) as Promise<boolean>;
}

export function signAmino(chainName: string, doc: SignAminoDoc) {
  return window.cosmostation.tendermint.request({ method: 'ten_addChain', params: { chainName, doc } }) as Promise<SignAminoResponse>;
}
