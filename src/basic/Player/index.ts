import BasicPlayer from '../BasicPlayer';
import Filter from '../Filter';
import IPlayer from './IPlayer';
import configStandartFilters from './configStandartFilters';
import IFilter, { IOptions } from '../Filter/IFilter';

export default class Player extends BasicPlayer implements IPlayer {

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
        return this._filters.map(filter => filter);
    }

}