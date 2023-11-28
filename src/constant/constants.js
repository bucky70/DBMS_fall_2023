export const SELECT_LABEL_COLOR_MAP = {
    stocks: 'pink',
    sectors: 'orange',
    cryptos: 'lightblue',
    commodities: 'orange',
    bonds: 'bonds'
}
export const VALID_TOP_N = [3, 5, 10];

export const SINGLE_GRAPH_DISPLAY_PROPERTIES = {
    margin: {top: 20, right: 20, left: 80, bottom: 20},
    width: 1200,
    height: 550
}

export const XLABEL_PROPERTIES = {value: "Time", angle: 0, position: "outsideCenter", dy: 20}
export const YLABEL_PROPERTIES = {value: "Cumulative M. Cap", angle: -90, position: "outsideCenter", dx: -42}

export const XLABEL_WC_PROPERTIES = {value: "Weather Condition", angle: 0, position: "outsideCenter", dy: 20}
export const YLABEL_WC_PROPERTIES = {value: "Incident Count", angle: -90, position: "outsideCenter", dx: -42}
export const XLABEL_SEASON_PROPERTIES = {value: "Seasons", angle: 0, position: "outsideCenter", dy: 20}

export const XLABEL_RF_PROPERTIES = {value: "Road Features", angle: 0, position: "outsideCenter", dy: 20}
export const YLABEL_RF_PROPERTIES = {value: "Incident Count", angle: -90, position: "outsideCenter", dx: -42}

export const XLABEL_CI_PROPERTIES = {value: "Covid Impact", angle: 0, position: "outsideCenter", dy: 20}
export const YLABEL_CI_PROPERTIES = {value: "Incident Count", angle: -90, position: "outsideCenter", dx: -42}

export const XLABEL_NCI_PROPERTIES = {value: "Non Covid Impact", angle: 0, position: "outsideCenter", dy: 20}
export const YLABEL_NCI_PROPERTIES = {value: "Incident Count", angle: -90, position: "outsideCenter", dx: -42}
export const YLABEL_AS_PROPERTIES = {value: "Average Severity", angle: -90, position: "outsideCenter", dx: -42}

export const XLABEL_FH_PROPERTIES = {value: "Time (Hours)", angle: 0, position: "outsideCenter", dy: 20}
export const YLABEL_FH_PROPERTIES = {value: "Incident Count", angle: -90, position: "outsideCenter", dx: -42}

export const COLORS = ['red', 'green', 'blue', 'orange', 'brown', 'pink', 'yellow', 'purple', 'cyan', 'black']

export const STATE=["IL","NC","NV","UT","KS","MS","MT","GA","CO","AZ","LA","NM","ME","SD","CA","NE","IN","NY","RI","NJ","VA","OR","MN","OK","TN","AR","WV","FL","WA","SC","WI","MI","NH","ID","ND","OH","DC","DE","VT","IA","CT","PA","TX","AL","WY","MO","MA","MD","KY"]

export const CITY_STATE = [
    {
      "CITY": "Houston",
      "STATE": "TX"
    },
    {
      "CITY": "Dallas",
      "STATE": "TX"
    },
    {
      "CITY": "Los Angeles",
      "STATE": "CA"
    },
    {
      "CITY": "Austin",
      "STATE": "TX"
    },
    {
      "CITY": "Charlotte",
      "STATE": "NC"
    },
    {
      "CITY": "Atlanta",
      "STATE": "GA"
    },
    {
      "CITY": "Miami",
      "STATE": "FL"
    },
    {
      "CITY": "Orlando",
      "STATE": "FL"
    },
    {
      "CITY": "Sacramento",
      "STATE": "CA"
    },
    {
      "CITY": "Nashville",
      "STATE": "TN"
    },
    {
      "CITY": "Raleigh",
      "STATE": "NC"
    },
    {
      "CITY": "Chicago",
      "STATE": "IL"
    },
    {
      "CITY": "Seattle",
      "STATE": "WA"
    },
    {
      "CITY": "San Antonio",
      "STATE": "TX"
    },
    {
      "CITY": "San Diego",
      "STATE": "CA"
    },
    {
      "CITY": "Baton Rouge",
      "STATE": "LA"
    },
    {
      "CITY": "Dayton",
      "STATE": "OH"
    },
    {
      "CITY": "San Jose",
      "STATE": "CA"
    },
    {
      "CITY": "Omaha",
      "STATE": "NE"
    },
    {
      "CITY": "Oklahoma City",
      "STATE": "OK"
    },
    {
      "CITY": "Greenville",
      "STATE": "SC"
    },
    {
      "CITY": "Grand Rapids",
      "STATE": "MI"
    },
    {
      "CITY": "Tampa",
      "STATE": "FL"
    },
    {
      "CITY": "Columbus",
      "STATE": "OH"
    },
    {
      "CITY": "Flint",
      "STATE": "MI"
    },
    {
      "CITY": "Detroit",
      "STATE": "MI"
    },
    {
      "CITY": "Phoenix",
      "STATE": "AZ"
    },
    {
      "CITY": "Jacksonville",
      "STATE": "FL"
    },
    {
      "CITY": "Fort Lauderdale",
      "STATE": "FL"
    },
    {
      "CITY": "Oakland",
      "STATE": "CA"
    },
    {
      "CITY": "Augusta",
      "STATE": "GA"
    },
    {
      "CITY": "Bronx",
      "STATE": "NY"
    },
    {
      "CITY": "Fort Worth",
      "STATE": "TX"
    },
    {
      "CITY": "Long Beach",
      "STATE": "CA"
    },
    {
      "CITY": "Columbia",
      "STATE": "SC"
    },
    {
      "CITY": "Riverside",
      "STATE": "CA"
    },
    {
      "CITY": "Saint Louis",
      "STATE": "MO"
    },
    {
      "CITY": "Tucson",
      "STATE": "AZ"
    },
    {
      "CITY": "Richmond",
      "STATE": "VA"
    },
    {
      "CITY": "Denver",
      "STATE": "CO"
    },
    {
      "CITY": "San Francisco",
      "STATE": "CA"
    },
    {
      "CITY": "Philadelphia",
      "STATE": "PA"
    },
    {
      "CITY": "Lancaster",
      "STATE": "PA"
    },
    {
      "CITY": "Fort Myers",
      "STATE": "FL"
    },
    {
      "CITY": "Indianapolis",
      "STATE": "IN"
    },
    {
      "CITY": "Tulsa",
      "STATE": "OK"
    },
    {
      "CITY": "Brooklyn",
      "STATE": "NY"
    },
    {
      "CITY": "Anaheim",
      "STATE": "CA"
    },
    {
      "CITY": "Birmingham",
      "STATE": "AL"
    },
    {
      "CITY": "Corona",
      "STATE": "CA"
    },
    {
      "CITY": "San Bernardino",
      "STATE": "CA"
    },
    {
      "CITY": "Spartanburg",
      "STATE": "SC"
    },
    {
      "CITY": "New York",
      "STATE": "NY"
    },
    {
      "CITY": "Montgomery",
      "STATE": "AL"
    },
    {
      "CITY": "Ontario",
      "STATE": "CA"
    },
    {
      "CITY": "York",
      "STATE": "PA"
    },
    {
      "CITY": "Minneapolis",
      "STATE": "MN"
    },
    {
      "CITY": "Memphis",
      "STATE": "TN"
    },
    {
      "CITY": "Whittier",
      "STATE": "CA"
    },
    {
      "CITY": "Sarasota",
      "STATE": "FL"
    },
    {
        "CITY": "Gainesville",
        "STATE": "FL"
    }
  ]
