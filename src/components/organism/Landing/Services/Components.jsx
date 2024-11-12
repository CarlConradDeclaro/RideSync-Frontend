import { Rideshare } from "../../../molecules/Landing/RideSharing"
import { Carpool } from "../../../molecules/Landing/Carpool"
const Components = ()=> {
    return(
        <section>
            <h2 className='text-4xl font-bold text-neutral-500'>Our Services</h2>
            <div className='flex justify-center items-center gap-32'>
                <Rideshare/>
                <Carpool />
            </div>
        </section>
    )
}

export default Components