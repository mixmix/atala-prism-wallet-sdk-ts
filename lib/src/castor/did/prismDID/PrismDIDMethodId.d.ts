export declare class PrismDIDMethodId {
    private readonly value;
    readonly sections: string[];
    constructor(value: string);
    static fromSections(sections: string[]): PrismDIDMethodId;
    toString(): string;
}
