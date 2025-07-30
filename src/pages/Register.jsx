import {Link} from 'react-router-dom';
import { BiUser } from "react-icons/bi";
import { AiOutlineUnlock } from "react-icons/ai"; 
import {AiOutlineLock} from 'react-icons/ai';

const Register = () => {
  return (
    <div className="flex items-center justify-center bg-base-200" style={{ minHeight: "calc(100dvh - 4rem)" }}>
      <div className="bg-gradient-to-br from-orange-400 via-slate-800 to-black border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative max-w-md w-full">
          <h1 className="text-4xl text-white font-bold text-center mb-6">Register</h1>
          <form action="">
              <div className="relative my-4">
              <input
                id="email"
                type="email"
                className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-orange-400 peer"
                placeholder=" "
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
                className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-orange-400 peer"
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Your Password
              </label>
              <AiOutlineLock className="absolute top-4 right-4" />
            </div>
            <div className="relative my-4">
              <input
                id="password"
                type="password"
                className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-orange-400 peer"
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Confirm Password
              </label>
              <AiOutlineUnlock className="absolute top-4 right-4" />
            </div>
              <button type="submit" className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-orange-400 hover:bg-orange-400 hover:text-white py-2 transition-colors duration-300">Register</button>
              <div>
                  <span className="m-4 ">Already Created an Account?<Link className="text-orange-400" to='/Login'> Login</Link></span>
              </div>
          </form>
        </div>
     </div>
  )
}

export default Register
