import { IStreamingPlayer } from "./IStreamingPlayer";
import Player from "../basic/Player";
import IPlayer from "../basic/Player/IPlayer";
import { IOptions } from "../basic/Filter/IFilter";
import concat from "../untils/concat";

export default class StreamingPlayer implements IStreamingPlayer {
    private _player = {} as IPlayer;
    private _isCancel = false as Boolean;
    private _bufferFifo = [] as ArrayBuffer[];

    constructor(context: AudioContext) {
        this._player = new Player(context);
    }

    public createStandartFilters() {
        this._player.createStandartFilters();
    }

    public downloadSound = async (url: string) => {
        this._isCancel = false;
        // @ts-ignore
        const res = await fetch(url);
        const reader = res.body.getReader();
        const readBuffer = async () => {            
            if(this._isCancel) {
                reader.cancel();
                return;
            }
            const { value, done } = await reader.read();
            value && value.buffer && this._bufferFifo.push(value.buffer);
            if (done) return;
            
            readBuffer();
        }
        readBuffer();

    }

    public play = async () => {
        const data = this._bufferFifo.reduce((accumulator, currentValue) => concat(accumulator, currentValue), new ArrayBuffer(0));
        await this._player.setData(data)
        this._player.play();
        this.setData();
    }

    public stop = () => {
        clearInterval(this.setData())
        this._player.stop();
    }

    public pause = () => this._player.pause();

    public cancelDownloadSound = () => this._isCancel = true;

    private setData = () => setInterval(async () => {
        const data = this._bufferFifo.reduce((accumulator, currentValue) => concat(accumulator, currentValue), new ArrayBuffer(0));
        await this._player.setData(data);
        this._player.pause();
        this._player.play(0.2);
    }, 1000);

    public createFilter = (option: IOptions) => this._player.createFilter(option);

    public get Filters() {
        return this._player.Filters;
    }

}