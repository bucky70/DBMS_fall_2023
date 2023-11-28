import classes from "./navbar.module.scss";
import car from "../assets/car-crash.svg";

const Navbar = ({}) => (
    <div className={classes.navbar}>
        <div className={classes.brand}>
            <img src={car} className={classes.logo}/>
            <p className={classes.logotext}>Accident Analyzer</p>
        </div>
    </div>
)

export default Navbar;