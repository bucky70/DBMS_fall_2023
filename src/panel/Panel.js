import classes from "./panel.module.scss";
import {NavLink} from "react-router-dom";
import clsx from "clsx";

const URL_DISPLAY_MAPPING = {
    "Queries Description": '/description',
    "Weather condition": '/weather-condition',  
    "Covid Epidemic": '/covid-epidemic',
    "Seasons Impact": '/seasons-impact',
    "Population Density": '/population-density',
    "Road features": '/road-features',
    "Frequent Hours": '/frequent-hours',
    "Total Tuple Count": '/tuple-counts'
}

const Panel = () => (
    <div className={classes.panel}>
        {Object.entries(URL_DISPLAY_MAPPING).map(
            ([key, value]) => (
                <NavLink key={key} className={(navData) => clsx(classes.panelItem, {[classes.activePanelItem]: navData.isActive})}  to={value} title={`How does ${key} affect accidents `}>
                    {key}
                </NavLink>
            )
        )}
    </div>
)

export default Panel;