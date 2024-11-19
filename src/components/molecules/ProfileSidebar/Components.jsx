import { Card } from "../Card"
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import PlaceIcon from '@mui/icons-material/Place';

const Components = ()=> {
    return(
        <Card className='md:w-[275px] h-[315px]'>
            <div className="group p-3 flex items-center gap-5 hover:bg-sidebarBg hover:border-r-8 hover:border-colorBlue cursor-pointer transition-all duration-300">
                <div className="bg-colorBlue rounded-full w-9 h-9 flex justify-center items-center group-hover:bg-transparent transition-colors duration-300">
                    <PersonIcon 
                        fontSize="medium" 
                        color="action" 
                        sx={{
                            color: 'white',
                            transition: 'color 0.3s ease',
                            '.group:hover &': {
                                color: '#00A6CE',
                            },
                        }}
                    />
                </div>
                <h1 className="text-black group-hover:font-medium">
                    Profile Settings
                </h1>
            </div>
            <div className="group p-3 flex items-center gap-5 hover:bg-sidebarBg hover:border-r-8 hover:border-colorBlue cursor-pointer transition-all duration-300">
                <div className="bg-colorBlue rounded-full w-9 h-9 flex justify-center items-center group-hover:bg-transparent transition-colors duration-300">
                    <LockIcon 
                        fontSize="medium" 
                        color="action" 
                        sx={{
                            color: 'white',
                            transition: 'color 0.3s ease',
                            '.group:hover &': {
                                color: '#00A6CE',
                            },
                        }}
                    />
                </div>
                <h1 className="text-black group-hover:font-medium">
                    Password
                </h1>
            </div>
            <div className="group p-3 flex items-center gap-5 hover:bg-sidebarBg hover:border-r-8 hover:border-colorBlue cursor-pointer transition-all duration-300">
                <div className="bg-colorBlue rounded-full w-9 h-9 flex justify-center items-center group-hover:bg-transparent transition-colors duration-300">
                    <PlaceIcon 
                        fontSize="medium" 
                        color="action" 
                        sx={{
                            color: 'white',
                            transition: 'color 0.3s ease',
                            '.group:hover &': {
                                color: '#00A6CE',
                            },
                        }}
                    />
                </div>
                <h1 className="text-black group-hover:font-medium">
                    Address
                </h1>
            </div>
        </Card>
    )
}
export default Components