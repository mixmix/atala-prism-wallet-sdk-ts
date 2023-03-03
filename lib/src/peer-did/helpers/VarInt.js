"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uVarIntNumber = exports.readVarInt = exports.readUVarInt = exports.varInt = exports.putVarInt = exports.uVarInt = exports.putUVarInt = void 0;
/** putUVarInt encodes a UInt64 into a buffer and returns it.
 */
function putUVarInt(value, buffer) {
    let val = value;
    const tmpBuffer = [];
    do {
        let b = val & 0x7f;
        val >>>= 7;
        if (val > 0) {
            b |= 0x80;
        }
        tmpBuffer.push(b);
    } while (val > 0);
    for (let i = tmpBuffer.length - 1; i >= 0; i--) {
        buffer.unshift(tmpBuffer[i]);
    }
    return buffer;
}
exports.putUVarInt = putUVarInt;
/** uVarInt decodes an UInt64 from a byte buffer and returns the value and the
    number of bytes greater than 0 that were read.
    If an error occurs the value will be 0 and the number of bytes n is <= 0
    with the following meaning:
        n == 0: buf too small
        n  < 0: value larger than 64 bits (overflow)
        and -n is the number of bytes read
*/
function uVarInt(buffer) {
    let output = 0;
    let counter = 0;
    let shifter = 0;
    for (const byte of buffer) {
        if (byte < 0x80) {
            if (counter > 9 || (counter === 9 && byte > 1)) {
                return [0, -(counter + 1)];
            }
            return [output | (byte << shifter), counter + 1];
        }
        output |= (byte & 0x7f) << shifter;
        shifter += 7;
        counter += 1;
    }
    return [0, 0];
}
exports.uVarInt = uVarInt;
/** putVarInt encodes an Int64 into a buffer and returns it.
 */
function putVarInt(value, buffer = []) {
    const unsignedValue = Number(value) << Number(1);
    return putUVarInt(Number(unsignedValue), buffer);
}
exports.putVarInt = putVarInt;
/** varInt decodes an Int64 from a byte buffer and returns the value and the
      number of bytes greater than 0 that were read.
      If an error occurs the value will be 0 and the number of bytes n is <= 0
      with the following meaning:
           n == 0: buf too small
           n  < 0: value larger than 64 bits (overflow)
                   and -n is the number of bytes read
  */
function varInt(buffer) {
    let unsignedValue = Number(0);
    let shifter = Number(0);
    let counter = 0;
    for (const byte of buffer) {
        if (byte < 0x80) {
            if (counter > 9 || (counter === 9 && byte > 1)) {
                throw new Error("Value larger than 64 bits (overflow)");
            }
            return [Number(unsignedValue | (Number(byte) << shifter)), counter + 1];
        }
        unsignedValue |= Number(byte & 0x7f) << shifter;
        shifter += Number(7);
        counter += 1;
    }
    throw new Error("Input buffer too small");
}
exports.varInt = varInt;
function readUVarInt(buffer) {
    let value = Number(0);
    let shifter = Number(0);
    let index = 0;
    for (const byte of buffer) {
        const byteValue = Number(byte);
        value |= (byteValue & 0x7f) << shifter;
        if (byteValue < 0x80) {
            return value;
        }
        shifter += Number(7);
        index += 1;
        if (index > 9) {
            throw new Error("Value larger than 64 bits (overflow)");
        }
    }
    throw new Error("Input buffer too small");
}
exports.readUVarInt = readUVarInt;
function readVarInt(buffer) {
    const unsignedValue = readUVarInt(buffer);
    let value = unsignedValue >> 1;
    if (unsignedValue & 1) {
        value = ~value;
    }
    return value;
}
exports.readVarInt = readVarInt;
function uVarIntNumber(buffer) {
    const [size, bytesRead] = uVarInt(buffer);
    if (bytesRead === 0) {
        throw new Error("Input buffer too small");
    }
    if (bytesRead < 0) {
        throw new Error("Value larger than 64 bits (overflow)");
    }
    // Return the size as read from the uvarint and the buffer without the uvarint
    return [size, buffer.slice(bytesRead)];
}
exports.uVarIntNumber = uVarIntNumber;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmFySW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3BlZXItZGlkL2hlbHBlcnMvVmFySW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBO0dBQ0c7QUFDSCxTQUFnQixVQUFVLENBQUMsS0FBYSxFQUFFLE1BQWdCO0lBQ3hELElBQUksR0FBRyxHQUFXLEtBQUssQ0FBQztJQUN4QixNQUFNLFNBQVMsR0FBYSxFQUFFLENBQUM7SUFFL0IsR0FBRztRQUNELElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7UUFDbkIsR0FBRyxNQUFNLENBQUMsQ0FBQztRQUNYLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRTtZQUNYLENBQUMsSUFBSSxJQUFJLENBQUM7U0FDWDtRQUNELFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDbkIsUUFBUSxHQUFHLEdBQUcsQ0FBQyxFQUFFO0lBRWxCLEtBQUssSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUM5QyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzlCO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQWxCRCxnQ0FrQkM7QUFFRDs7Ozs7OztFQU9FO0FBQ0YsU0FBZ0IsT0FBTyxDQUFDLE1BQWdCO0lBQ3RDLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNmLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztJQUNoQixJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFFaEIsS0FBSyxNQUFNLElBQUksSUFBSSxNQUFNLEVBQUU7UUFDekIsSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFO1lBQ2YsSUFBSSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLLENBQUMsSUFB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