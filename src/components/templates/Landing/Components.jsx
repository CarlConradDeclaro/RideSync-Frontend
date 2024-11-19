import { HomeHeader } from "../../molecules/HomeHeader"
import {Footer} from "../../organism/Landing/Footer"
import { General } from "../../organism/Landing/General"
import { Services } from "../../organism/Landing/Services"

const Components = () => {
    return(
        <>
            <div className="sticky top-0 z-50">
                <HomeHeader />
            </div>
            <div className="px-32">
                <General />
                <Services />
            </div>
            <Footer />
            
        </>
    )
}

export default Components