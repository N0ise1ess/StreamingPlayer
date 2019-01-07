import IBuffer from './IBuffer';

export default class Buffer implements IBuffer {

    private _context: AudioContext;
    private _content: ArrayBuffer;

    /**
     * 
     * @param context AudioContext | webkitAudioContext
     * @param content Audio content
     */
    constructor(context: AudioContext, content: ArrayBuffer) {
        this._context = context;
        this._content = content;
    }

    getBuffer = async () => await this._context.decodeAudioData(this._content, (buffer:any) => buffer);
}