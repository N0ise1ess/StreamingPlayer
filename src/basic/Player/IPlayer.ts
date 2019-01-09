import { IOptions } from "../Filter/IFilter";

export default interface IPlayer {
    pause(): any;
    stop(): any;
    play(): any;
    setData(buffer: ArrayBuffer): any;
    Filters: any;
    DurationBuffer: any;
    CurrentTimeBuffer: any;
    Source: any;
    Buffer: any;
    createStandartFilters(): any;
    createFilter(option: IOptions): any;
} 