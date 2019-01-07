export default (buffer1: any, buffer2: any) => {
    const newBuffer = new Uint8Array(buffer1.byteLength + buffer2.byteLength);

    newBuffer.set(new Uint8Array(buffer1), 0);
    newBuffer.set(new Uint8Array(buffer2), buffer1.byteLength);

    return newBuffer.buffer;
}