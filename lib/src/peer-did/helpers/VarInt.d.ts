/** putUVarInt encodes a UInt64 into a buffer and returns it.
 */
export declare function putUVarInt(value: number, buffer: number[]): number[];
/** uVarInt decodes an UInt64 from a byte buffer and returns the value and the
    number of bytes greater than 0 that were read.
    If an error occurs the value will be 0 and the number of bytes n is <= 0
    with the following meaning:
        n == 0: buf too small
        n  < 0: value larger than 64 bits (overflow)
        and -n is the number of bytes read
*/
export declare function uVarInt(buffer: number[]): [number, number];
/** putVarInt encodes an Int64 into a buffer and returns it.
 */
export declare function putVarInt(value: number, buffer?: number[]): number[];
/** varInt decodes an Int64 from a byte buffer and returns the value and the
      number of bytes greater than 0 that were read.
      If an error occurs the value will be 0 and the number of bytes n is <= 0
      with the following meaning:
           n == 0: buf too small
           n  < 0: value larger than 64 bits (overflow)
                   and -n is the number of bytes read
  */
export declare function varInt(buffer: number[]): [number, number];
export declare function readUVarInt(buffer: Uint8Array): number;
export declare function readVarInt(buffer: Uint8Array): number;
export declare function uVarIntNumber(buffer: number[]): [number, number[]];
