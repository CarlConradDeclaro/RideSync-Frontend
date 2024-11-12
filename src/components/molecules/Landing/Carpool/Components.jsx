import carpool from '../../../../assets/carpool.png'
const Components = () => {
    return(
        <div className='w-64 flex flex-col items-center gap-3 group cursor-pointer'>
            <div className='bg-homeHeaderBg rounded-full'>
                <img src={carpool} className='rounded-full h-64 transform transition-transform duration-300 group-hover:scale-125'/>
            </div>
            <h2 className='text-4xl font-bold'>Car-pooling</h2>
            <h3 className='text-xl font-semibold text-neutral-500'>Passenger Service</h3>
            <span className='text-cyan-400'>LEARN MORE</span> {/*To be changed*/}
        </div>
    )
}

export default Components;