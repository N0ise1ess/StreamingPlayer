import { IStreamingPlayer, IStatePlayer } from "./IStreamingPlayer";
import Player from "../basic/Player";
import IPlayer from "../basic/Player/IPlayer";
import { IOptions } from "../basic/Filter/IFilter";
import concat from "../untils/concat";

export default class StreamingPlayer implements IStreamingPlayer {
    private _player = {} as IPlayer;
    private _state = {
        bufferFifo: [],
        isCancel: false,
        isPlayed: false,
        isDownloadingDone: false,
        isSetDataDone: false,
    } as IStatePlayer;
    private setDataWithInterval: any;

    constructor(context: AudioContext) {
        this._player = new Player(context);
    }

    public createStandartFilters() {
        this._player.createStandartFilters();
    }

    public downloadSound = async (url: string) => {
        this._state.isDownloadingDone = false;
        this._state.isCancel = false;
        // @ts-ignore
        const res = await fetch(url);
        const reader = res.body.getReader();
        const readBuffer = async () => {            
            if(this._state.isCancel) {
                reader.cancel();
                return;
            }
            const { value, done } = await reader.read();
            value && value.buffer && this._state.bufferFifo.push(value.buffer);
            if (done) {
                this._state.isDownloadingDone = true;
                return;
            }
            readBuffer();
        }
        readBuffer();

    }

    public play = async () => {
        this._state.isPlayed = true;
        await this.setData();
        this._player.play();
        this.setDataWithInterval = setInterval(async () => {
            if(this._state.isSetDataDone) {
                clearInterval(this.setDataWithInterval);
                return;
            }
            await this.setData();
            this._player.pause();
            this._state.isPlayed && this._player.play(0.7);
            if(this._state.isDownloadingDone) {
                this._state.isSetDataDone = true;
                clearInterval(this.setDataWithInterval);
            }
        }, 1000);
    }

    public stop = () => {
        clearInterval(this.setDataWithInterval);
        this._player.stop();
    }

    public pause = () => {
        this._state.isPlayed = false;
        this._player.pause();
    }

    public cancelDownloadSound = () => this._state.isCancel = true;

    private setData = async () => {
        const data = this._state.bufferFifo.reduce((accumulator, currentValue) => concat(accumulator, currentValue), new ArrayBuffer(0));
        return await this._player.setData(data);
    }

    public createFilter = (option: IOptions) => this._player.createFilter(option);

    public get Filters() {
        return this._player.Filters;
    }

}