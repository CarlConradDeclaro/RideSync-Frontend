import { useEffect } from "react"
import { HomeHeader } from "../../molecules/HomeHeader"
import { Footer } from "../../organism/Landing/Footer"
import Faq from "../../organism/Ride-sharing/Faq"
import Hero from "../../organism/Ride-sharing/Hero"
import Info from "../../organism/Ride-sharing/Info"
import KeyFeatures from "../../organism/Ride-sharing/KeyFeatures"

const Components = ()=> {
    useEffect(() => {
        window.scrollTo(0,0);
    }, [])
    

    return(
        <div>
            <div className="sticky top-0">
                <HomeHeader />
            </div>
            <Hero />
            <Info />
            <KeyFeatures />
            <Faq />
            <Footer />
        </div>
    )
}
export default Components