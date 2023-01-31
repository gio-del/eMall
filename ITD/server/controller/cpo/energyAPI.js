const mode = [{ id: '1', name: 'name1' }, { id: '2', name: 'name2' }]

const modeByBatteryKey = []

/**
 * Get the battery mode by battery key
 * @param {*} batteryKey the battery key
 * @returns the mode id
 */
const getBatteryMode = (batteryKey) => {
    const mode = modeByBatteryKey.find((item) => item.key === batteryKey)
    if (mode) {
        return mode.mode
    }
    return undefined
}

// Get modes available
const getMode = () => {
    return mode
}

// Set mode of your battery key
const setMode = (modeID, batteryKey) => {
    const mode = getMode(modeID)
    if (mode) {
        console.log(`Set ${mode.name} to ${batteryKey}`)
        const index = modeByBatteryKey.findIndex((item) => item.key === batteryKey)
        if (index !== -1) {
            modeByBatteryKey.splice(index, 1)
        }
        modeByBatteryKey.push({ key: batteryKey, mode: modeID })
        return true
    }
    return false
}

module.exports = { getBatteryMode, getMode, setMode }