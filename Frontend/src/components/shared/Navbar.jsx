import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover'
import {Avatar} from '@/components/ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { Button } from '../ui/button'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/apiUrl'
import { setUser } from '@/store/authSlice'

const Navbar = () => {

    const {user} = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            const response = await axios.get(`${USER_API_END_POINT}/logout`,{
                withCredentials: true
            });
            if(response.data.success){
                dispatch(setUser(null));
                navigate('/login');
                toast.success(response.data.msg);
            }
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }    
  return (
    <div className=" top-0 sticky z-20 bg-white">
        <div className="flex items-center justify-between px-16 mx-auto max-w-7xl h-14 border-2 border-gray-500 border-opacity-20">
            <div onClick={() => navigate('/home')}>
                <h1 className="text-2xl font-semibold">JOB<span className="text-orange-500">Portal</span></h1>
            </div>
            <div className='flex items-center gap-5'>
                <ul className="flex font-medium items-center gap-5">
                    {
                        user && user?.role === "student" ? (
                            <>
                                <li>
                                    <NavLink className={({isActive}) => isActive ? 'text-orange-500 transition-colors underline px-2 py-1 rounded-md' : 'hover:bg-black/5 transition-all px-2 py-1 rounded-md'} to={'/home'}>Home</NavLink>
                                </li>
                                <li>
                                    <NavLink className={({isActive}) => isActive ? 'text-orange-400 transition-colors underline px-2 py-1 rounded-md' : 'hover:bg-black/5 transition-all px-2 py-1 rounded-md'} to={'/jobs'}>Jobs</NavLink>
                                </li>
                                <li>
                                    <NavLink className={({isActive}) => isActive ? 'text-orange-400 transition-colors underline px-2 py-1 rounded-md' : 'hover:bg-black/5 transition-all px-2 py-1 rounded-md'} to={'/search'}>Browse</NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink className={({isActive}) => isActive ? 'text-orange-500 transition-colors underline px-2 py-1 rounded-md' : 'hover:bg-black/5 transition-all px-2 py-1 rounded-md'} to={'/admin/companies'}>Company</NavLink>
                                </li>
                                <li>
                                    <NavLink className={({isActive}) => isActive ? 'text-orange-500 transition-colors underline px-2 py-1 rounded-md' : 'hover:bg-black/5 transition-all px-2 py-1 rounded-md'} to={'/admin/jobs'}>Jobs</NavLink>
                                </li>
                            </>
                        )
                    }
                    
                </ul>
                {
                    !user ? (
                        <div className='flex gap-2'>
                            <Link to={'/login'}>
                                <Button 
                                    variant="outline" 
                                    className=" hover:bg-gray-100 transition-all text-black">Login</Button>
                            </Link>
                            <Link to={'/signup'}>
                                <Button variant="outline" className="bg-orange-500 hover:bg-orange-600 transition-all text-white">Signup</Button>
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer border-2">
                                        <AvatarImage className='w-20 object-cover' src={user?.profile?.profilePhoto} alt='avatar' />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-52 bg-white mr-5 min-h-32 gap-1 flex flex-col ">
                                    <div className='p-0 ml-4'>
                                        <ul>
                                            <li className='text-lg font-medium uppercase'>{user?.fullName}</li>
                                            <li>{user?.email}</li>
                                        </ul>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        {
                                            user && user?.role === "student" && (
                                                <Button variant="link" className="text-blue-500">
                                                    <Link to={'/profile'}>
                                                        View Profile
                                                    </Link>
                                                </Button>
                                            )
                                        }
                                        <Button variant="link" className="text-red-500" onClick={handleLogout} >Logout</Button>
                                    </div>
                                    
                                </PopoverContent>
                            </Popover>
                        </div>
                    )
                }
                
            </div>
        </div>
    </div>
  )
}

export default Navbar