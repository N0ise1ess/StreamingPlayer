import IFilter, { IOptions } from './IFilter';

export default class Filter implements IFilter {

    private _filter = {} as BiquadFilterNode;

    constructor(context: AudioContext, options: IOptions) {
        this._filter = context.createBiquadFilter();
        this._filter.type = options.type;
        this._filter.frequency.value = options.frequency;
        if (options.Q) this._filter.Q.value = options.Q;
        if(options.gain) this._filter.gain.value = options.gain;
    }

    public set Frequency(value: number) {
        this._filter.frequency.value = value;
    }

    public set Q(value: number) {
        this._filter.Q.value = value;
    }

    public set Gain(value: number) {
        this._filter.gain.value = value;
    }

    public get Filter() {
        return this._filter;
    }
}
