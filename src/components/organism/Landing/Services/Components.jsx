import { Rideshare } from "../../../molecules/Landing/RideSharing";
import { Carpool } from "../../../molecules/Landing/Carpool";

const Components = () => {
    return (
        <section className="lg:h-lvh flex flex-col pt-5 pb-24">
            <h2 className="py-6 text-5xl font-bold text-sky-50">Our Services</h2>
            <div className="pt-10 flex flex-col justify-start items-start  md:flex-row md:justify-center  gap-10 md:gap-20 lg:gap-44 grow flex-wrap shrink">
                <Rideshare />
                <Carpool />
            </div>
        </section>
    );
};

export default Components;
