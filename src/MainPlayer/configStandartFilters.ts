export default ([
    {
        type: BiquadFilterType.highshelf,
        frequency: 4700,
        gain: 50,
    }, {
        type: BiquadFilterType.lowshelf,
        frequency: 35,
        gain: 50,
    }, {
        type: BiquadFilterType.highpass,
        frequency: 800,
        Q: 0.7,
    }, {
        type: BiquadFilterType.lowpass,
        frequency: 800,
        Q: 0.7,
    },
])