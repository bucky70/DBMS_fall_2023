import classes from "./pagestyles.module.scss";
import WeatherForm from "../form/WeatherConditionForm";
import {useState} from "react";
import {getAllWeatherData} from "../service/WeatherService";
import Skeleton from "react-loading-skeleton";
import {rePivotGraphData} from "../service/GraphDataService";
import {Bar,BarChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import {SINGLE_GRAPH_DISPLAY_PROPERTIES, XLABEL_WC_PROPERTIES, YLABEL_WC_PROPERTIES,YLABEL_AS_PROPERTIES} from "../constant/constants";

const WeatherCondition = () => {
    const [loading, setLoading] = useState(false);
    const [initiated, setInitiated] = useState(false);
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [symbols, setSymbols] = useState([]);

    const handleFormSubmit = async (submitValues) => {
        const { wcYears, symbol, range, aggBy } = submitValues;
        setLoading(true);
        console.log(`Passing request with ${submitValues}`);
        const allCities = submitValues.symbol.map(symbol => symbol.split(':')[0]).join(', ');
        const allStates = submitValues.symbol.map(symbol => symbol.split(':')[1]);
        const uniqueValues = Array.from(new Set(allStates))
        const weatherData = await getAllWeatherData({years: wcYears, City: allCities, State: uniqueValues.join(', ')});

        setSymbols(submitValues.symbol.map(symbol => symbol.split(':')[0]));
        const weatherDataModified = rePivotGraphData(weatherData, 'CITY', 'NUMBER_OF_ACCIDENTS', (datum) => datum.WEATHER_CONDITION);
        const weatherDataModified1 = rePivotGraphData(weatherData, 'CITY', 'AVERAGE_SEVERITY', (datum) => datum.WEATHER_CONDITION);
        console.log(`Received response as [ ${weatherDataModified} ]`);
        console.log(`Received response as [ ${weatherDataModified} ]`);
        setData(weatherDataModified);
        setData1(weatherDataModified1);
        setData2(weatherData);
        setLoading(false);
        setInitiated(true);
    }

    const colors = ['blue', 'green', 'red', 'orange', 'violet']

    const tooltipFormatter = (value) => `${value}`;
    const tickFormatter = (value) => `${value}`;

    return (
        <div>
            <WeatherForm onFormSubmit={handleFormSubmit}/>
            {loading && <Skeleton duration={0.1} height={500}/>}
            {!loading && initiated && (
                <div className={classes.graphContainer}>
                    <h1>Weather Condition vs Incident Count</h1>
                    <LineChart data={data} {...SINGLE_GRAPH_DISPLAY_PROPERTIES}>
                        <CartesianGrid strokeDasharray="3 3" stroke={"#9e9e9e"}/>
                        <XAxis strokeWidth={2} fontWeight={'bold'} label={XLABEL_WC_PROPERTIES} dataKey={'xAxis'}/>
                        <YAxis strokeWidth={2} fontWeight={'bold'} label={{...YLABEL_WC_PROPERTIES, value: 'Incident Count'}}
                               tickFormatter={tickFormatter}/>
                        <Tooltip formatter={tooltipFormatter}/>
                        <Legend layout={"vertical"} align={"right"} verticalAlign={"top"}/>
                        {symbols.map((symbol, _idx) => <Line key={symbol} dataKey={symbol} stroke={colors[_idx]}
                                                             strokeWidth={2}
                                                             type={'monotone'}/>)}
                    </LineChart>
                    <h1>Weather Condition vs Average Severity </h1>
                    <BarChart data={data1} {...SINGLE_GRAPH_DISPLAY_PROPERTIES}>
                        <CartesianGrid strokeDasharray="3 3" stroke={"#9e9e9e"}/>
                        <XAxis strokeWidth={2} fontWeight={'bold'} label={XLABEL_WC_PROPERTIES} dataKey={'xAxis'}/>
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
                                <th>Weather Condition</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Percentage Difference of Average No. of Accidents</th>
                                <th>Percentage Difference of Average Severity</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data2.map((item, index) => (
                                <tr key={index}>
                                <td>{item.WEATHER_CONDITION}</td>
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

export default WeatherCondition; 