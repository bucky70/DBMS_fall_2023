import classes from "./pagestyles.module.scss";
import WeatherForm from "../form/WeatherConditionForm";
import {useState} from "react";
import {getAllWeatherData} from "../service/WeatherService";
import Skeleton from "react-loading-skeleton";
import {rePivotGraphData} from "../service/GraphDataService";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import {SINGLE_GRAPH_DISPLAY_PROPERTIES, XLABEL_WC_PROPERTIES, YLABEL_WC_PROPERTIES} from "../constant/constants";

const WeatherCondition = () => {
    const [loading, setLoading] = useState(false);
    const [initiated, setInitiated] = useState(false);
    const [data, setData] = useState([]);
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
        //const x = ['Mostly Cloudy / Windy','Funnel Cloud','Scattered Clouds','Hail','Fog','Snow','Mist','Drizzle','Clear','Haze','Light Rain','Thunderstorms and Rain','Shallow Fog','Light Freezing Rain','Blowing Snow','Rain','Light Freezing Fog','Rain Showers','Thunderstorm','Heavy T-Storm / Windy','Heavy T-Storm','Cloudy / Windy','Heavy Snow','Squalls','Light Drizzle','Thunder in the Vicinity','Blowing Dust / Windy','Patches of Fog','Widespread Dust','Light Rain Showers','Light Rain / Windy','Heavy Thunderstorms and Rain','Light Freezing Drizzle','Overcast','Partly Cloudy','Light Snow','T-Storm','Light Thunderstorms and Rain','Volcanic Ash','Light Rain with Thunder','Thunder','N/A Precipitation','Light Fog','Smoke','Fair / Windy','Partly Cloudy / Windy','Low Drifting Snow','Mostly Cloudy','Cloudy','Fair','Heavy Rain','Heavy Drizzle','Showers in the Vicinity','Blowing Sand','Sand','Light Ice Pellets'];
        const weatherDataModified = rePivotGraphData(weatherData, 'CITY', 'NUMBER_OF_ACCIDENTS', (datum) => datum.WEATHER_CONDITION);
        console.log(`Received response as [ ${weatherDataModified} ]`);

        setData(weatherDataModified);
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
                </div>
            )}
        </div>
    )
}

export default WeatherCondition;