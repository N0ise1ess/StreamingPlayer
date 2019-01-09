import IPlayer from './IPlayer';

export default class BasicPlayer implements IPlayer {
    protected  _context: AudioContext;
    protected _source: any;

    private _buffer: any;
    private _gainNode: any;
    private _pausedAt = 0 as any;
    private _startedAt = 0 as any;
    private _volume = 100 as number;
    private _isPlayed = false as boolean;

    private MAX_VALUE_VOLUME = 200;

    /**
     * 
     * @param context AudioContext | webkitAudioContext.
     */
    constructor(context: AudioContext) {
        this._context = context;
        this._gainNode = this._context.createGain();
        this._gainNode.connect(this._context.destination);
    }

    /**
     * @param value? time start
     */
    public play(value?: number) {
        try {
            if(!this._isPlayed) {
                this.initSource();
                this._startedAt = Date.now() - this._pausedAt;
                if(value) this._startedAt -= value;    
                this._pausedAt === 0 ? this._source.start(0) : this._source.start(0, this._pausedAt / 1000);
            } else throw new Error('Уже проигрывает музыку!');
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

    protected async initSource() {
        this._source =  this._context.createBufferSource();
        this._source.connect(this._gainNode);
        this._source.buffer = this._buffer;
        this.changeVolume(this._volume);
    }

    private stopTrack = () => {
        this._isPlayed = false;
        this._source.stop(0);
    }

    /**
     * @param data Audio content
     */
    public setData = async (data: ArrayBuffer) => this._buffer = await this._context.decodeAudioData(data, (buffer:any) => buffer);

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
