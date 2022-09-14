# @cosmostation/extension-client

## How to use

### Installation

```bash
yarn add @cosmostation/extension-client
```

```bash
npm install @cosmostation/extension-client
```

---

### \* Ethereum

```typescript
import { ethereum, InstallError } from '@cosmostation/extension-client';

try {
  const provider = await ethereum();
} catch (e) {
  if (e instanceof InstallError) {
    console.log('not installed');
  }
}
```

#### Use web3.js

- [npmjs](https://www.npmjs.com/package/web3)
- [docs](https://web3js.readthedocs.io)

```typescript
import Web3 from 'web3';
import { ethereum, InstallError } from '@cosmostation/extension-client';

try {
  const provider = await ethereum();

  const web3 = new Web3(provider);

  // requestAccounts
  const accounts = web3.eth.requestAccounts();

  // If you want more info, please check out web3.js docs (https://web3js.readthedocs.io)
} catch (e) {
  if (e instanceof InstallError) {
    console.log('not installed');
  }

  // exception
}
```

#### Use ethers.js

- [npmjs](https://www.npmjs.com/package/ethers)
- [docs](https://docs.ethers.io)

```typescript
import { ethers } from 'ethers';
import { ethereum, InstallError } from '@cosmostation/extension-client';

try {
  const provider = await ethereum();

  const ethersProvider = new ethers.providers.Web3Provider(provider);

  // requestAccounts
  const accounts = ethersProvider.send('eth_requestAccounts', []);

  // If you want more info, please check out ethers docs (https://docs.ethers.io)
} catch (e) {
  if (e instanceof InstallError) {
    console.log('not installed');
  }

  // exception
}
```

---

### \* Cosmos chains

#### provider

```typescript
import { cosmos, InstallError } from '@cosmostation/extension-client';

try {
  const provider = await cosmos();
} catch (e) {
  if (e instanceof InstallError) {
    console.log('not installed');
  }
}
```

#### getSupportedChains

```typescript
import { cosmos, InstallError } from '@cosmostation/extension-client';

try {
  const provider = await cosmos();

  const supportedChains = await provider.getSupportedChains();
} catch (e) {
  if (e instanceof InstallError) {
    console.log('not installed');
  }
}
```

##### response (example)

```json
{
  "official": ["cosmos", "osmosis"],
  "unofficial": ["test"]
}
```

```typescript
type SupportedChainNamesResponse = {
  official: string[];
  unofficial: string[];
};
```

#### getSupportedChainIds

```typescript
import { cosmos, InstallError } from '@cosmostation/extension-client';

try {
  const provider = await cosmos();

  const supportedChainIds = await provider.getSupportedChainIds();
} catch (e) {
  if (e instanceof InstallError) {
    console.log('not installed');
  }
}
```

##### response (example)

```json
{
  "official": ["cosmoshub-4", "gravity-bridge-3"],
  "unofficial": ["columbus-5", "agoric-3"]
}
```

```typescript
type SupportedChainIdsResponse = {
  official: string[];
  unofficial: string[];
};
```

#### getActivatedChains

```typescript
import { cosmos, InstallError } from '@cosmostation/extension-client';

try {
  const provider = await cosmos();

  const activatedChains = await provider.getActivatedChains();
} catch (e) {
  if (e instanceof InstallError) {
    console.log('not installed');
  }
}
```

##### response (example)

```json
["cosmos", "osmosis"]
```

```typescript
export type ActivatedChainNamesResponse = string[];
```

#### getActivatedChainIds

```typescript
import { cosmos, InstallError } from '@cosmostation/extension-client';

try {
  const provider = await cosmos();

  const activatedChainIds = await provider.getActivatedChainIds();
} catch (e) {
  if (e instanceof InstallError) {
    console.log('not installed');
  }
}
```

##### response (example)

```json
["cosmoshub-4", "gravity-bridge-3"]
```

```typescript
export type ActivatedChainIdsResponse = string[];
```

#### getAccount

```typescript
import { cosmos, InstallError } from '@cosmostation/extension-client';

try {
  const provider = await cosmos();

  const account = await provider.getAccount('cosmos');
} catch (e) {
  if (e instanceof InstallError) {
    console.log('not installed');
  }
}
```

##### response (example)

```json
{
  "name": "accountName",
  "address": "cosmos1wgeoiheoighwoighwioeghoweghoiweghiow",
  "publicKey": [3, 77, 9, 189, 251, 249, 150, 235, 192, 56, 51, 98, 56, 242, 12, 102, 144, 211, 89, 42, 187, 170]
}
```

```typescript
type AccountResponse = {
  name: string;
  address: string;
  publicKey: Uint8Array;
};
```

#### requestAccount (Popup)

```typescript
import { cosmos, InstallError } from '@cosmostation/extension-client';

try {
  const provider = await cosmos();

  const account = await provider.requestAccount('cosmos');
} catch (e) {
  if (e instanceof InstallError) {
    console.log('not installed');
  }

  if (e.code === 4001) {
    console.log('user rejected request');
  }
}
```

##### response (example)

```json
{
  "name": "accountName",
  "address": "cosmos1wgeoiheoighwoighwioeghoweghoiweghiow",
  "publicKey": [3, 77, 9, 189, 251, 249, 150, 235, 192, 56, 51, 98, 56, 242, 12, 102, 144, 211, 89, 42, 187, 170],
  "isLedger": false
}
```

```typescript
type RequestAccountResponse = {
  name: string;
  address: string;
  publicKey: Uint8Array;
  isLedger: boolean;
};
```

#### addChain

```typescript
import { cosmos, InstallError } from '@cosmostation/extension-client';
try {
  const provider = await cosmos();
  const supportedChains = await provider.getSupportedChains();

  if (![...supportedChains.official, ...supportedChains.unofficial].includes('cerberus')) {
    await provider.addChain({
      chainId: 'cerberus-chain-1',
      chainName: 'cerberus',
      addressPrefix: 'cre',
      baseDenom: 'ucrbrus',
      displayDenom: 'CRBRUS',
      restURL: 'https://lcd-office.cosmostation.io/mooncat-1-1',
      coinType: '118', // optional (default: '118')
      decimals: 6, // optional (default: 6)
      gasRate: {
        // optional (default: { average: '0.025', low: '0.0025', tiny: '0.00025' })
        average: '0.2',
        low: '0.02',
        tiny: '0.002',
      },
      sendGas: '80000', // optional (default: '100000')
      type: 'ETHERMINT', // optional (default: '')
    });
  }
} catch (e) {
  if (e instanceof InstallError) {
    console.log('not installed');
  }

  if (e.code === 4001) {
    console.log('user rejected request');
  }
}
```

##### response (example)

```
true
```

```typescript
type addChainResponse = boolean;
```

#### signAmino

```typescript
import { cosmos, InstallError } from '@cosmostation/extension-client';
try {
  const provider = await cosmos();
  const response = await provider.signAmino(
    'cosmos',
    {
      chain_id: 'cosmoshub-4',
      fee: { amount: [{ denom: 'uatom', amount: '5000' }], gas: '200000' },
      memo: '',
      msgs: [
        {
          type: 'cosmos-sdk/MsgSend',
          value: {
            from_address: 'cosmos1wepghweioghweiog',
            to_address: 'cosmos1weogihweoighweoigheoiw',
            amount: [{ denom: 'uatom', amount: '5000' }],
          },
        },
      ],
      sequence: '20',
      account_number: '632177',
    },
    {
      memo: true, // editable (memo) / optional
      fee: true, // editable (fee) / optional
      gasRate: {
        // optional
        average: '0.2',
        low: '0.02',
        tiny: '0.002',
      },
    },
  );
} catch (e) {
  if (e instanceof InstallError) {
    console.log('not installed');
  }

  if (e.code === 4001) {
    console.log('user rejected request');
  }
}
```

##### response (example)

```json
{
  "pub_key": { "type": "tendermint/PubKeySecp256k1", "value": "A00Jvfv5luvAODNiOPIMZpDTWSq7qvoFV8k7ptdsDqLU" },
  "signature": "signature==",
  "signed_doc": {
    "chain_id": "cosmoshub-4",
    "fee": { "amount": [{ "denom": "uatom", "amount": "5000" }], "gas": "200000" },
    "memo": "",
    "msgs": [
      {
        "type": "cosmos-sdk/MsgSend",
        "value": {
          "from_address": "cosmos1gr0e3pj3y6fqvzyfm0qxyw9h5dwfrvh8zv3x9p",
          "to_address": "cosmos1ursv4z57pw8ly2jsgn09dyjha4qrk7aen987ld",
          "amount": [{ "denom": "uatom", "amount": "5000" }]
        }
      }
    ],
    "sequence": "20",
    "account_number": "632177"
  }
}
```

```typescript
export type SignAminoResponse = {
  signature: string;
  pub_key: { type: string; value: string };
  signed_doc: SignAminoDoc;
};

export type SignAminoDoc = {
  chain_id: string;
  sequence: string;
  account_number: string;
  fee: Fee;
  memo: string;
  msgs: Msg[];
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
```

#### signDirect

```typescript
import { cosmos, InstallError } from '@cosmostation/extension-client';
try {
  const provider = await cosmos();
  const response = await provider.signDirect(
    'cosmos',
    {
      chain_id: 'cosmoshub-4',
      account_number: '1',
      auth_info_bytes: [
        10, 80, 10, 70, 10, 31, 47, 99, 111, 115, 109, 111, 115, 46, 99, 114, 121, 112, 116, 111, 46, 115, 101, 99, 112, 50, 53, 54, 107, 49, 46, 80, 117, 98,
        75, 101, 121, 18, 35, 10, 33, 3, 77, 9, 189, 251, 249, 150, 235, 192, 56, 51, 98, 56, 242, 12, 102, 144, 211, 89, 42, 187, 170, 250, 5, 87, 201, 59,
        166, 215, 108, 14, 162, 212, 18, 4, 10, 2, 8, 127, 24, 14, 18, 19, 10, 13, 10, 5, 117, 97, 116, 111, 109, 18, 4, 50, 48, 48, 48, 16, 128, 241, 4,
      ],
      body_bytes: [
        10, 133, 1, 10, 28, 47, 99, 111, 115, 109, 111, 115, 46, 98, 97, 110, 107, 46, 118, 49, 98, 101, 116, 97, 49, 46, 77, 115, 103, 83, 101, 110, 100, 18,
        101, 10, 42, 99, 114, 101, 49, 103, 114, 48, 101, 51, 112, 106, 51, 121, 54, 102, 113, 118, 122, 121, 102, 109, 48, 113, 120, 121, 119, 57, 104, 53,
        100, 119, 102, 114, 118, 104, 56, 120, 121, 122, 114, 115, 118, 18, 42, 99, 114, 101, 49, 120, 53, 119, 103, 104, 54, 118, 119, 121, 101, 54, 48, 119,
        118, 51, 100, 116, 115, 104, 115, 57, 100, 109, 113, 103, 103, 119, 102, 120, 50, 108, 100, 104, 103, 108, 117, 101, 122, 26, 11, 10, 4, 117, 99, 114,
        101, 18, 3, 49, 48, 48, 18, 0,
      ],
    },
    {
      memo: true, // editable (memo) / optional
      fee: true, // editable (fee) / optional
      gasRate: {
        // optional
        average: '0.2',
        low: '0.02',
        tiny: '0.002',
      },
    },
  );
} catch (e) {
  if (e instanceof InstallError) {
    console.log('not installed');
  }

  if (e.code === 4001) {
    console.log('user rejected request');
  }
}
```

##### response (example)

```json
{
  "pub_key": { "type": "tendermint/PubKeySecp256k1", "value": "A00Jvfv5luvAODNiOPIMZpDTWSq7qvoFV8k7ptdsDqLU" },
  "signature": "signature==",
  "signed_doc": {
    "chain_id": "cosmoshub-4",
    "account_number": "1",
    "auth_info_bytes": [
      10, 80, 10, 70, 10, 31, 47, 99, 111, 115, 109, 111, 115, 46, 99, 114, 121, 112, 116, 111, 46, 115, 101, 99, 112, 50, 53, 54, 107, 49, 46, 80, 117, 98, 75,
      101, 121, 18, 35, 10, 33, 3, 77, 9, 189, 251, 249, 150, 235, 192, 56, 51, 98, 56, 242, 12, 102, 144, 211, 89, 42, 187, 170, 250, 5, 87, 201, 59, 166, 215,
      108, 14, 162, 212, 18, 4, 10, 2, 8, 127, 24, 14, 18, 19, 10, 13, 10, 5, 117, 97, 116, 111, 109, 18, 4, 50, 48, 48, 48, 16, 128, 241, 4
    ],
    "body_bytes": [
      10, 133, 1, 10, 28, 47, 99, 111, 115, 109, 111, 115, 46, 98, 97, 110, 107, 46, 118, 49, 98, 101, 116, 97, 49, 46, 77, 115, 103, 83, 101, 110, 100, 18,
      101, 10, 42, 99, 114, 101, 49, 103, 114, 48, 101, 51, 112, 106, 51, 121, 54, 102, 113, 118, 122, 121, 102, 109, 48, 113, 120, 121, 119, 57, 104, 53, 100,
      119, 102, 114, 118, 104, 56, 120, 121, 122, 114, 115, 118, 18, 42, 99, 114, 101, 49, 120, 53, 119, 103, 104, 54, 118, 119, 121, 101, 54, 48, 119, 118, 51,
      100, 116, 115, 104, 115, 57, 100, 109, 113, 103, 103, 119, 102, 120, 50, 108, 100, 104, 103, 108, 117, 101, 122, 26, 11, 10, 4, 117, 99, 114, 101, 18, 3,
      49, 48, 48, 18, 0
    ]
  }
}
```

```typescript
export type SignDirectResponse = {
  signature: string;
  pub_key: { type: string; value: string };
  signed_doc: SignDirectDoc;
};

export type SignDirectDoc = {
  chain_id: string;
  body_bytes: Uint8Array;
  auth_info_bytes: Uint8Array;
  account_number: string;
};
```

#### sendTransaction

```typescript
import { cosmos, InstallError } from '@cosmostation/extension-client';
import { SEND_TRANSACTION_MODE } from '@cosmostation/extension-client/cosmos';

try {
  const provider = await cosmos();
  const response = await provider.sendTransaction(
    'cosmos',
    'abc=', // base64 string or Uint8Array
    SEND_TRANSACTION_MODE.ASYNC /* SEND_TRANSACTION_MODE or one of [0, 1, 2, 3] */,
  );
} catch (e) {
  if (e instanceof InstallError) {
    console.log('not installed');
  }

  // connection or internal error
}
```

##### response (example)

```json
{
  "tx_response": {
    "code": 0,
    "codespace": "",
    "data": "",
    "events": [],
    "gas_used": "0",
    "gas_wanted": "0",
    "height": "0",
    "info": "",
    "logs": [],
    "raw_log": "[]",
    "timestamp": "",
    "tx": null,
    "txhash": "4CC689A1E8CF89E1CF1E98D523BC171FEC749DCF8CFED296FA441AF1E0C47C4C"
  }
}
```

```typescript
export type SendTransactionResponse = {
  tx_response: SendTransaction;
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

export const SEND_TRANSACTION_MODE = {
  UNSPECIFIED: 0,
  BLOCK: 1,
  SYNC: 2,
  ASYNC: 3,
};
```

#### setAutoSign

```typescript
import { cosmos, InstallError } from '@cosmostation/extension-client';

try {
  const provider = await cosmos();
  const response = await provider.autoSign.set(
    'cosmos',
    1000, // seconds, 0~3600
  );
} catch (e) {
  if (e instanceof InstallError) {
    console.log('not installed');
  }

  if (e.code === 4001) {
    console.log('user rejected request');
  }

  // connection or internal error
}
```

##### response (example)

```json
null
```

```typescript
export type SetAutoSignResponse = null;
```

#### getAutoSign

for getting auto sign's end time

```typescript
import { cosmos, InstallError } from '@cosmostation/extension-client';

try {
  const provider = await cosmos();
  const response = await provider.autoSign.get('cosmos'); // if exists then end time (number) else null

  const endDate = response ? new Date(response) : null;
} catch (e) {
  if (e instanceof InstallError) {
    console.log('not installed');
  }

  if (e.code === 4001) {
    console.log('user rejected request');
  }

  // connection or internal error
}
```

##### response (example)

```json
1659335896648
```

```typescript
export type GetAutoSignResponse = number | null;
```

#### deleteAutoSign

```typescript
import { cosmos, InstallError } from '@cosmostation/extension-client';

try {
  const provider = await cosmos();
  const response = await provider.autoSign.delete('cosmos');
} catch (e) {
  if (e instanceof InstallError) {
    console.log('not installed');
  }

  if (e.code === 4001) {
    console.log('user rejected request');
  }

  // connection or internal error
}
```

##### response (example)

```json
null
```

```typescript
export type DeleteAutoSignResponse = null;
```

#### onAccountChanged

```typescript
import { cosmos, InstallError } from '@cosmostation/extension-client';
try {
  const provider = await cosmos();

  provider.onAccountChanged(() => console.log('changed'));
} catch (e) {
  if (e instanceof InstallError) {
    console.log('not installed');
  }

  if (e.code === 4001) {
    console.log('user rejected request');
  }
}
```

#### offAccountChanged

```typescript
import { cosmos, InstallError } from '@cosmostation/extension-client';
try {
  const provider = await cosmos();

  const event = provider.onAccountChanged(() => console.log('changed'));
  provider.offAccountChanged(event);
} catch (e) {
  if (e instanceof InstallError) {
    console.log('not installed');
  }

  if (e.code === 4001) {
    console.log('user rejected request');
  }
}
```
