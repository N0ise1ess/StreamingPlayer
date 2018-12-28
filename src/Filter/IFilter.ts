export default interface IFilter {
    [x: string]: any;
}

export interface IOptions {
    type: BiquadFilterType,
    frequency: number,
    gain?: number,
    Q?: number,
}