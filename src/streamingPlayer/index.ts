import { IStreamingPlayer } from "./IStreamingPlayer";
import Player from "../basic/Player";
import IPlayer from "../basic/Player/IPlayer";
import { IOptions } from "../basic/Filter/IFilter";
import fetch from 'isomorphic-fetch'
import concat from "../untils/concat";

export default class StreamingPlayer implements IStreamingPlayer {
    private _player = {} as IPlayer;
    private _isCancel = false as Boolean;

    constructor(context: AudioContext) {
        this._player = new Player(context);
    }

    public createStandartFilters() {
        this._player.createStandartFilters();
    }

    //REFACTORING!! Use generators
    public downloadSound = async (url: string) => {
        this._isCancel = false;
        const res = await fetch(url);
        let rest: any = null;
        let isFirstBuffer = true;
        const reader = res.body.getReader();
        let oldBuffer: ArrayBuffer;
        const readBuffer = async () => {
            const setBuffer = () => {
                let buffer = rest === null ? value.buffer : concat(rest, value.buffer);
                if (isFirstBuffer) {
                    if(buffer.byteLength <= 44) {
                        rest = buffer;
                        readBuffer();
                        return;
                    }
                    buffer = buffer.slice(44);
                }
                if (buffer.byteLength % 2 === 0) {
                    rest = null;
                } else {
                    rest = buffer.slice(-2, -1);
                    buffer = buffer.slice(0, -1);
                }
                
                if(isFirstBuffer) {
                    oldBuffer = buffer;
                    this._player.setData(buffer);
                } else {
                    oldBuffer = concat(oldBuffer, buffer);
                    console.log(oldBuffer)
                    this._player.setData(oldBuffer);
                }
                isFirstBuffer = false;
            }
            
            if(this._isCancel) {
                reader.cancel();
                return;
            }
            const { value, done } = await reader.read();
            value && value.buffer && setBuffer();
    
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