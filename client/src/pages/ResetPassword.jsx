import React from 'react'
import {useNavigate} from 'react-router-dom'
import { User, Lock } from 'lucide-react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'           

const ResetPassword = () => {
    const {backendUrl} = React.useContext(AppContext);
    axios.defaults.withCredentials = 'true';
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [isEmailSent, setIsEmailSent] = React.useState('');
    const [otp, setOtp] = React.useState(0);
    const [isOtpSubmitted, setIsOtpSubmitted] = React.useState('false');
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
        ){
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

    const onSubmitEmail = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post(backendUrl + "/api/auth/send-reset-otp", {email});
            data.success ? alert("OTP sent to your email!") : alert(data.message || "Failed to send OTP");
            data.success&& setIsEmailSent(false);
        } catch (error) {
            alert("Failed to send email");
        }
    }

    const onSubmitOtp = async (e) => {
        e.preventDefault();
        const otpArray= inputRefs.current.map(input => input.value).join('');
        setOtp(otpArray.join(''));
        setIsOtpSubmitted(true);
    }

    const onSubmitNewPassword = async (e) => {  
        e.preventDefault();
        try {
            const {data} = await axios.post(backendUrl + "/api/auth/reset-password", {email, otp, newPassword});
            if(data.success) {
                alert("Password reset successfully!");
                navigate('/login');
            } else {
                alert(data.message || "Failed to reset password");
            }
        } catch (error) {
            alert("Failed to reset password");
        }
    }
    

  return (
    <div className="flex items-center justify-center bg-base-200" style={{ minHeight: "calc(100dvh - 4rem)" }}>
        {!isEmailSent && 
            <div onSubmit={onSubmitEmail} className="bg-gradient-to-br from-orange-400 via-slate-800 to-black border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative max-w-md w-full">
                <h1 className="text-white text-2xl font-semibold text-center mb-4">Reset Your Password</h1>
                <p className="text-center mb-6 text-slate-300 w-full">Enter your registered email address</p>
                <form>
                    <div className="relative my-4">
                        <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    <button
                        type="submit"
                        className="w-full py-2 bg-orange-400 text-black rounded-full font-semibold mt-4"
                        >
                        Submit
                    </button>
                </form>
            </div>
        }
        {isEmailSent && !isOtpSubmitted &&
            <form  onSubmit={onSubmitOtp} className="bg-gradient-to-br from-orange-400 via-slate-800 to-black border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative max-w-md w-full">
                <h1 className="text-white text-2xl font-semibold text-center mb-4">Reset Password OTP</h1>
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
                    className="w-full py-2.5 bg-orange-400 text-black rounded-full font-semibold"
                >
                Submit
                </button>
            </form>  
        }
        {isOtpSubmitted && isEmailSent && 
            <div onSubmit={onSubmitNewPassword} className="bg-gradient-to-br from-orange-400 via-slate-800 to-black border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative max-w-md w-full">
                <h1 className="text-white text-2xl font-semibold text-center mb-4">New Password</h1>
                <p className="text-center mb-6 text-slate-300 w-full">Enter your new password below</p>
                <form>
                    <div className="relative my-4">
                        <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-orange-400 peer"
                        placeholder=" "
                        required
                        />
                        <label
                        htmlFor="newPassword"
                        className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                        Your New Password
                        </label>   
                        <Lock className="absolute top-4 right-4 h-4 w-4 text-white" />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-orange-400 text-black rounded-full font-semibold mt-4"
                        >
                        Submit
                    </button>
                </form>
            </div>
        }
    </div>
  )
}

export default ResetPassword
