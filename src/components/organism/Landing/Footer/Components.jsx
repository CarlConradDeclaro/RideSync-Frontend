import {Browse} from "../../../molecules/Landing/Footer/Browse"
import {GenInfo} from "../../../molecules/Landing/Footer/GenInfo"
import {Contact} from "../../../molecules/Landing/Footer/Contact"
import {Copyright} from "../../../molecules/Landing/Footer/Copyright"
import { ServicesFooter } from "../../../molecules/Landing/Footer/Services"

const Components = ()=>{
    return(
        <footer className="px-32">
            <div className="grid grid-cols-4">
                <GenInfo />
                <Browse />
                <ServicesFooter />
                <Contact />
            </div>
            <Copyright />
        </footer>
    )
}
export default Components