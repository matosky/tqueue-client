import "./button.styles.css";
import { Link } from "react-router-dom";
export const Button = ()=>{
    return(
        <Link to="/queueing" className="cta-button">Get Started</Link>
    )
}