import { BiUser } from 'react-icons/bi';
import { AiOutlineUnlock } from 'react-icons/ai';
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from '../context/AppContext';
import { useContext, useState } from 'react';

const Login = () => {
  const { backendUrl, setIsLoggedIn, setUserData } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Handler untuk submit form login
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      // Kirim request ke backend untuk login
      const res = await fetch(`${backendUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });
      const data = await res.json();
      console.log('data:', data);
      if (data.success) {
        setMessage('Login success!');
        // Set state login dan userData di context jika login berhasil
        setIsLoggedIn(true);
        if (data.user) setUserData(data.user);
        navigate('/');
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (err) {
      console.log('error:', err);
      setMessage('Error logging in');
    }
  };

  return (
    <div className="flex items-center justify-center bg-base-200" style={{ minHeight: "calc(100dvh - 4rem)" }}>
      <div className="bg-gradient-to-br from-orange-400 via-slate-800 to-black border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative max-w-md w-full">
        <h1 className="text-4xl text-white font-bold text-center mb-6">Login</h1>
        <form onSubmit={onSubmitHandler} action="">
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
            <BiUser className="absolute top-4 right-4" />
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
            <AiOutlineUnlock className="absolute top-4 right-4" />
          </div>
          <div className="flex justify-between items-center ">
            <div className="flex gap-2 items-center">
              <input type="checkbox" name="" id="" />
              <label htmlFor="">Remember me?</label>
            </div>
            <Link to='' className="text-orange-400">Forgot password?</Link>
          </div>
          {message && (
            <div className="text-center text-red-400 my-2">{message}</div>
          )}
          <button type="submit" className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-orange-400 hover:bg-orange-400 hover:text-white py-2 transition-colors duration-300">Login</button>
          <div>
            <span className="m-4 ">New here?<Link className="text-orange-400" to='/Register'> Create an Account</Link></span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;