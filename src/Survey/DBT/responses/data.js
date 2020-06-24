const data = [
  {
    id: "001",
    initials: "ABC",
    inSession: "Y",
    regularity: "daily",
    dateStarted: "2019-12-27",
    DBT: [
      {
        day: "Monday",
        urges: {
          suicide: 2,
          selfHarm: 1,
          drugs: 0
        },
        dailyRating: {
          emoMisery: 4,
          phyMisery: 2,
          joy: 3
        },
        drugsMeds: {
          alcohol: {
            amt: 0,
            name: ""
          },
          illicitDrugs: {
            amt: 0,
            name: ""
          },
          meds: {
            prescribed: "No",
            amt: 1,
            name: "Med1"
          }
        },
        actions: {
          selfHarm: 2,
          skills: 5
        },
        emotions: 0,
        optional: ""
      },
      {
        day: "Tuesday",
        urges: {
          suicide: 2,
          selfHarm: 1,
          drugs: 0
        },
        dailyRating: {
          emoMisery: 4,
          phyMisery: 2,
          joy: 3
        },
        drugsMeds: {
          alcohol: {
            amt: 0,
            name: ""
          },
          illicitDrugs: {
            amt: 0,
            name: ""
          },
          meds: {
            prescribed: "Yes",
            amt: 1,
            name: "Med1"
          }
        },
        actions: {
          selfHarm: 2,
          skills: 5
        },
        emotions: 0,
        optional: ""
      }
    ]
  }
];
export default data;
