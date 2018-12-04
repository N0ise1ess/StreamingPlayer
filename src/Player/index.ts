import Buffer from '../Buffer';
import IPlayer from './IPlayer';

export default class Player implements IPlayer {
    public _context: AudioContext;
    public _source: any;
    private _buffer: any;
    private _gainNode: any;
    private _pausedAt = 0 as any;
    private _startedAt = 0 as any;

    private MAX_VALUE_VOLUME = 100;

    /**
     * 
     * @param context AudioContext | webkitAudioContext
     * @param data Audio content
     */
    constructor(context: AudioContext) {
        this._context = context;
    }

    public setData = async (data: any) => {
        this._buffer = await new Buffer(this._context, data).getBuffer();
    } 
    
    public play = () => {
        try {
            this.init();
            if(this._pausedAt === 0) {
                this._startedAt = Date.now();
                this._source.start(0) 
            } else {
                this._startedAt = Date.now() - this._pausedAt;
                this._source.start(0, this._pausedAt / 1000);
            } 
        } catch(e) {
            throw new Error(e);
        }
    }  

    public pause = () => {
        this._pausedAt = Date.now() - this._startedAt;
        this.stopTrack();
    }
    
    public stop = () => {
        this._pausedAt = 0;
        this._startedAt = 0;
        this.stopTrack();
    }

    public changeVolume = (value: number) => {
        var fraction = value / this.MAX_VALUE_VOLUME;
        this._gainNode.gain.value = fraction * fraction;
    };

    private init = () => {
        this._source =  this._context.createBufferSource();
        this._source.connect( this._context.destination);
        this._source.buffer = this._buffer;

        if (!this._source.start) this._source.start = this._source.noteOn;
    }

    private stopTrack = () => {
        if (!this._source.stop) this._source.stop = this._source.noteOff;
        
        this._source.stop(0);
    }

    get Buffer():AudioBuffer {
        return this._buffer;
    }

    get Source(): any {
        return this._source;
    }
}
