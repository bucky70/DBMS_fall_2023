import classes from "./navbar.module.scss";
import car from "../assets/car-crash.svg";

const Navbar = ({}) => (
    <div className={classes.navbar}>
        <div className={classes.brand}>
            <img src={car} className={classes.logo}/>
            <p className={classes.logotext}>CarCrash</p>
        </div>
        {/*<div className={classes.rightContainer}>*/}
        {/*    <div className={classes.rightItem}>*/}
        {/*        <img src={''}  className={classes.icon} />*/}
        {/*        <p className={classes.iconText}></p>*/}
        {/*    </div>*/}
        {/*    <div className={classes.rightItem}>*/}
        {/*        <img src={''}  className={classes.icon} />*/}
        {/*        <p className={classes.iconText}></p>*/}
        {/*    </div>*/}
        {/*</div>*/}
    </div>
)

export default Navbar;