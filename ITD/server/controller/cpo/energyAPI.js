const mode = [{ id: '1', name: 'name1' }, { id: '2', name: 'name2' }]

const modeByBatteryKey = []
const percentageByBatteryKey = []

/**
 * Get the battery mode by battery key
 * @param {*} batteryKey the battery key
 * @returns the mode id
 */
const getBatteryMode = (batteryKey) => {
    const mode = modeByBatteryKey.find((item) => item.key === batteryKey)
    if (mode) {
        return mode
    }
    return "notAvailable"
}

// Get modes available
const getMode = () => {
    return mode
}

// Set mode of your battery key
const setMode = (modeName, batteryKey) => {
    const mode = getMode().filter((mode) => mode.name === modeName)[0]
    if (mode) {
        console.log(`Set ${mode.name} to ${batteryKey}`)
        const index = modeByBatteryKey.findIndex((item) => item.key === batteryKey)
        if (index !== -1) {
            modeByBatteryKey.splice(index, 1)
        }
        modeByBatteryKey.push({ key: batteryKey, mode: mode.name })
        return true
    }
    return false
}

// get the percentage of your battery
const getBatteryPercentage = (batteryKey) => {
    // if battery percentage in percentageByBatteryKey return it otherwise add a random value in percentageByBatteryKey and return it
    const percentage = percentageByBatteryKey.find((item) => item.key === batteryKey)
    if (percentage) {
        return percentage.percentage
    }
    const randomPercentage = Math.floor(Math.random() * 100)
    percentageByBatteryKey.push({ key: batteryKey, percentage: randomPercentage })
    return randomPercentage
}

module.exports = { getBatteryMode, getMode, setMode, getBatteryPercentage }