const aWeekFromNow = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)

const DSOs = [
    { dsoID: 1, DSOname: "Xenel", DSOprice: 10, DSOexpiry: aWeekFromNow },
    { dsoID: 2, DSOname: 'Medison', DSOprice: 0.67, DSOexpiry: aWeekFromNow },
    { dsoID: 3, DSOname: 'B2B', DSOprice: 0.66, DSOexpiry: aWeekFromNow },
    { dsoID: 4, DSOname: "NaN", DSOprice: 0.90, DSOexpiry: aWeekFromNow },
    { dsoID: 5, DSOname: "Sergenia", DSOprice: 0.74, DSOexpiry: aWeekFromNow },
    { dsoID: 6, DSOname: "GreenwashCo", DSOprice: 0.82, DSOexpiry: aWeekFromNow },
    { dsoID: 7, DSOname: "DoloMity Energia'", DSOprice: 0.72, DSOexpiry: aWeekFromNow },
    { dsoID: 8, DSOname: "OOlivi Energy", DSOprice: 0.01, DSOexpiry: aWeekFromNow },
    { dsoID: 9, DSOname: "Pulsar", DSOprice: 0.65, DSOexpiry: aWeekFromNow },
    { dsoID: 10, DSOname: "Pienitude", DSOprice: 0.80, DSOexpiry: aWeekFromNow },
]

module.exports = {
    getDSOsAvailable: async (evcpID) => {
        return DSOs.sort(() => 0.5 - Math.random()).slice(0, 5)
    },
    setDSO: async (dsoID) => {
        return DSOs.filter((dso) => dso.dsoID === dsoID)[0]
    }
}