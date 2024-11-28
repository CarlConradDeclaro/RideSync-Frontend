import time from '../../../assets/247.png'
import safety from '../../../assets/safety.png'
import price from '../../../assets/price.png'
import {Features} from '../../molecules/Landing/Features'
const KeyFeatures = ()=> {
    const data = [
        {imageSrc: time ,title: 'Convenience', description: 'Book quickly, track in real-time, and ride flexibly—travel made easy'},
        {imageSrc: safety ,title: 'Safety', description: 'Thorough driver checks, inspected vehicles, and in-app safety features for your peace of mind.'},
        {imageSrc: price ,title: 'Affordability', description: 'Transparent pricing, budget-friendly options, and no hidden fees.'},
    ]

    return(
        <div className='flex flex-col bg-colorBlue px-16 pb-16'>
            <h2 className='text-5xl text-white font-bold py-10'>Why RideSync Ride Sharing?</h2>
            <div className='flex flex-row justify-around bg-neutral-50 py-10 rounded-2xl'>
                {data.map((item, index) => (
                    <div key={index} className='w-[300px]'> 
                        <Features
                            imageSrc={item.imageSrc}
                            title={item.title}
                            description={item.description}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
export default KeyFeatures;