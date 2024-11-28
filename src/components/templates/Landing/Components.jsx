import { HomeHeader } from "../../molecules/HomeHeader"
import { BeDriver } from "../../organism/Landing/Driver"
import {Footer} from "../../organism/Landing/Footer"
import { General } from "../../organism/Landing/General"
import { Services } from "../../organism/Landing/Services"

const Components = () => {
    return(
        <div>
            <div className="sticky top-0 z-50">
                <HomeHeader />
            </div>
            <div>
                <div className="px-6 md:px-32"> 
                    <General />
                </div>
                <div className="px-6 md:px-32  bg-colorBlue flex">
                    <Services />
                </div>
                <div className="px-6 md:px-32">
                    <BeDriver />
                </div>
            </div>
            <Footer />
            
        </div>
    )
}

export default Components