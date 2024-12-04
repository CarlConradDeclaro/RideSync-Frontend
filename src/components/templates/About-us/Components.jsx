import { div } from "motion/react-client";
import Hero from "../../organism/Our-Services/Hero";
import img from "../../../assets/abotus.jpg"
import { HomeHeader } from "../../molecules/HomeHeader";
import { Footer } from "../../organism/Landing/Footer";
import Cta from "../../organism/AboutUs/Cta";

const Components = ()=> {
    return(
        <div>
            <HomeHeader/>
            <Hero text={'Our Journey Begins with You'} imgSrc={img}/>
            <div>At RideSync, we're redefining the way people travel. Our mission is simple: to make carpooling convenient, affordable, and sustainable for everyone</div>
            <div>
                <h2>RideSync Mission</h2>
                <p>We aim to reduce traffic congestion, cut carbon emissions, and help communities save money by connecting riders and drivers safely and efficientl</p>
            </div>
            <div>
                <h2>Our Story</h2>
                <p>Founded in [Year] by [Founder's Name or a team of passionate innovators], RideSync started as a solution to make daily commutes more eco-friendly and cost-effective. We’ve grown into a trusted platform connecting thousands of users across [regions or countries].</p>

            </div>
            <Cta/>
            <Footer/>
        </div>
    )
}
export default Components;