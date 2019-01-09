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

    //REFACTORING!! Use generators
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

    public play = () => this._player.play();

    public stop = () => this._player.stop();

    public cancelDownloadSound = () => this._isCancel = true;

    public createFilter = (option: IOptions) => this._player.createFilter(option);

    public get Filters() {
        return this._player.Filters;
    }

}