[@atala/prism-wallet-sdk](../README.md) / [Exports](../modules.md) / AgentDIDHigherFunctions

# Interface: AgentDIDHigherFunctions

## Implemented by

- [`Agent`](../classes/Agent.md)

## Table of contents

### Methods

- [createNewPeerDID](AgentDIDHigherFunctions.md#createnewpeerdid)
- [createNewPrismDID](AgentDIDHigherFunctions.md#createnewprismdid)
- [signWith](AgentDIDHigherFunctions.md#signwith)

## Methods

### createNewPeerDID

▸ **createNewPeerDID**(`services`, `updateMediator`): `Promise`\<[`DID`](../classes/Domain.DID.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `services` | [`Service`](../classes/Domain.Service.md)[] |
| `updateMediator` | `boolean` |

#### Returns

`Promise`\<[`DID`](../classes/Domain.DID.md)\>

#### Defined in

[src/prism-agent/types/index.ts:77](https://github.com/input-output-hk/atala-prism-wallet-sdk-ts/blob/f8f2652/src/prism-agent/types/index.ts#L77)

___

### createNewPrismDID

▸ **createNewPrismDID**(`alias`, `services`, `keyPathIndex?`): `Promise`\<[`DID`](../classes/Domain.DID.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `alias` | `string` |
| `services` | [`Service`](../classes/Domain.Service.md)[] |
| `keyPathIndex?` | `number` |

#### Returns

`Promise`\<[`DID`](../classes/Domain.DID.md)\>

#### Defined in

[src/prism-agent/types/index.ts:82](https://github.com/input-output-hk/atala-prism-wallet-sdk-ts/blob/f8f2652/src/prism-agent/types/index.ts#L82)

___

### signWith

▸ **signWith**(`did`, `message`): `Promise`\<[`Signature`](Domain.Signature.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | [`DID`](../classes/Domain.DID.md) |
| `message` | `Uint8Array` |

#### Returns

`Promise`\<[`Signature`](Domain.Signature.md)\>

#### Defined in

[src/prism-agent/types/index.ts:75](https://github.com/input-output-hk/atala-prism-wallet-sdk-ts/blob/f8f2652/src/prism-agent/types/index.ts#L75)
