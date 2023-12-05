import "./hero.styles.css";
import { Header } from "../header/header";
import { Button } from "../../common/button/button";
export const Hero = ()=>{
    return(
        <div className="hero-wrap">
            <Header />
            <section className="hero-info">
                <div className="hero-text">Elastic Transport Queueing System</div>
                <Button />
            </section>
        </div>
    )
}