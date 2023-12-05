import { useNavigate } from "react-router";
import "./header.styles.css";

export const Header = ()=>{
    const navigate = useNavigate();

    const link = ()=>{
        navigate("/")
    }
    return(
        <header className="header-wrap">
             <div className="app-logo">
                <h1 onClick={link}>ElQueue Logistic System</h1>
             </div>
        </header>
    )
}