import type {
  AccountResponse,
  AddChainParams,
  RequestAccountResponse,
  SendTransactionMode,
  SendTransactionResponse,
  SignAminoDoc,
  SignAminoResponse,
  SignDirectDoc,
  SignDirectResponse,
  SignOptions,
  SupportedChainNamesResponse,
} from './types/message';

export function getSupportedChains() {
  return window.cosmostation.cosmos.request({ method: 'cos_supportedChainNames' }) as Promise<SupportedChainNamesResponse>;
}

export function getAccount(chainName: string) {
  return window.cosmostation.cosmos.request({ method: 'cos_account', params: { chainName } }) as Promise<AccountResponse>;
}

export function requestAccount(chainName: string) {
  return window.cosmostation.cosmos.request({ method: 'cos_requestAccount', params: { chainName } }) as Promise<RequestAccountResponse>;
}

export function addChain(chain: AddChainParams) {
  return window.cosmostation.cosmos.request({ method: 'cos_addChain', params: { ...chain } }) as Promise<boolean>;
}

export function signAmino(chainName: string, doc: SignAminoDoc, options?: SignOptions) {
  return window.cosmostation.cosmos.request({
    method: 'cos_signAmino',
    params: { chainName, doc, isEditMemo: !!options?.memo, isEditFee: !!options?.fee, gasRate: options?.gasRate },
  }) as Promise<SignAminoResponse>;
}

export function signDirect(chainName: string, doc: SignDirectDoc, options?: SignOptions) {
  return window.cosmostation.cosmos.request({
    method: 'cos_signDirect',
    params: { chainName, doc, isEditMemo: !!options?.memo, isEditFee: !!options?.fee, gasRate: options?.gasRate },
  }) as Promise<SignDirectResponse>;
}

export function sendTransaction(chainName: string, txBytes: Uint8Array | string, mode: SendTransactionMode) {
  return window.cosmostation.cosmos.request({
    method: 'cos_sendTransaction',
    params: { chainName, txBytes, mode },
  }) as Promise<SendTransactionResponse>;
}

export function onAccountChanged(handler: () => void) {
  return window.cosmostation.cosmos.on('accountChanged', handler);
}

export function offAccountChanged(event: unknown) {
  window.cosmostation.cosmos.off(event);
}

export const SEND_TRANSACTION_MODE = {
  UNSPECIFIED: 0,
  BLOCK: 1,
  SYNC: 2,
  ASYNC: 3,
} as const;

export const COSMOS_TYPE = {
  BASIC: '',
  ETHERMINT: 'ETHERMINT',
} as const;
