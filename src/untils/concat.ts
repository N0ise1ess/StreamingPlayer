export default (buffer1: any = new Uint8Array().buffer, buffer2: any = new Uint8Array().buffer) => {
    const newBuffer = new Uint8Array(buffer1.byteLength + buffer2.byteLength);

    buffer1.byteLength > 0 && newBuffer.set(new Uint8Array(buffer1), 0);
    buffer1.byteLength > 0 && newBuffer.set(new Uint8Array(buffer2), buffer1.byteLength);

    return newBuffer.buffer;
}