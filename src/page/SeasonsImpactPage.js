import classes from "./pagestyles.module.scss";
import {useState} from "react";
import Skeleton from "react-loading-skeleton";
import {rePivotGraphData} from "../service/GraphDataService";
import {Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import _ from "lodash";
import {getSeasonsData} from "../service/SeaonsImpactService";
import SeasonsImpactForm from "../form/SeasonsImpactForm";
import {COLORS, SINGLE_GRAPH_DISPLAY_PROPERTIES, XLABEL_SEASON_PROPERTIES, YLABEL_WC_PROPERTIES} from "../constant/constants";

const SeasonsImpactPage = () => {
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
        const seasonsData = await getSeasonsData({years: wcYears, City: allCities, State: uniqueValues.join(', ')});

        setSymbols(submitValues.symbol.map(symbol => symbol.split(':')[0]));
        const seasonsDataModified = rePivotGraphData(seasonsData, 'CITY', 'NUMBER_OF_INCIDENTS', (datum) => datum.SEASON);
        const seasonsDataModified1 = rePivotGraphData(seasonsData, 'CITY', 'AVERAGE_SEVERITY', (datum) => datum.SEASON);
        console.log(`Received response as [ ${seasonsDataModified} ]`);
        console.log(`Received response as [ ${seasonsDataModified1} ]`);
        setData(seasonsDataModified);
        setData1(seasonsDataModified1);
        setData2(seasonsData);
        setLoading(false);
        setInitiated(true);
    }

    const colors = COLORS;

    const tooltipFormatter = (value) => `${value}`;
    const tickFormatter = (value) => `${value}`;


    return (
        <div>
             <SeasonsImpactForm onFormSubmit={handleFormSubmit}/>
            {loading && <Skeleton duration={0.1} height={500}/>}
            {!loading && initiated && (
                <div className={classes.graphContainer}>
                    <h1>Seasons vs Incident Count</h1>
                    <LineChart data={data} {...SINGLE_GRAPH_DISPLAY_PROPERTIES}>
                        <CartesianGrid strokeDasharray="3 3" stroke={"#9e9e9e"}/>
                        <XAxis strokeWidth={2} fontWeight={'bold'} label={XLABEL_SEASON_PROPERTIES} dataKey={'xAxis'}/>
                        <YAxis strokeWidth={2} fontWeight={'bold'} label={{...YLABEL_WC_PROPERTIES, value: 'Incident Count'}}
                               tickFormatter={tickFormatter}/>
                        <Tooltip formatter={tooltipFormatter}/>
                        <Legend layout={"vertical"} align={"right"} verticalAlign={"top"}/>
                        {symbols.map((symbol, _idx) => <Line key={symbol} dataKey={symbol} stroke={colors[_idx]}
                                                             strokeWidth={2}
                                                             type={'monotone'}/>)}
                    </LineChart>
                    <h1>Seasons vs Average Severity </h1>
                    <BarChart data={data1} {...SINGLE_GRAPH_DISPLAY_PROPERTIES}>
                        <CartesianGrid strokeDasharray="3 3" stroke={"#9e9e9e"}/>
                        <XAxis strokeWidth={2} fontWeight={'bold'} label={XLABEL_SEASON_PROPERTIES} dataKey={'xAxis'}/>
                        <YAxis strokeWidth={2} fontWeight={'bold'} label={{...YLABEL_WC_PROPERTIES, value: 'Average Severity'}}
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
                                <th>Seasons</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Percentage Difference of Average No. of Accidents</th>
                                <th>Percentage Difference of Average Severity</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data2.map((item, index) => (
                                <tr key={index}>
                                <td>{item.SEASON}</td>
                                <td>{item.CITY}</td>
                                <td>{item.STATE}</td>
                                <td>{item.PERCENTAGE_DIFF_AVG_NOOFINCIDENTS}</td>
                                <td>{item.PERCENTAGE_DIFF_AVG_SEVERITY}</td>
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

export default SeasonsImpactPage;