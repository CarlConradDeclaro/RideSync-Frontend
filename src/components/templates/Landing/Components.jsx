import { HomeHeader } from "../../molecules/HomeHeader"
import { General } from "../../organism/Landing/General"
import { Services } from "../../organism/Landing/Services"

const Components = () => {
    return(
        <>
            <HomeHeader />
            <div className="px-32">
                <General />
                <Services />
            </div>
            
        </>
    )
}

export default Components