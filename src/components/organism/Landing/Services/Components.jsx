import { Rideshare } from "../../../molecules/Landing/RideSharing";
import { Carpool } from "../../../molecules/Landing/Carpool";

const Components = () => {
    return (
        <section className="h-lvh flex flex-col">
            <h2 className="text-5xl font-bold text-neutral-500">Our Services</h2>
            <div className="flex justify-center items-center gap-44 grow">
                <Rideshare />
                <Carpool />
            </div>
        </section>
    );
};

export default Components;
