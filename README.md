# @cosmostation/extension-client

## How to use

### Installation

```bash
yarn add @cosmostation/extension-client
```

```bash
npm install @cosmostation/extension-client
```

### Tendermint

#### provider

```typescript
import { tendermint, InstallError } from '@cosmostation/extension-client';

try {
  const provider = await tendermint();
} catch (e) {
  if (e instanceof InstallError) {
    console.log('not installed');
  }
}
```

#### getSupportedChains

```typescript
import { tendermint, InstallError } from '@cosmostation/extension-client';

try {
  const provider = await tendermint();

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

#### getAccount

```typescript
import { tendermint, InstallError } from '@cosmostation/extension-client';

try {
  const provider = await tendermint();

  const account = await provider.getAccount({ chainName: 'cosmos' });
} catch (e) {
  if (e instanceof InstallError) {
    console.log('not installed');
  }
}
```

##### response (example)

```json
{
  "address": "cosmos1wgeoiheoighwoighwioeghoweghoiweghiow",
  "publicKey": [3, 77, 9, 189, 251, 249, 150, 235, 192, 56, 51, 98, 56, 242, 12, 102, 144, 211, 89, 42, 187, 170]
}
```

```typescript
type AccountResponse = {
  address: string;
  publicKey: Uint8Array;
};
```

#### requestAccount (Popup)

```typescript
import { tendermint, InstallError } from '@cosmostation/extension-client';

try {
  const provider = await tendermint();

  const account = await provider.requestAccount({ chainName: 'cosmos' });
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
  "address": "cosmos1wgeoiheoighwoighwioeghoweghoiweghiow",
  "publicKey": [3, 77, 9, 189, 251, 249, 150, 235, 192, 56, 51, 98, 56, 242, 12, 102, 144, 211, 89, 42, 187, 170]
}
```

```typescript
type RequestAccountResponse = {
  address: string;
  publicKey: Uint8Array;
};
```

#### addChain

```typescript
import { tendermint, InstallError } from '@cosmostation/extension-client';
try {
  const provider = await tendermint();
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
import { tendermint, InstallError } from '@cosmostation/extension-client';
try {
  const provider = await tendermint();
  const response = await provider.signAmino(
    'cosmos',
    {
      doc: {
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
    },
    { memo: true, fee: true }, // edit | optional (default: { memo: false, fee: false }),
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

#### onAccountChanged

```typescript
import { tendermint, InstallError } from '@cosmostation/extension-client';
try {
  const provider = await tendermint();

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
import { tendermint, InstallError } from '@cosmostation/extension-client';
try {
  const provider = await tendermint();

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
