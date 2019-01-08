import { IOptions } from "../basic/Filter/IFilter";

export interface IStreamingPlayer {
    createStandartFilters(): any;
    createFilter(option: IOptions): any;
    downloadSound(url: string): Promise<void>;
}