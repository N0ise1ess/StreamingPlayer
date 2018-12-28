import Player from '../Player';
import Filter from '../Filter';
import IMain from './IMain';
import configStandartFilters from './configStandartFilters';
import IFilter, { IOptions } from '../Filter/IFilter';

export default class MainPlayer extends Player implements IMain {

    private _filters = [] as IFilter[];

    constructor(context: AudioContext) {
        super(context);
    }

    protected initSource() {
        super.initSource();
        this._filters.forEach(filter => {
            filter.Filter.connect(this._context.destination);
            this._source.connect(filter.Filter);
        })
    }

    public createStandartFilters() {
        this._filters = configStandartFilters.map((option: IOptions) => new Filter(this._context, option));
    }

    public createFilter = (option: IOptions) => this._filters.push(new Filter(this._context, option));

    public get Filters() {
        return this._filters;
    }

}