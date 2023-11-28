import classes from "./pagestyles.module.scss";
import {useState} from "react";
import Skeleton from "react-loading-skeleton";
import {rePivotGraphData} from "../service/GraphDataService";
//import {Area, CartesianGrid, ComposedChart, Legend, Line, Tooltip, XAxis, YAxis} from "recharts";
import { BarChart, Bar,ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,Cell,Line } from 'recharts';
import _ from "lodash";
import PopulationDensityForm from "../form/PopulationDensityForm";
import {getAllPopulationDensityData} from "../service/PopulationDensityService";
import {XLabel, YLabel} from "../component/graph/Labels";
import {COLORS, SINGLE_GRAPH_DISPLAY_PROPERTIES, XLABEL_WC_PROPERTIES, YLABEL_WC_PROPERTIES} from "../constant/constants";

const PopulationDensityPage = () => {
    const [loading, setLoading] = useState(false);
    const [initiated, setInitiated] = useState(false);
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [symbols, setSymbols] = useState([]);

    const handleFormSubmit = async (submitValues) => {
        const { wcYears, symbol, range, aggBy } = submitValues;
        setLoading(true);
        console.log(`Passing request with ${submitValues}`);
        //const allCities = submitValues.symbol.map(symbol => symbol.split(':')[0]).join(', ');
        const allCitiesStates = submitValues.symbol.join(', ');
        const pdData = await getAllPopulationDensityData({years: wcYears, City: allCitiesStates});
        pdData.sort((x,y)=> x.POPULATION_DENSITY< y.POPULATION_DENSITY)

        setSymbols(submitValues.symbol.map(symbol => symbol.split(':')[0]));;
        const seasonsDataModified = rePivotGraphData(pdData, 'CITY', 'AVERAGE_SEVERITY', (datum) => datum.POPULATION_DENSITY);
        //console.log(`Received response as [ ${seasonsDataModified} ]`);

        setData(pdData);
        setData1(seasonsDataModified);
        setLoading(false);
        setInitiated(true);
    }

    const colors = COLORS;
    const colorIndex = 0;

    const tooltipFormatter = (value) => `${value}`;
    const tickFormatter = (value) => `${value}`;

    return (
        <div>
            <PopulationDensityForm onFormSubmit={handleFormSubmit}/> 
            {loading && <Skeleton duration={0.1} height={500}/>} 
            {!loading && initiated && ( 
            <div className={classes.graphContainer}> 
            <h1>Population Density vs Incident Count </h1>
            <ScatterChart data={data} {...SINGLE_GRAPH_DISPLAY_PROPERTIES}> 
            <CartesianGrid strokeDasharray="3 3"/> 
            <XAxis type="number" dataKey="POPULATION_DENSITY" name="Population Density" label={{value: "Population Density", angle: 0, position: "outsideCenter", dy: 20}}/>
            <YAxis type="number" dataKey="FREQUENCY_OF_INCIDENTS" yAxisId="left" label={{ value: 'Frequency of Incidents', angle: -90, position: 'insideLeft' }} name="Incident Count"/>
            {/* <YAxis type="number" dataKey="AVERAGE_SEVERITY" yAxisId="right" orientation="right" label={{ value: 'Average Severity', angle: 90, position: 'insideRight' }} name="Average Severity"/> */}
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend layout={"vertical"} align={"right"} verticalAlign={"top"}/>

            {symbols.map((symbol, _idx) => <Scatter name={symbol} data={data} fill={colors[_idx % colors.length]} yAxisId="left" shape="circle"> 
                                            {data.map((entry, index) => ( <Cell key={`cell-${index}`} fill={colors[index % colors.length]} /> ))} </Scatter>)} 
            {/* {symbols.map((symbol, _idx) => <Scatter name={symbol} data={data} fill={colors[_idx % colors.length]} yAxisId="right" shape="star"> 
                                            {data.map((entry, index) => ( <Cell key={`cell-${index}`} fill={colors[index % colors.length]} /> ))} </Scatter>)}  */}
            </ScatterChart>

            <h1>Population Density vs Average Severity </h1>
                    <BarChart data={data1} {...SINGLE_GRAPH_DISPLAY_PROPERTIES}>
                        <CartesianGrid strokeDasharray="3 3" stroke={"#9e9e9e"}/>
                        <XAxis strokeWidth={2} fontWeight={'bold'} label={{value: "Population Density", angle: 0, position: "outsideCenter", dy: 20}} dataKey={'xAxis'}/>
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
                                <th>City</th>
                                <th>State</th>
                                <th>Population Density</th>
                                <th>Percentage Difference of Average No. of Accidents</th>
                                <th>Percentage Difference of Average Severity</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                <td>{item.CITY}</td>
                                <td>{item.STATE}</td>
                                <td>{item.POPULATION_DENSITY}</td>
                                <td>{item.PERCENTAGE_DIFF_AVGFREQINCIDENTS}</td>
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

export default PopulationDensityPage;