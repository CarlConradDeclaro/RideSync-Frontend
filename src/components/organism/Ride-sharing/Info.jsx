import Image from '../../../assets/info.png'

const Info = () => {
    return (
        <div className='flex flex-col-reverse md:flex-row justify-center items-center bg-colorBlue p-5 md:p-10'>
            <div className='w-full md:w-1/2 flex justify-center items-center md:mb-0'>
                <div className='w-fit aspect-square bg-amber-400 rounded-full flex items-center justify-center overflow-hidden'>
                    <img 
                        src={Image} 
                        alt="a person riding a motorcycle" 
                        className='aspect-square w-[80vw] md:w-[500px]' 
                    />
                </div>
            </div>
            <div className='w-full md:w-1/2 md:mt-0 flex justify-center'>
                <p className='text-[1.2rem] sm:text-[1.5rem] lg:text-[2rem] xl:text-[2.5rem] text-white md:w-4/5 mb-10'>
                    Ridesync offers a fast, affordable ridesharing experience. Just enter your pick-up and drop-off locations, 
                    and our app connects you to nearby drivers for a safe and convenient journey. Say goodbye to long waits 
                    and high fares with reliable rides at competitive rates.
                </p>
            </div>
        </div>
    )
}

export default Info;
