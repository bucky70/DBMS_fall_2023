import classes from "./layout.module.scss";
import Panel from "../panel/Panel";
import {Route, Routes} from "react-router";
import WeatherCondition from "../page/WeatherCondition";
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