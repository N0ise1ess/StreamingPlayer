import IBuffer from './IBuffer';

export default class Buffer implements IBuffer {

    private _context: AudioContext;
    private _content: ArrayBuffer;
    public _buffer: any;

    /**
     * 
     * @param context AudioContext | webkitAudioContext
     * @param content Audio content
     */
    constructor(context: AudioContext, content: any) {
        this._context = context;
        this._content = content;
        this._buffer = this._context.decodeAudioData(this._content, (buffer:any) => buffer);
    }

    get Buffer(): any {
        return this._buffer;
    }
}