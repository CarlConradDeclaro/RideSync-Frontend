import React from 'react';
import DefaultProfile from '../../../../assets/DefaultProfile.png';
import { Button } from '../../../atoms/Button';

const Profile = () => {

    return (
        <>
            <div className="flex items-center space-x-6 mb-6 animate-fadeIn">
                <div className="relative">
                    <img
                        src={DefaultProfile}
                        alt="Profile"
                        className="w-20 h-20 rounded-full border"
                    />
                    <button className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1">
                        <span className="material-icons text-sm"></span>
                    </button>
                </div>
                <Button name='Edit Profile' size="small" variant="contained">
                    Edit Profile
                </Button>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-gray-700 mb-1">Firstname</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2"
                        placeholder="Fonchan Bernard"
                        readOnly
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Lastname</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2"
                        placeholder="Okwu"
                        readOnly
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        className="w-full border border-gray-300 rounded-md p-2"
                        placeholder="okwu@gmail.com"
                        readOnly
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Mobile Number</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2"
                        placeholder="0912345789"
                        readOnly
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Age</label>
                    <input
                        type="number"
                        className="w-full border border-gray-300 rounded-md p-2"
                        placeholder="18"
                        readOnly
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Country</label>
                    <div className="flex items-center space-x-2">
                        <img
                            src="https://flagcdn.com/w40/ph.png"
                            alt="Philippines"
                            className="w-5 h-5"
                        />
                        <span>Philippines</span>
                    </div>
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Gender</label>
                    <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                            <input type="radio" name="gender" className="mr-2" />
                            Male
                        </label>
                        <label className="flex items-center">
                            <input type="radio" name="gender" className="mr-2" />
                            Female
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
