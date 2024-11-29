import Image from '../../../assets/info.png';

const Info = () => {
    return (
        <div className='flex flex-col-reverse md:flex-row justify-center items-center bg-colorBlue p-6 sm:p-8 sm:py-40 md:p-10 lg:p-16 md:h-dvh rounded-tl-[100px] rounded-br-[100px] md:rounded-tl-[300px] md:rounded-br-[300px]'>
            {/* Image Section */}
            <div className='w-full md:w-1/2 flex justify-center items-center mb-8 md:mb-0'>
                <div className='w-[200px] sm:w-[300px] md:w-[400px] lg:w-[500px] aspect-square bg-[#FFDD4A] rounded-full flex items-center justify-center overflow-hidden animate-fadeIn'>
                    <img 
                        src={Image} 
                        alt="A person riding a motorcycle" 
                        className='w-full h-full object-cover animate-slideUp' 
                    />
                </div>
            </div>
            
            {/* Text Section */}
            <div className='w-full xl:w-1/2 flex justify-start md:justify-start animate-slideInFromRight'>
                <p className='text-[1.2rem] sm:text-[1.5rem] md:text-[1.7rem] lg:text-[2rem] xl:text-[2.5rem] text-white w-auto xl:w-full py-10 sm:pl-10 xl:pl-0 leading-relaxed text-left font-semibold'>
                    Ridesync offers a fast, affordable ridesharing experience. Just enter your pick-up and drop-off locations, 
                    and our app connects you to nearby drivers for a safe and convenient journey. Say goodbye to long waits 
                    and high fares with reliable rides at competitive rates.
                </p>
            </div>
        </div>
    );
};

export default Info;
