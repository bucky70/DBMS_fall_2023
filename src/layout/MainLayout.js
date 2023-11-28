import classes from "./layout.module.scss";
import Panel from "../panel/Panel";
import {Route, Routes} from "react-router";
import WeatherCondition from "../page/WeatherCondition";
import CovidEpidemic from "../page/CovidEpidemic";
import RoadFeatures from "../page/RoadFeatures";
import SeasonsImpactPage from "../page/SeasonsImpactPage";
import PopulationDensityPage from "../page/PopulationDensityPage";
import TupleCountsPage from "../page/TupleCounts/TupleCounts";
import QueryDescPage from "../page/QueriesDescription/QueryDescPage";
import FrequentHours from "../page/FrequentHours";

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
                    <Route path={"/"} element={<QueryDescPage/>} />
                    <Route path={"/description"} element={<QueryDescPage/>} />
                    <Route path={"/weather-condition"} element={<WeatherCondition/>} />
                    <Route path={"/covid-epidemic"} element={<CovidEpidemic />} />
                    <Route path={"/road-features"} element={<RoadFeatures />} />
                    <Route path={"/seasons-impact"} element={<SeasonsImpactPage />} />
                    <Route path={"/population-density"} element={<PopulationDensityPage />} />
                    <Route path={"/frequent-hours"} element={<FrequentHours />} />
                    <Route path={"/tuple-counts"} element={<TupleCountsPage />} />
                    {/*<Route path={"/roi"}>*/}
                    {/*    <ROIPage />*/}
                    {/*</Route>*/}
                </Routes>
        </div>
    </div>
);

export default MainLayout;