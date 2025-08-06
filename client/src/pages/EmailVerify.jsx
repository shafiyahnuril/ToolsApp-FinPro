import React,{useContext} from 'react'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import {Link} from 'react-router-dom'
import  {useNavigate} from 'react-router-dom'

const EmailVerify = () => {
  axios.defaults.withCredentials='true';
  const {backendUrl, isLoggedIn, userData, getUserData} = useContext(AppContext);
  const navigate = useNavigate();
  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    if(e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  }

  const handleKeyDown = (e, index) => {
  if (
    (e.key === "Backspace" || e.key === "Delete") &&
    e.target.value === "" &&
    index > 0
  ) {
    inputRefs.current[index - 1].focus();
    inputRefs.current[index - 1].value = ""; // Hapus angka sebelumnya juga
    e.preventDefault();
  }
};

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData('text')
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {   
      if(inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  }

  const onSubmitHandler = async(e) => {
    try{
      e.preventDefault();
      const otpArray = inputRefs.current.map(e => e.value);
      const otp=otpArray.join('');
      const {data} = await axios.post(backendUrl + "/api/auth/verify-account", {otp})
      if(data.success) {
        alert("Email verified successfully!");
        getUserData();
        navigate('/');
      } else {
        alert(data.message || "Verification failed");
      }
    } catch (error) {
      alert("Verification failed");
    }
  }

  useEffect (() => {
    isLoggedIn && userData && userData.isAccountVerified && navigate('/');
  }, [isLoggedIn, userData, navigate]);

  return (
    <div className="flex items-center justify-center bg-base-200" style={{ minHeight: "calc(100dvh - 4rem)" }}>
      <form onSubmit={onSubmitHandler}className="bg-gradient-to-br from-orange-400 via-slate-800 to-black border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative max-w-md w-full">
        <h1 className="text-white text-2xl font-semibold text-center mb-4">Verify Your Email</h1>
        <p className="text-center mb-6 text-slate-300 w-full">Input the 6-digit code sent to your email</p>
        
        {/* OTP Input */}
        <div className="flex justify-between mb-8 gap-2" onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => (
            <input
              type="text"
              maxLength="1"
              key={index}
              required
              className="w-12 h-12 bg-transparent border-b-3 border-white text-white text-center text-xl focus:outline-none focus:border-b-4 focus:border-orange-400 transition-all"
              ref={e => inputRefs.current[index] = e}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>
        
        {/* Button di bawah, full width, dan gradien */}
        <button
          type="submit"
          className="w-full py-3 bg-orange-400 text-black rounded-full font-semibold"
        >
          Verify
        </button>
      </form>
    </div>
  )
}

export default EmailVerify
