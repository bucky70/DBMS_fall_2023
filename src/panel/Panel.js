import classes from "./panel.module.scss";
import {NavLink} from "react-router-dom";
import clsx from "clsx";

const URL_DISPLAY_MAPPING = {
    "Weather condition": '/news-influence',
    "Severity": '/risk-reward',
    "Covid Impact": '/econ-influence',
    "Seasons Impact": '/growth',
    "Population Density": '/contribution',
    "Frequent Hours": '/tuple-counts'
}

const Panel = () => (
    <div className={classes.panel}>
        {Object.entries(URL_DISPLAY_MAPPING).map(
            ([key, value]) => (
                <NavLink key={key} className={(navData) => clsx(classes.panelItem, {[classes.activePanelItem]: navData.isActive})}  to={value}>
                    {key}
                </NavLink>
            )
        )}
    </div>
)

export default Panel;