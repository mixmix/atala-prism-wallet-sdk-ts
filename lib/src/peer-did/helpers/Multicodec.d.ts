export declare enum Codec {
    x25519 = 236,
    ed25519 = 237
}
export declare enum KeyType {
    agreement = 0,
    authenticate = 1
}
export declare class MultiCodec {
    value: Uint8Array;
    static KeyType: typeof KeyType;
    constructor(value: Uint8Array, keyType?: KeyType);
    decode(defaultCodec?: Codec): [Codec, Uint8Array];
}
