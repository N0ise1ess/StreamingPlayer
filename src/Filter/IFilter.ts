export default interface IFilter {

}

export interface IOptions {
    type: BiquadFilterType,
    frequency: number,
    gain?: number,
    Q?: number,
}