
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { FormEvent, useState } from 'react';
import axios from 'axios';
import { VITE_API_URL } from "../setupEnv";

const RegisterPage = () => {

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>(''); 
  const [userType, setUserType] = useState<string>('Reader');


  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${VITE_API_URL}/register`, { name, email, password, userType});
      alert('Registration Successful. You can now login.');
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try with a different email/ try again later.');
    }
  };

  return (
    <div className="mt-4 grow flex items-center justify-around">  
      <div className="mb-64 flex flex-col gap-5 w-[90%]">
        <h1 className="text-4xl font-bold text-center mb-4">Begin your journey today.</h1>
        <form className="max-w-md mx-auto flex flex-col gap-12" onSubmit={handleSubmit}>

          <div className='flex flex-col items-center gap-12'> 
            Register as Reader or Administrator.
            
                <RadioGroup defaultValue={userType}>
                    <div className='flex items-center gap-12'>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Admin" id="r1" onClick={() => setUserType("Admin")} />
                            <Label htmlFor="r1">Admin</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Reader" id="r2" onClick={() => setUserType("Reader")} />
                            <Label htmlFor="r2">Reader</Label>
                        </div>
                    </div>
                </RadioGroup>
          
          </div> 

          <Input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            className='w-96 flex items-center justify-center'
          />
          <Input
            type="email"
            placeholder="Enter e-mail"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <Input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />



          <Button>Register Here</Button>
          <div className="text-center py-2 text-gray-500">
            Already a member?{' '}
            <Link className="underline text-foreground" to={'/login'}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;