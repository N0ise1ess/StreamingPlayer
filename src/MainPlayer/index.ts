import Player from '../Player';
import Filter from '../Filter';
import IMain from './IMain';
import configStandartFilters from './configStandartFilters';
import IFilter, { IOptions } from '../Filter/IFilter';

export default class Main extends Player implements IMain {

    private _filters = [] as IFilter[];

    constructor(context: AudioContext) {
        super(context);
    }

    private createFilter = (option: IOptions) => new Filter(this._context, option);

    public createStandartFilters() {
        this._filters = configStandartFilters.map(item => this.createFilter(item))
    }

    
}