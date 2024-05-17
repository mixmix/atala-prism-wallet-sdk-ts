[@atala/prism-wallet-sdk](../README.md) / [Exports](../modules.md) / [Domain](../modules/Domain.md) / [PlutoError](../modules/Domain.PlutoError.md) / StoreDeleteError

# Class: StoreDeleteError

[Domain](../modules/Domain.md).[PlutoError](../modules/Domain.PlutoError.md).StoreDeleteError

## Hierarchy

- `Error`

  ↳ **`StoreDeleteError`**

## Table of contents

### Constructors

- [constructor](Domain.PlutoError.StoreDeleteError.md#constructor)

### Properties

- [cause](Domain.PlutoError.StoreDeleteError.md#cause)
- [message](Domain.PlutoError.StoreDeleteError.md#message)
- [name](Domain.PlutoError.StoreDeleteError.md#name)
- [stack](Domain.PlutoError.StoreDeleteError.md#stack)
- [prepareStackTrace](Domain.PlutoError.StoreDeleteError.md#preparestacktrace)
- [stackTraceLimit](Domain.PlutoError.StoreDeleteError.md#stacktracelimit)

### Methods

- [captureStackTrace](Domain.PlutoError.StoreDeleteError.md#capturestacktrace)

## Constructors

### constructor

• **new StoreDeleteError**(`message?`): [`StoreDeleteError`](Domain.PlutoError.StoreDeleteError.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `string` |

#### Returns

[`StoreDeleteError`](Domain.PlutoError.StoreDeleteError.md)

#### Overrides

Error.constructor

#### Defined in

[src/domain/models/errors/Pluto.ts:38](https://github.com/input-output-hk/atala-prism-wallet-sdk-ts/blob/47ec1c8/src/domain/models/errors/Pluto.ts#L38)

## Properties

### cause

• `Optional` **cause**: `unknown`

#### Inherited from

Error.cause

#### Defined in

node_modules/typescript/lib/lib.es2022.error.d.ts:26

___

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1054

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1053

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1055

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

Optional override for formatting stack traces

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

Error.prepareStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:27

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:29

## Methods

### captureStackTrace

▸ **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:20