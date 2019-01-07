import { IOptions } from "../Filter/IFilter";

export default interface IMain {
    Filters: any;
    createStandartFilters(): any;
    createFilter(option: IOptions): any;
} 