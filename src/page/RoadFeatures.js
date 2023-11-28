import classes from "./pagestyles.module.scss";
import RoadFeaturesForm from "../form/RoadFeaturesForm";
import {useState} from "react";
import {getRoadFeaturesData} from "../service/RoadFeaturesService";
import Skeleton from "react-loading-skeleton";
import {rePivotGraphData} from "../service/GraphDataService";
import {CartesianGrid,BarChart, Bar, Legend, Tooltip, XAxis, YAxis, Rectangle} from "recharts";

import {SINGLE_GRAPH_DISPLAY_PROPERTIES,XLABEL_WC_PROPERTIES, XLABEL_RF_PROPERTIES, YLABEL_RF_PROPERTIES,YLABEL_AS_PROPERTIES} from "../constant/constants";

const RoadCondition = () => {
    const [loading, setLoading] = useState(false);
    const [initiated, setInitiated] = useState(false);
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [symbols, setSymbols] = useState([]);

    const handleFormSubmit = async (submitValues) => {
        const { wcYears, symbol, range, aggBy } = submitValues;
        setLoading(true);
        console.log(`Passing request with ${submitValues}`);
       // const allCities = submitValues.symbol.map(symbol => symbol.split(':')[0]).join(', ');
        const allStates = submitValues.symbol.map(symbol => symbol.split(':'));
        const uniqueValues = Array.from(new Set(allStates))
        const weatherData = await getRoadFeaturesData({years: wcYears, State: uniqueValues.join(', ')});
        console.log(`got here`);

        setSymbols(submitValues.symbol.map(symbol => symbol));
        //const x = ['Mostly Cloudy / Windy','Funnel Cloud','Scattered Clouds','Hail','Fog','Snow','Mist','Drizzle','Clear','Haze','Light Rain','Thunderstorms and Rain','Shallow Fog','Light Freezing Rain','Blowing Snow','Rain','Light Freezing Fog','Rain Showers','Thunderstorm','Heavy T-Storm / Windy','Heavy T-Storm','Cloudy / Windy','Heavy Snow','Squalls','Light Drizzle','Thunder in the Vicinity','Blowing Dust / Windy','Patches of Fog','Widespread Dust','Light Rain Showers','Light Rain / Windy','Heavy Thunderstorms and Rain','Light Freezing Drizzle','Overcast','Partly Cloudy','Light Snow','T-Storm','Light Thunderstorms and Rain','Volcanic Ash','Light Rain with Thunder','Thunder','N/A Precipitation','Light Fog','Smoke','Fair / Windy','Partly Cloudy / Windy','Low Drifting Snow','Mostly Cloudy','Cloudy','Fair','Heavy Rain','Heavy Drizzle','Showers in the Vicinity','Blowing Sand','Sand','Light Ice Pellets'];
        const weatherDataModified = rePivotGraphData(weatherData, 'STATE', 'COUNT', (datum) => datum.ROAD_TYPE);
        const weatherDataModified1 = rePivotGraphData(weatherData, 'STATE', 'AVG_SEVERITY', (datum) => datum.ROAD_TYPE);
        console.log(`Received response as [ ${weatherDataModified} ]`);

        setData(weatherDataModified);
        setData1(weatherDataModified1);
        setLoading(false);
        setInitiated(true);
    }

    const colors = ['blue', 'green', 'red', 'orange', 'violet']

    const tooltipFormatter = (value) => `${value}`;
    const tickFormatter = (value) => `${value}`;

    return (
        <div>
            <RoadFeaturesForm onFormSubmit={handleFormSubmit}/>
            {loading && <Skeleton duration={0.1} height={500}/>}
            {!loading && initiated && (
                <div className={classes.graphContainer}>
                    <h1>Road Features vs Incident Count </h1>
                    <BarChart data={data} {...SINGLE_GRAPH_DISPLAY_PROPERTIES}>
                        <CartesianGrid strokeDasharray="3 3" stroke={"#9e9e9e"}/>
                        <XAxis strokeWidth={2} fontWeight={'bold'} label={XLABEL_RF_PROPERTIES} dataKey={'xAxis'}/>
                        <YAxis strokeWidth={2} fontWeight={'bold'} label={{...YLABEL_RF_PROPERTIES, value: 'Incident Count'}}
                               tickFormatter={tickFormatter}/>
                        <Tooltip formatter={tooltipFormatter}/>
                        <Legend layout={"vertical"} align={"right"} verticalAlign={"top"}/>
                        {symbols.map((symbol, _idx) => <Bar key={symbol} dataKey={symbol} fill={colors[_idx]}
                                                             strokeWidth={2}
                                                             type={'monotone'}/>)}
                    </BarChart>
                    <h1>Road Features vs Average Severity </h1>
                    <BarChart data={data1} {...SINGLE_GRAPH_DISPLAY_PROPERTIES}>
                        <CartesianGrid strokeDasharray="3 3" stroke={"#9e9e9e"}/>
                        <XAxis strokeWidth={2} fontWeight={'bold'} label={XLABEL_RF_PROPERTIES} dataKey={'xAxis'}/>
                        <YAxis strokeWidth={2} fontWeight={'bold'} label={{...YLABEL_AS_PROPERTIES, value: 'Average Severity'}}
                               tickFormatter={tickFormatter}/>
                        <Tooltip formatter={tooltipFormatter}/>
                        <Legend layout={"vertical"} align={"right"} verticalAlign={"top"}/>
                        {symbols.map((symbol, _idx) => <Bar key={symbol} dataKey={symbol} fill={colors[_idx]}
                                                             strokeWidth={2}
                                                             type={'monotone'}/>)}
                    </BarChart>

                </div>
            )}
        </div>
    )
}

export default RoadCondition;