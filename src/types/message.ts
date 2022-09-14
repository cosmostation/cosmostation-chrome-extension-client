import type { COSMOS_TYPE, SEND_TRANSACTION_MODE } from '../cosmos';

export type SendTransactionMode = typeof SEND_TRANSACTION_MODE[keyof typeof SEND_TRANSACTION_MODE];
export type CosmosType = typeof COSMOS_TYPE[keyof typeof COSMOS_TYPE];

export type SupportedChainNamesResponse = {
  official: string[];
  unofficial: string[];
};

export type SupportedChainIdsResponse = SupportedChainNamesResponse;

export type ActivatedChainNamesResponse = string[];

export type ActivatedChainIdsResponse = ActivatedChainNamesResponse;

export type RequestAccountResponse = {
  address: string;
  publicKey: Uint8Array;
  name: string;
  isLedger: boolean;
};

export type AccountResponse = RequestAccountResponse;

export type GasRate = {
  tiny: string;
  low: string;
  average: string;
};

export type AddChainParams = {
  chainId: string;
  chainName: string;
  restURL: string;
  imageURL?: string;
  baseDenom: string;
  displayDenom: string;
  decimals?: number;
  coinType?: string;
  addressPrefix: string;
  coinGeckoId?: string;
  gasRate?: GasRate;
  sendGas?: string;
  type?: CosmosType;
};

export type Amount = {
  denom: string;
  amount: string;
};

export type Msg<T = unknown> = {
  type: string;
  value: T;
};

export type Fee = { amount: Amount[]; gas: string };

export type SignAminoDoc = {
  chain_id: string;
  sequence: string;
  account_number: string;
  fee: Fee;
  memo: string;
  msgs: Msg[];
};

export type SignAminoResponse = {
  signature: string;
  pub_key: { type: string; value: string };
  signed_doc: SignAminoDoc;
};

export type SignDirectDoc = {
  chain_id: string;
  body_bytes: Uint8Array;
  auth_info_bytes: Uint8Array;
  account_number: string;
};

export type SignDirectResponse = {
  signature: string;
  pub_key: { type: string; value: string };
  signed_doc: SignDirectDoc;
};

export type SignOptions = {
  memo?: boolean;
  fee?: boolean;
  gasRate?: {
    tiny: string;
    low: string;
    average: string;
  };
};

export type SendTransaction = {
  code: number;
  txhash: string;
  raw_log?: unknown;
  codespace?: unknown;
  tx?: unknown;
  log?: unknown;
  info?: unknown;
  height?: unknown;
  gas_wanted?: unknown;
  gas_used?: unknown;
  events?: unknown;
  data?: unknown;
  timestamp?: unknown;
};

export type SendTransactionResponse = {
  tx_response: SendTransaction;
};

export type SetAutoSignResponse = null;
export type GetAutoSignResponse = number | null;
export type DeleteAutoSignResponse = null;

export type CW20Token = {
  contractAddress: string;
  imageURL?: string;
  coinGeckoId?: string;
};

export type AddCW20TokenResponse = null;
export type getCW20TokenBalanceResponse = string;
export type getCW20TokenInfoResponse = {
  decimals: number;
  name: string;
  symbol: string;
  total_supply: string;
};
