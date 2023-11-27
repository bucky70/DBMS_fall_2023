import classes from "./layout.module.scss";
import Panel from "../panel/Panel";
import {Route, Routes} from "react-router";
import WeatherCondition from "../page/WeatherCondition";
import {StaticDataContext, StaticDataProvider} from "../context/StaticDataContext";
import CovidEpidemic from "../page/CovidEpidemic";
import RoadFeatures from "../page/RoadFeatures";
import NewsInfluencePage from "../page/news/NewsInfluencePage";
import EconInfluencePage from "../page/econinfluece/EconInfluencePage";
import Contribution from "../page/contribution/Contribution";
import SeasonsImpactPage from "../page/SeasonsImpactPage";
import PopulationDensityPage from "../page/PopulationDensityPage";
import TupleCountsPage from "../page/TupleCounts/TupleCounts";
import SectorVariancePage from "../page/variance/SectorVariancePage";

const PANEL_BODY  = {
    "Queries Description": '/description',
    "Weather condition": '/weather-condition',  
    "Covid Epidemic": '/covid-epidemic',
    "Seasons Impact": '/seasons-impact',
    "Population Density": '/population-density',
    "Road features": '/road-features',
    "Frequent Hours": '/frequent-hours',
    "Total Tuple Count": '/tuple-counts'
}

const MainLayout = ({children}) => (
    <div className={classes.layout}>
        <div className={classes.panel}>
            <Panel/>
        </div>
        <div className={classes.displayPage}>
                <Routes>
                    <Route path={"/weather-condition"} element={<WeatherCondition/>} />
                    <Route path={"/covid-epidemic"} element={<CovidEpidemic />} />
                    <Route path={"/news-influence"} element={<NewsInfluencePage />} />
                    <Route path={"/econ-influence"} element={<EconInfluencePage />} />
                    <Route path={"/road-features"} element={<RoadFeatures />} />
                    <Route path={"/contribution"} element={<Contribution />} />
                    <Route path={"/seasons-impact"} element={<SeasonsImpactPage />} />
                    <Route path={"/population-density"} element={<PopulationDensityPage />} />
                    <Route path={"/risk-reward"} element={<SectorVariancePage />} />
                    <Route path={"/tuple-counts"} element={<TupleCountsPage />} />
                    {/*<Route path={"/roi"}>*/}
                    {/*    <ROIPage />*/}
                    {/*</Route>*/}
                </Routes>
        </div>
    </div>
);

export default MainLayout;
import classes from "./pagestyles.module.scss";
import WeatherForm from "../form/WeatherConditionForm";
import {useState} from "react";
import {getAllWeatherData} from "../service/WeatherService";
import Skeleton from "react-loading-skeleton";
import {rePivotGraphData} from "../service/GraphDataService";
import {Bar,BarChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import {SINGLE_GRAPH_DISPLAY_PROPERTIES, XLABEL_WC_PROPERTIES, YLABEL_WC_PROPERTIES} from "../constant/constants";

const WeatherCondition = () => {
    // State variables to manage loading, data, and display status
    const [loading, setLoading] = useState(false);
    const [initiated, setInitiated] = useState(false);
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [symbols, setSymbols] = useState([]);

    // Function to handle form submission
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

        setData(weatherDataModified);
        setData1(weatherDataModified1);
        setData2(weatherData);
        setLoading(false);
        setInitiated(true);
    }

    // Color array for graph lines
    const colors = ['blue', 'green', 'red', 'orange', 'violet']

    // Function to format tooltip and tick values
    const tooltipFormatter = (value) => `${value}`;
    const tickFormatter = (value) => `${value}`;

    return (
        <div>
            <WeatherForm onFormSubmit={handleFormSubmit}/>
            {loading && <Skeleton duration={0.1} height={500}/>}
            {!loading