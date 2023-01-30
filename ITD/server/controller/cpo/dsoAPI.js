// This class is used to simulate the DSO API


/**
 * The idea is that a DSO can be changed if and only if a contractual bound is expired. For the sake of the demo, we assume that the bound are already expired
 */
const aWeekAgo = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)

/**
 * A list of mocked DSOs available for the EVCPs
 */
const DSOs = [
    { dsoID: 1, DSOname: "Xenel", DSOprice: 10, DSOexpiry: aWeekAgo },
    { dsoID: 2, DSOname: 'Medison', DSOprice: 0.67, DSOexpiry: aWeekAgo },
    { dsoID: 3, DSOname: 'B2B', DSOprice: 0.66, DSOexpiry: aWeekAgo },
    { dsoID: 4, DSOname: "NaN", DSOprice: 0.90, DSOexpiry: aWeekAgo },
    { dsoID: 5, DSOname: "Sergenia", DSOprice: 0.74, DSOexpiry: aWeekAgo },
    { dsoID: 6, DSOname: "GreenwashCo", DSOprice: 0.82, DSOexpiry: aWeekAgo },
    { dsoID: 7, DSOname: "DoloMity Energia'", DSOprice: 0.72, DSOexpiry: aWeekAgo },
    { dsoID: 8, DSOname: "OOlivi Energy", DSOprice: 0.01, DSOexpiry: aWeekAgo },
    { dsoID: 9, DSOname: "Pulsar", DSOprice: 0.65, DSOexpiry: aWeekAgo },
    { dsoID: 10, DSOname: "Pienitude", DSOprice: 0.80, DSOexpiry: aWeekAgo },
]

module.exports = {
    /**
     * This function returns a list of DSOs available for the EVCP. For the sake of the demo, we assume that the DSOs are randomly selected and that they are not directly related to the EVCP
     * @param {*} evcpID the ID of the EVCP
     * @returns the list of DSOs available for the EVCP
     */
    getDSOsAvailable: async (evcpID) => {
        return DSOs.sort(() => 0.5 - Math.random()).slice(0, 5)
    },
    /**
     * This function sets the DSO for the EVCP
     * @param {*} dsoID the ID of the DSO
     * @returns the DSO object
     */
    setDSO: async (dsoID, expiryDate) => {
        dso = DSOs.filter((dso) => dso.dsoID === dsoID)[0]
        if (!dso) return undefined
        if (new Date() > expiryDate) return dso
        return undefined
    }
}