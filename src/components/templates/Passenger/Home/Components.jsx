import React, { useEffect, useState } from 'react'
import { Sidebar } from '../../../molecules/Passenger/SIdebar'
import { UserHeader } from '../../../molecules/Passenger/UserHeader'
import { HomeContents } from '../../../organism/Passenger/HomeContents'
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
    <div className='flex h-full'> 
        <div className='h-screen '>
              <Sidebar active='home'/>
        </div>
        <div className='w-full '>
            <UserHeader/>
            <div>
               {loading ? <Loading/> : <HomeContents/>}
            </div>
        </div>
        
        
    </div>
  )
}

export default Components
