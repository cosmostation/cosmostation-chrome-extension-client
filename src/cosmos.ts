import type {
  AccountResponse,
  ActivatedChainIdsResponse,
  ActivatedChainNamesResponse,
  AddChainParams,
  AddCW20TokenResponse,
  CW20Token,
  DeleteAutoSignResponse,
  DisconnectResponse,
  GetAutoSignResponse,
  getCW20TokenBalanceResponse,
  getCW20TokenInfoResponse,
  RequestAccountResponse,
  SendTransactionMode,
  SendTransactionResponse,
  SetAutoSignResponse,
  SignAminoDoc,
  SignAminoResponse,
  SignDirectDoc,
  SignDirectResponse,
  SignMessageResponse,
  SignOptions,
  SupportedChainIdsResponse,
  SupportedChainNamesResponse,
  VerifyMessageResponse,
} from './types/message';

export function getSupportedChains() {
  return window.cosmostation.cosmos.request({ method: 'cos_supportedChainNames' }) as Promise<SupportedChainNamesResponse>;
}

export function getActivatedChains() {
  return window.cosmostation.cosmos.request({ method: 'cos_activatedChainNames' }) as Promise<ActivatedChainNamesResponse>;
}

export function getSupportedChainIds() {
  return window.cosmostation.cosmos.request({ method: 'cos_supportedChainIds' }) as Promise<SupportedChainIdsResponse>;
}

export function getActivatedChainIds() {
  return window.cosmostation.cosmos.request({ method: 'cos_activatedChainIds' }) as Promise<ActivatedChainIdsResponse>;
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

export function signMessage(chainName: string, signer: string, message: string) {
  return window.cosmostation.cosmos.request({
    method: 'cos_signMessage',
    params: { chainName, signer, message },
  }) as Promise<SignMessageResponse>;
}

export function verifyMessage(chainName: string, signer: string, message: string, signMessageResponse: SignMessageResponse) {
  return window.cosmostation.cosmos.request({
    method: 'cos_verifyMessage',
    params: { chainName, signer, message, publicKey: signMessageResponse.pub_key.value, signature: signMessageResponse.signature },
  }) as Promise<VerifyMessageResponse>;
}

export function sendTransaction(chainName: string, txBytes: Uint8Array | string, mode: SendTransactionMode) {
  return window.cosmostation.cosmos.request({
    method: 'cos_sendTransaction',
    params: { chainName, txBytes, mode },
  }) as Promise<SendTransactionResponse>;
}

export const autoSign = {
  set: (chainName: string, duration: number) =>
    window.cosmostation.cosmos.request({
      method: 'cos_setAutoSign',
      params: { chainName, duration },
    }) as Promise<SetAutoSignResponse>,
  get: (chainName: string) =>
    window.cosmostation.cosmos.request({
      method: 'cos_getAutoSign',
      params: { chainName },
    }) as Promise<GetAutoSignResponse>,
  delete: (chainName: string) =>
    window.cosmostation.cosmos.request({
      method: 'cos_deleteAutoSign',
      params: { chainName },
    }) as Promise<DeleteAutoSignResponse>,
};

export function addCW20Tokens(chainName: string, tokens: CW20Token[]) {
  return window.cosmostation.cosmos.request({
    method: 'cos_addTokensCW20',
    params: { chainName, tokens },
  }) as Promise<AddCW20TokenResponse>;
}

export function getCW20TokenBalance(chainName: string, contractAddress: string, address: string) {
  return window.cosmostation.cosmos.request({
    method: 'cos_getBalanceCW20',
    params: { chainName, contractAddress, address },
  }) as Promise<getCW20TokenBalanceResponse>;
}

export function getCW20TokenInfo(chainName: string, contractAddress: string) {
  return window.cosmostation.cosmos.request({
    method: 'cos_getTokenInfoCW20',
    params: { chainName, contractAddress },
  }) as Promise<getCW20TokenInfoResponse>;
}

export function on(eventName: 'accountChanged', handler: () => void) {
  return window.cosmostation.cosmos.on(eventName, handler);
}

export function off(event: unknown) {
  window.cosmostation.cosmos.off(event);
}

export function onAccountChanged(handler: () => void) {
  return window.cosmostation.cosmos.on('accountChanged', handler);
}

export function offAccountChanged(event: unknown) {
  window.cosmostation.cosmos.off(event);
}

export function disconnect() {
  return window.cosmostation.cosmos.request({
    method: 'cos_disconnect',
  }) as Promise<DisconnectResponse>;
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
