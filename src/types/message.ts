export type SupportedChainNamesResponse = {
  official: string[];
  unofficial: string[];
};

export type RequestAccountsResponse = {
  address: string;
  publicKey: Uint8Array;
};

type GasRate = {
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
};

type Amount = {
  denom: string;
  amount: string;
};

type Msg<T = unknown> = {
  type: string;
  value: T;
};

type Fee = { amount: Amount[]; gas: string };

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
