import React, { useEffect, useState } from 'react'
import { UserHeader } from '../../../molecules/Passenger/UserHeader'
import { Message } from '../../../organism/Passenger/Message'
import { Sidebar } from '../../../molecules/Passenger/SIdebar'
import { Loading } from '../../../molecules/Loading'

const Components = () => {

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className='flex h-full '>
            <div className='h-screen '>
                <Sidebar active="message" />
            </div>
            <div className='w-full '>
                <UserHeader />
                <div>
                    {loading ? <Loading /> : <Message />}

                </div>
            </div>
        </div>
    )
}

export default Components
