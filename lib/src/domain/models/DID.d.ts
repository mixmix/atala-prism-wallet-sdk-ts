export declare class DID {
    readonly schema: string;
    readonly method: string;
    readonly methodId: string;
    constructor(schema: string, method: string, methodId: string);
    toString(): string;
    static fromString(text: string): DID;
    static getSchemaFromString(text: string): string;
    static getMethodFromString(text: string): string;
    static getMethodIdFromString(text: string): string;
}
