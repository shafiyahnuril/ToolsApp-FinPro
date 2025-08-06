import { User, Unlock } from 'lucide-react';
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from '../context/AppContext';
import { useContext, useState } from 'react';

const Login = () => {
  const { backendUrl, setIsLoggedIn, setUserData } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handler untuk submit form login
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);
    
    try {
      // Kirim request ke backend untuk login
      const res = await fetch(`${backendUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });
      
      const data = await res.json();
      console.log('Login response:', data);
      
      if (data.success) {
        setMessage('Login successful! Redirecting...');
        // Set state login dan userData di context jika login berhasil
        setIsLoggedIn(true);
        if (data.user) setUserData(data.user);
        
        // Clear form
        setEmail('');
        setPassword('');
        
        // Redirect to home page
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setMessage('Network error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-base-200" style={{ minHeight: "calc(100dvh - 4rem)" }}>
      <div className="bg-gradient-to-br from-orange-400 via-slate-800 to-black border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative max-w-md w-full">
        <h1 className="text-4xl text-white font-bold text-center mb-6">Login</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="relative my-4">
            <input
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-orange-400 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Your Email
            </label>
            <User className="absolute top-4 right-4 h-4 w-4 text-white" />
          </div>
          
          <div className="relative my-4">
            <input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-orange-400 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Your Password
            </label>
            <Unlock className="absolute top-4 right-4 h-4 w-4 text-white" />
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <input type="checkbox" className="checkbox checkbox-xs" />
              <label className="text-white text-sm">Remember me?</label>
            </div>
            <Link to='/reset-password' className="text-orange-400 hover:underline text-sm">Forgot password?</Link>
          </div>
          
          {message && (
            <div className={`text-center my-2 ${message.includes('successful') ? 'text-green-400' : 'text-red-400'}`}>
              {message}
            </div>
          )}
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-orange-400 hover:bg-orange-400 hover:text-white py-2 transition-colors duration-300 disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          
          <div>
            <span className="m-4 text-white">New here? 
              <Link className="text-orange-400 hover:underline" to='/Register'> Create an Account</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;