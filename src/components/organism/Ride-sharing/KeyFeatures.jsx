import time from '../../../assets/247.png'
import safety from '../../../assets/safety.png'
import price from '../../../assets/price.png'
import {Features} from '../../molecules/Landing/Features'
import { useRef } from 'react'
import useInView from '../../../utils/CustomHook/useInView'
const KeyFeatures = ()=> {
    const data = [
        {imageSrc: time ,title: 'Convenience', description: 'Book quickly, track in real-time, and ride flexibly—travel made easy'},
        {imageSrc: safety ,title: 'Safety', description: 'Thorough driver checks, inspected vehicles, and in-app safety features for your peace of mind.'},
        {imageSrc: price ,title: 'Affordability', description: 'Transparent pricing, budget-friendly options, and no hidden fees.'},
    ]

    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef)

    const containerRef = useRef(null)
    const isContainerInView = useInView(containerRef)

    return(
        <div ref={sectionRef} className='flex flex-col px-5 md:px-16 pb-16'>
            <h2 className={`text-5xl font-bold py-10 ${isInView ? 'animate-slideUp' : 'opacity-0'}`}>Why RideSync Ride Sharing?</h2>
            <div ref={containerRef} className='flex flex-col lg:flex-row items-center lg:justify-around bg-colorBlue py-16 lg:py-10 rounded-2xl '>
                {data.map((item, index) => (
                    <div key={index} className={`w-[300px] ${isContainerInView ? 'animate-slideUp' : 'opacity-0'} delay-1000`}> 
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