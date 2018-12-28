enum BiquadFilterType {
    lowpass = 'lowpass',
    highpass = 'highpass',
    bandpass = 'bandpass',
    lowshelf = 'lowshelf',
    highshelf = 'highshelf',
    peaking = 'peaking',
    notch = 'notch',
    allpass = 'allpass'
}

export default ([
    {
        type: BiquadFilterType.highshelf,
        frequency: 4700,
        gain: 0,
    }, {
        type: BiquadFilterType.lowshelf,
        frequency: 35,
        gain: 0,
    }, {
        type: BiquadFilterType.highpass,
        frequency: 800,
        Q: 0,
    }, {
        type: BiquadFilterType.lowpass,
        frequency: 800,
        Q: 0,
    },
])