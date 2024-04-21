
import { useContext } from 'react'
import { Button } from './ui/button'
import {User} from 'lucide-react'
import { UserContext } from '@/UserContext'
import { useNavigate } from 'react-router-dom';

const ProfileButton = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext)
  return (
    <div>
        <Button onClick={()=>{navigate(`/profile/${user.userId}`)}}>
            <User className="h-4 w-4 mr-3"/>
            Profile
        </Button>
    </div>
  )
}

export default ProfileButton


 