import Buffer from '../Buffer';
import IPlayer from './IPlayer';

export default class Player implements IPlayer {
    protected  _context: AudioContext;
    protected _source: any;

    private _buffer: any;
    private _gainNode: any;
    // private _filter = {} as BiquadFilterNode;
    private _pausedAt = 0 as any;
    private _startedAt = 0 as any;
    private _volume = 100 as number;

    private MAX_VALUE_VOLUME = 200;

    /**
     * 
     * @param context AudioContext | webkitAudioContext.
     */
    constructor(context: AudioContext) {
        this._context = context;
        // this._filter = context.createBiquadFilter();
    }

    /**
     * @param value? time start
     */
    public play(value?: number) {
        try {
            this.initSource();
            this._startedAt = Date.now() - this._pausedAt;
            this._pausedAt === 0 ? this._source.start(0) : this._source.start(0, this._pausedAt / 1000);
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
    
    /**
     *  @param value 0-200 
     */
    public changeVolume = (value: number = 100) => {
        this._volume = value;
        const fraction = value / this.MAX_VALUE_VOLUME;
        this._gainNode.gain.value = fraction * fraction;
    };

    /**
     * 
     * @param value seconds
     */
    public changeTime(value: string) {
        try {
            this._pausedAt = Date.now() - this._startedAt + parseInt(value)*1000;
            this.stopTrack();
            this.play();
        } catch(e) {
            throw new Error(e);
        }
    }

    // public changeFilterValue(value: number) {
    //     try {
    //         var minValue = 40;
    //         var maxValue = this._context.sampleRate / 2;
    //         var numberOfOctaves = Math.log(maxValue / minValue) / Math.LN2;
    //         var multiplier = Math.pow(2, numberOfOctaves * (value - 1.0));
    //         this._filter.frequency.value = maxValue * multiplier;
    //     } catch(e) {
    //         throw new Error(e);
    //     }
    // }

    protected initSource() {
        this._gainNode = this._context.createGain();
        this._source =  this._context.createBufferSource();
        this._source.connect(this._gainNode);
        this._gainNode.connect(this._context.destination)
        this._source.buffer = this._buffer;
        this.changeVolume(this._volume);

        if (!this._source.start) this._source.start = this._source.noteOn;
    }

    private stopTrack = () => {
        if (!this._source.stop) this._source.stop = this._source.noteOff;
        
        this._source.stop(0);
    }

    /**
     * @param data Audio content
     */
    public async setData(data: ArrayBuffer) {
        this._buffer = await new Buffer(this._context, data).getBuffer();
    }    
    
    /**
     * @param value Type filter
     */
    // public set TypeFilter(value: BiquadFilterType) {
    //     if(typeof this._filter.type === 'string') this._filter.type = value;
    // }

    /**
     * @param value set context
     */
    public set Context(value: AudioContext) {
        this._context = value;
    }

    public get Context() {
        return this._context;
    }

    public get Buffer():AudioBuffer {
        return this._buffer;
    }

    public get Source(): any {
        return this._source;
    }

    public get CurrentTimeBuffer(): number {
        return Date.now() - this._startedAt;
    }

    public get DurationBuffer(): number {
        return this._buffer && this._buffer.duration;
    }
}
