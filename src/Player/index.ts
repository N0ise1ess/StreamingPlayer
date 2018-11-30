import Buffer from '../Buffer';
import IPlayer from './IPlayer';

export default class Player implements IPlayer {
    public _context: AudioContext;
    public _source: any;
    private _buffer: AudioBuffer;
    private _gainNode: any;

    private MAX_VALUE_VOLUME = 100;

    /**
     * 
     * @param context AudioContext | webkitAudioContext
     * @param data Audio content
     */
    constructor(context: AudioContext, data: any) {
        this._context = context;
        this._buffer = new Buffer(context, data).Buffer();
    }
    
    public play() {
        this._gainNode = this._context.createGain();
        this._source = this._context.createBufferSource();
        this._source.buffer = this._buffer;
        this._source.connect(this._gainNode);
        this._gainNode.connect(this._context.destination);

        if (!this._source.start) this._source.start = this._source.noteOn;

        this._source.start();
    }  
    
    public stop() {
        if (!this._source.stop) this._source.stop = this._source.noteOff;
        
        this._source.stop();
    }

    public changeVolume(value: number) {
        var fraction = value / this.MAX_VALUE_VOLUME;
        this._gainNode.gain.value = fraction * fraction;
    };

    get Buffer():AudioBuffer {
        return this._buffer;
    }

    get Source(): any {
        return this._source;
    }
}
