import classes from "./pagestyles.module.scss";
import CovidEpidemicForm from "../form/CovidEpidemicForm";
import {useState} from "react";
import {getAllWeatherData} from "../service/WeatherService";
import {getCovidData} from "../service/CovidService";
import Skeleton from "react-loading-skeleton";
import {rePivotGraphData} from "../service/GraphDataService";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis, BarChart, Bar} from "recharts";
import {SINGLE_GRAPH_DISPLAY_PROPERTIES, XLABEL_CI_PROPERTIES, YLABEL_CI_PROPERTIES,XLABEL_NCI_PROPERTIES,YLABEL_AS_PROPERTIES} from "../constant/constants";

const CovidEpidemic = () => {
    const [loading, setLoading] = useState(false);
    const [initiated, setInitiated] = useState(false);
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    const [data4, setData4] = useState([]);
    const [symbols, setSymbols] = useState([]);

    const handleFormSubmit = async (submitValues) => {
        const { wcYears, symbol, range, aggBy } = submitValues;
        setLoading(true);
        console.log(`Passing request with ${submitValues}`);
        const allCities = submitValues.symbol.map(symbol => symbol.split(':')[0]).join(', ');
        const allStates = submitValues.symbol.map(symbol => symbol.split(':')[1]);
        const uniqueValues = Array.from(new Set(allStates))
        const noncovidData = await getCovidData({years: "2016, 2017, 2018 ,2019", City: allCities, State: uniqueValues.join(', ')});
        const covidData = await getCovidData({years: "2020, 2021, 2022", City: allCities, State: uniqueValues.join(', ')});

        setSymbols(submitValues.symbol.map(symbol => symbol.split(':')[0]));
        //const x = ['Mostly Cloudy / Windy','Funnel Cloud','Scattered Clouds','Hail','Fog','Snow','Mist','Drizzle','Clear','Haze','Light Rain','Thunderstorms and Rain','Shallow Fog','Light Freezing Rain','Blowing Snow','Rain','Light Freezing Fog','Rain Showers','Thunderstorm','Heavy T-Storm / Windy','Heavy T-Storm','Cloudy / Windy','Heavy Snow','Squalls','Light Drizzle','Thunder in the Vicinity','Blowing Dust / Windy','Patches of Fog','Widespread Dust','Light Rain Showers','Light Rain / Windy','Heavy Thunderstorms and Rain','Light Freezing Drizzle','Overcast','Partly Cloudy','Light Snow','T-Storm','Light Thunderstorms and Rain','Volcanic Ash','Light Rain with Thunder','Thunder','N/A Precipitation','Light Fog','Smoke','Fair / Windy','Partly Cloudy / Windy','Low Drifting Snow','Mostly Cloudy','Cloudy','Fair','Heavy Rain','Heavy Drizzle','Showers in the Vicinity','Blowing Sand','Sand','Light Ice Pellets'];
       // const weatherDataModified = rePivotGraphData(weatherData, 'CITY', 'NUMBER_OF_ACCIDENTS', (datum) => datum.WEATHER_CONDITION);
        const covidDataModified = rePivotGraphData(covidData, 'CITY', 'NUMBER_OF_ACCIDENTS', (datum) => datum.YEAR);  
        const noncovidDataModified = rePivotGraphData(noncovidData, 'CITY', 'NUMBER_OF_ACCIDENTS', (datum) => datum.YEAR); 
        
        const covidDataModified1 = rePivotGraphData(covidData, 'CITY', 'AVERAGE_SEVERITY', (datum) => datum.YEAR); 
        console.log(`Received response as [ ${covidDataModified} ]`);

        setData(covidDataModified);
        setData2(noncovidDataModified);
        setData3(covidDataModified1);
        setData4(covidData);
        setLoading(false);
        setInitiated(true);
    }

    const colors = ['blue', 'green', 'red', 'orange', 'violet']

    const tooltipFormatter = (value) => `${value}`;
    const tickFormatter = (value) => `${value}`;
    console.log(data);

    return (
        <div>
            <CovidEpidemicForm onFormSubmit={handleFormSubmit}/>
            {loading && <Skeleton duration={0.1} height={500}/>}
            {!loading && initiated && (
                <div className={classes.graphContainer}>
                    <h1>Covid data graph</h1>
                    <LineChart data={data} {...SINGLE_GRAPH_DISPLAY_PROPERTIES}>
                        <CartesianGrid strokeDasharray="3 3" stroke={"#9e9e9e"}/>
                        <XAxis strokeWidth={2} fontWeight={'bold'} label={XLABEL_CI_PROPERTIES} dataKey={'xAxis'}/>
                        <YAxis strokeWidth={2} fontWeight={'bold'} label={{...YLABEL_CI_PROPERTIES, value: 'Incident Count'}}
                               tickFormatter={tickFormatter}/>
                        <Tooltip formatter={tooltipFormatter}/>
                        <Legend layout={"vertical"} align={"right"} verticalAlign={"top"}/>
                        {symbols.map((symbol, _idx) => <Line key={symbol} dataKey={symbol} stroke={colors[_idx]}
                                                             strokeWidth={2}
                                                             type={'monotone'}/>)}
                    </LineChart>
                    <h1>Non-Covid data graph</h1>
                    <LineChart data={data2} {...SINGLE_GRAPH_DISPLAY_PROPERTIES}>
                        <CartesianGrid strokeDasharray="3 3" stroke={"#9e9e9e"}/>
                        <XAxis strokeWidth={2} fontWeight={'bold'} label={XLABEL_NCI_PROPERTIES} dataKey={'xAxis'}/>
                        <YAxis strokeWidth={2} fontWeight={'bold'} label={{...YLABEL_CI_PROPERTIES, value: 'Incident Count'}}
                               tickFormatter={tickFormatter}/>
                        <Tooltip formatter={tooltipFormatter}/>
                        <Legend layout={"vertical"} align={"right"} verticalAlign={"top"}/>
                        {symbols.map((symbol, _idx) => <Line key={symbol} dataKey={symbol} stroke={colors[_idx]}
                                                             strokeWidth={2}
                                                             type={'monotone'}/>)}
                    </LineChart>

                    <h1>Weather Condition vs Average Severity </h1>
                    <BarChart data={data3} {...SINGLE_GRAPH_DISPLAY_PROPERTIES}>
                        <CartesianGrid strokeDasharray="3 3" stroke={"#9e9e9e"}/>
                        <XAxis strokeWidth={2} fontWeight={'bold'} label={XLABEL_CI_PROPERTIES} dataKey={'xAxis'}/>
                        <YAxis strokeWidth={2} fontWeight={'bold'} label={{...YLABEL_AS_PROPERTIES, value: 'Average Severity'}}
                               tickFormatter={tickFormatter}/>
                        <Tooltip formatter={tooltipFormatter}/>
                        <Legend layout={"vertical"} align={"right"} verticalAlign={"top"}/>
                        {symbols.map((symbol, _idx) => <Bar key={symbol} dataKey={symbol} fill={colors[_idx]}
                                                             strokeWidth={2}
                                                             type={'monotone'}/>)}
                    </BarChart>

                    <h2>Data Table</h2>
                    <div className={classes.tableContainer}>
                        <table>
                            <thead>
                            <tr>
                                <th>Year</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Percentage Difference of Average No. of Accidents</th>
                                <th>Percentage Difference of Average Severity</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data4.map((item, index) => (
                                <tr key={index}>
                                <td>{item.YEAR}</td>
                                <td>{item.CITY}</td>
                                <td>{item.STATE}</td>
                                <td>{item.PERCENTAGE_DIFF_AVGACCIDENTS}</td>
                                <td>{item.PERCENTAGE_DIFF_AVGSEVERITY}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CovidEpidemic;