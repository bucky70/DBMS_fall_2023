
import classes from "./pagestyles.module.scss";
import {useState} from "react";
import Skeleton from "react-loading-skeleton";
import {rePivotGraphData} from "../service/GraphDataService";
import {CartesianGrid, Legend, Line, LineChart, Bar, BarChart, Tooltip, XAxis, YAxis} from "recharts";
import { SINGLE_GRAPH_DISPLAY_PROPERTIES, XLABEL_SEASON_PROPERTIES, YLABEL_WC_PROPERTIES, XLABEL_FH_PROPERTIES, YLABEL_FH_PROPERTIES } from "../constant/constants";
import FrequentHoursForm from "../form/FrequentHoursForm";
import { getFrequentHoursData } from "../service/FrequentHoursService";

const FrequentHours = () => {

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

        const hourlyAccidentsData = await getFrequentHoursData({years: wcYears, City: allCities, State: uniqueValues.join(', ')});
        //hourlyAccidentsData.sort((x,y)=> parseInt(x.HOUR) < parseInt(y.HOUR));

        setSymbols(submitValues.symbol.map(symbol => symbol.split(':')[0]));

        const hourlyAccidentsDataModified = rePivotGraphData(hourlyAccidentsData, 'CITY', 'NUM_INCIDENTS', (datum) => datum.HOUR);
        console.log(`Received response as [ ${hourlyAccidentsDataModified} ]`);

        setData(hourlyAccidentsDataModified);
        setLoading(false);
        setInitiated(true);

    }

    const colors = ['blue', 'green', 'red', 'orange', 'violet']

    const tooltipFormatter = (value) => `${value}`;
    const tickFormatter = (value) => `${value}`;

    return (
        <div>

            <FrequentHoursForm onFormSubmit={handleFormSubmit} />

            {loading && <Skeleton duration={0.1} height={500}/>}
            {!loading && initiated && (
                <div className={classes.graphContainer}>
                    <BarChart data={data} {...SINGLE_GRAPH_DISPLAY_PROPERTIES}>
                        <CartesianGrid strokeDasharray="3 3" stroke={"#9e9e9e"} />
                        <XAxis type="number" strokeWidth={2} fontWeight={'bold'} label={XLABEL_FH_PROPERTIES} dataKey={'xAxis'} />
                        <YAxis strokeWidth={2} fontWeight={'bold'} label={{ ...YLABEL_FH_PROPERTIES, value: 'Incident Count' }}
                            tickFormatter={tickFormatter} />
                        <Tooltip formatter={tooltipFormatter} />
                        <Legend layout={"vertical"} align={"right"} verticalAlign={"top"} />
                        {symbols.map((symbol, _idx) => <Bar key={symbol} dataKey={symbol} fill={colors[_idx]}
                            strokeWidth={2}
                            type={'monotone'} />)}
                    </BarChart>
                </div>
            )}
        </div>
    )

}

export default FrequentHours;