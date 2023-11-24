import classes from "./panel.module.scss";
import {NavLink} from "react-router-dom";
import clsx from "clsx";

const URL_DISPLAY_MAPPING = {
    "Queries Description": '/tuple-counts',
    "Weather condition": '/news-influence',  
    "Covid Epidemic": '/econ-influence',
    "Seasons Impact": '/growth',
    "Population Density": '/contribution',
    "Road features": '/risk-reward',
    "Frequent Hours": '/tuple-counts'
    
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