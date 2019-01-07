import { IStreamingPlayer } from "./IStreamingPlayer";
import Player from "../basic/Player";
import IPlayer from "../basic/Player/IPlayer";
import { IOptions } from "../basic/Filter/IFilter";

export default class StreamingPlayer implements IStreamingPlayer {
    private _player = {} as IPlayer;

    constructor(context: AudioContext) {
        this._player = new Player(context);
    }

    public createStandartFilters() {
        this._player.createStandartFilters();
    }

    public createFilter = (option: IOptions) => this._player.createFilter(option);

    public get Filters() {
        return this._player.Filters;
    }

}