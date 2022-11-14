import type {
  AptosAccountResponse,
  AptosConnectResponse,
  AptosDisconnectResponse,
  AptosIsConnectedResponse,
  AptosNetworkResponse,
  AptosSignAndSubmitTransactionResponse,
  AptosSignMessageParams,
  AptosSignMessageResponse,
  AptosSignPayload,
  AptosSignTransactionResponse,
} from './types/message';

export const connect = () => window.cosmostation.aptos.request({ method: 'aptos_connect', params: undefined }) as Promise<AptosConnectResponse>;
export const disconnect = () => window.cosmostation.aptos.request({ method: 'aptos_disconnect', params: undefined }) as Promise<AptosDisconnectResponse>;
export const isConnected = () => window.cosmostation.aptos.request({ method: 'aptos_isConnected', params: undefined }) as Promise<AptosIsConnectedResponse>;
export const network = () => window.cosmostation.aptos.request({ method: 'aptos_network', params: undefined }) as Promise<AptosNetworkResponse>;
export const account = () => window.cosmostation.aptos.request({ method: 'aptos_account', params: undefined }) as Promise<AptosAccountResponse>;
export const signAndSubmitTransaction = (payload: AptosSignPayload) =>
  window.cosmostation.aptos.request({ method: 'aptos_signAndSubmitTransaction', params: [payload] }) as Promise<AptosSignAndSubmitTransactionResponse>;
export const signTransaction = (payload: AptosSignPayload) =>
  window.cosmostation.aptos.request({ method: 'aptos_signTransaction', params: [payload] }) as Promise<AptosSignTransactionResponse>;
export const signMessage = (params: AptosSignMessageParams) =>
  window.cosmostation.aptos.request({ method: 'aptos_signMessage', params: [params] }) as Promise<AptosSignMessageResponse>;

export const onAccountChange = (eventHandler: (account: string) => void) => {
  window.cosmostation.aptos.on('accountChange', eventHandler);
};

export const offAccountChange = (eventHandler: (account: string) => void) => {
  window.cosmostation.aptos.off('accountChange', eventHandler);
};

export const onNetworkChange = (eventHandler: (network: string) => void) => {
  window.cosmostation.aptos.on('networkChange', eventHandler);
};

export const offNetworkChange = (eventHandler: (network: string) => void) => {
  window.cosmostation.aptos.off('networkChange', eventHandler);
};
