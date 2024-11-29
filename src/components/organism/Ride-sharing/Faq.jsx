import { useRef, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useInView from '../../../utils/CustomHook/useInView';

const Faq = () => {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef)


    const questions = [
        { question: 'How do I book a ride?', answer: 'You can book a ride using our app or website. Simply enter your pickup and drop-off locations, choose your preferred ride type, and confirm. A driver will be matched with you shortly.' },
        { question: 'What payment methods do you accept?', answer: 'We accept credit/debit cards, digital wallets, and in some locations, cash. You can manage your payment options in the app settings.' },
        { question: 'Can I schedule a ride in advance?', answer: 'Absolutely! You can schedule a ride up to 7 days in advance through the app. Just select the "Schedule Ride" option when booking.' },
        { question: 'What happens if I leave something in the car?', answer: 'If you leave an item in the vehicle, you can report it through the app under "Ride History." We\'ll help connect you with the driver to retrieve your lost item.' },
        { question: 'Is ridesharing safe?', answer: 'Yes, safety is our top priority. All drivers undergo background checks, and vehicles are regularly inspected. Additionally, you can share your ride details with friends or family and access emergency assistance through the app.' },
        { question: 'How are fares calculated?', answer: 'Fares are based on the distance traveled, time taken, and current demand (such as surge pricing during peak hours). You’ll see an estimated fare before booking your ride.' },
        { question: 'Can I cancel a ride?', answer: 'Yes, you can cancel a ride before the driver arrives. A cancellation fee may apply if the driver has already started their journey to your location.' },
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div ref={sectionRef} className='flex flex-col w-full justify-center px-5 md:px-16 py-16 bg-gray-200 rounded-tr-[150px] rounded-bl-[150px] md:rounded-tr-[300px] md:rounded-bl-[200px]'>
            <h2 className={`text-5xl font-semibold ${isInView ? 'animate-slideUp delay-500 transition-all' : 'opacity-0'}`}>Frequently Asked Questions</h2>
            <p className={`text-2xl pt-6 ${isInView ? 'animate-slideUp delay-1000' : 'opacity-0'}`}>Your Questions, Answered</p>
            <div className="flex flex-col w-full py-10 justify-center items-center gap-6">
                {questions.map((item, index) => (
                    <div key={index} className={`bg-white rounded-lg shadow-lg overflow-hidden md:w-3/5 ${isInView ? 'animate-fadeIn' : 'opacity-0'}`}>
                        <h3
                            onClick={() => toggleFAQ(index)}
                            className="bg-[#00A6CE] text-white font-bold py-3 px-4 cursor-pointer hover:bg-[#0298bd] flex justify-between items-center"
                        >
                            {item.question}
                            <span className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                                <ExpandMoreIcon />
                            </span>
                        </h3>
                        <div className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                            <p className="bg-white text-gray-700 py-3 px-4">
                                {item.answer}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    );
};

export default Faq;
