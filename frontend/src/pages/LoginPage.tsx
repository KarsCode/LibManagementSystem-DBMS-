  import { UserContext } from '@/UserContext';
  import { Button } from '@/components/ui/button';
  import { Input } from '@/components/ui/input';
  import { VITE_API_URL } from '@/setupEnv';
  import axios from 'axios';
  import { FormEvent, useContext, useState } from 'react';
  import { Link, useNavigate } from 'react-router-dom';


  const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {data} = await axios.post(`${VITE_API_URL}/login`, { email, password },{withCredentials:true});
        setUser(data);

        console.log(data)

        if (data.user.usertype === 'Reader') {
          navigate('/usrhome');
        } else if (data.user.usertype === 'Admin') {
          navigate('/adminhome');
        } else {
          // Handle other user types or unexpected values
          console.error('Unknown userType:', data.usertype);
          alert('Login failed. Please contact support.');
        }
      } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed. Try with different credentials.');
      }
    };

      return (
          <div className="mt-24 flex flex-col items-center justify-around">
            <div className="mb-64 flex flex-col gap-5">
              <h1 className="text-4xl font-bold text-center pb-4">The Library Management Solution.</h1>
              <form className="max-w-md mx-auto flex flex-col gap-12" onSubmit={handleSubmit}>
                <Input 
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required/>
                
                <Input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
      
                <Button>Login</Button>
                {/* <button className="primary">Login</button> */}
                <div className="text-center py-2 text-gray-500">
                  Don't have a library account yet?{' '}
                  <Link className="underline text-foreground" to={'/register'}>
                    Read now.
                  </Link>
                </div>  
              </form>
            </div>
          </div>

          
        );
      };
      

  export default LoginPage
