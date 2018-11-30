interface IPlayer {
    changeVolume(value: number): void,
    play(): void,
    stop(): void,
    Buffer: AudioBuffer,
    Source: any,
}

export default IPlayer;