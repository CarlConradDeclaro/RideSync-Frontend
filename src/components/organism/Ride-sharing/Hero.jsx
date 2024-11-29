import RideSharing from '../../../assets/ridesharing_hero.png'

const Hero = () => {
    return (
        <div className="flex flex-col lg:flex-row px-8">
            <div className="lg:w-1/2 flex items-center justify-center lg:justify-end">
                <div className="pl-0 lg:pl-28 w-full animate-slideUp">
                    <p className=' text-[2rem] text-center sm:text-left sm:text-[4rem] font-bold'>
                        Simplifying Ridesharing, Anytime, Anywhere
                    </p>
                </div>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center animate-slideInFromRight">
                <img
                    src={RideSharing}
                    alt="Picture of two people riding a motorcycle"
                    className="w-full lg:w-[800px] h-auto"
                />
            </div>
        </div>
    );
};

export default Hero;
