import React, { useEffect, useState } from 'react'
import { UserHeader } from '../../../molecules/Passenger/UserHeader'
import { ProfileContents } from '../../../organism/Passenger/ProfileContents'
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
        <div className='flex   '>
            <div className='h-screen sticky top-0 z-50'>
                <Sidebar active="profile" />
            </div>
            <div className='w-full '>
                <UserHeader />
                <div>
                    {loading ? <Loading /> : <ProfileContents />}

                </div>
            </div>
        </div>
    )
}

export default Components
