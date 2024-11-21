import { Button } from '../../../atoms/Button'
import RideSyncImage from '../../../../assets/RideSync.png'
import { useNavigate } from 'react-router-dom'
import React, { useContext } from 'react';


const Components = () => {
    const navigate = useNavigate()
    const handleLogin = () => {
        navigate("/passenger/*")
    }
    const handleSignUp = () => {
        navigate("/passenger/register")
    }



    return (
        <section className='flex h-lvh justify-center items-center'>
            <div className='w-3/5 flex justify-center'>
                <div className=''>
                    {/* For Title */}
                    <h1 className='text-6xl font-bold text-center px-40'>
                        Seamlessly Connect for every Journey
                    </h1>
                    <div className='flex justify-center py-8 gap-5'>


                        <Button name="Login" variant="contained" size="large" onClick={handleLogin} />
                        <Button name="Sign Up" variant="contained" size="large" bgColor="white" fontColor="black" onClick={handleSignUp} />
                    </div>
                </div>
            </div>
            <div className='w-2/5'>
                <div className='w-1/1'>
                    <img src={RideSyncImage} alt="Picture of a car" className='w-1/1' />
                </div>
            </div>
        </section>
    )
}

export default Components