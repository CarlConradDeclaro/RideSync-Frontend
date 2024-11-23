import DriverImg from '../../../../assets/driverLanding.png'
import { Button } from '../../../atoms/Button';
import { Title } from '../../../atoms/Title';

const Components = ()=> {
    return(
        <section className='flex flex-col lg:h-lvh md:justify-center items-center lg:flex-row py-16 gap-10'>
            <div className="lg:w-1/2 flex justify-center items-center">
                <div className="w-1/1 bg-colorBlue rounded-full flex aspect-square lg:aspect-square justify-center">
                    <img src={DriverImg} alt="Picture of a driver of a car with his passenger" className=''/>
                </div>
            </div>
            <div className="lg:w-1/2 flex justify-center align-center flex-col">
                <div className='py-6'>
                    <Title variant="h2" value={"Become a driver today"}/>
                </div>
                <p className='text-xl font-semibold text-neutral-500 lg:w-1/2 pb-6'>Take control of your schedule and earn on your terms with RideSync. Join our community of drivers, enjoy competitive pay, and get 24/7 support. Start your journey today!</p>
                <Button name="Learn more about being a RideSync Driver" variant="contained" size="large" />
            </div>
        </section>
    )
}
export default Components;