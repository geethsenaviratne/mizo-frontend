
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const [step, setStep] = useState("email");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    // TODO: Replace with actual API call
    setTimeout(() => {
      setSent(true);
      setLoading(false);
    }, 1200);
  }

  async function sendOTP(){
    try{
        await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/send-otp/" + email)
        toast.success("OTP sent to your email " + email)
        setStep("otp");

    }catch(err){
        console.error(err);
        toast.error("Error sending OTP")

    }
  }

  async function changePassword(){
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try{
        await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/change-password", {
            email: email,
            otp: otp,
            newPassword: newPassword
        })
        toast.success("Password changed successfully")
        navigate("/login");
    } catch (err) {
        console.error(err);
        toast.error("Error changing password");
    }
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative"
      style={{
        backgroundImage: 'url(/login.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay for darkening background if needed */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      {/* Centered Card */}
      <div className="relative z-20 flex items-center justify-center w-full">
        {step === "email" && (
          <div
            className="w-full max-w-md rounded-2xl shadow-2xl p-8 flex flex-col items-center"
            style={{
              background: 'rgba(255,255,255,0.25)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.3)',
            }}
          >
            {/* Back Button to Login */}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="self-start mb-2 text-rose-400 hover:underline font-medium focus:outline-none"
            >
              ← Back to Login
            </button>
            {/* Logo */}
            <img
              src="/logo.jpg"
              alt="Mizo Beauty Logo"
              className="w-20 h-20 rounded-full object-cover shadow-lg border-4 border-white mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Forgot Password</h2>
            <p className="text-white mb-6 text-center">
              Enter your email address to receive an OTP for password reset.
            </p>
            {sent ? (
              <div className="w-full text-center">
                <p className="text-green-600 font-semibold mb-4">If an account exists for <span className="font-mono">{email}</span>, an OTP has been sent.</p>
              </div>
            ) : (
              <form className="w-full space-y-4 text-left" onSubmit={(e) => { e.preventDefault(); sendOTP(); }}>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-rose-300"
                />
                <button
                  type="submit"
                  disabled={loading || !email}
                  className={`w-full py-3 rounded-lg font-semibold text-white transition active:scale-95 ${
                    loading
                      ? "bg-rose-300 cursor-not-allowed"
                      : "bg-rose-400 hover:bg-rose-500"
                  }`}
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              </form>
            )}
          </div>
        )}
        {step === "otp" && (
          <div
            className="w-full max-w-md rounded-2xl shadow-2xl p-8 flex flex-col items-center"
            style={{
              background: 'rgba(255,255,255,0.25)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.3)',
            }}
          >
            {/* Back Button */}
            <button
              type="button"
              onClick={() => setStep("email")}
              className="self-start mb-2 text-rose-400 hover:underline font-medium focus:outline-none"
            >
              ← Back
            </button>
            {/* Logo */}
            <img
              src="/logo.jpg"
              alt="Mizo Beauty Logo"
              className="w-20 h-20 rounded-full object-cover shadow-lg border-4 border-white mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Reset Password</h2>
            <p className="text-white mb-6 text-center">
              Enter the OTP sent to your email and set your new password.
            </p>
            <form className="w-full space-y-4 text-left" onSubmit={(e) => { e.preventDefault(); changePassword(); }}>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                disabled={loading}
                required
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter New Password"
                disabled={loading}
                required
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm New Password"
                disabled={loading}
                required
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
              <button
                type="submit"
                disabled={loading || !otp || !newPassword || !confirmPassword}
                className={`w-full py-3 rounded-lg font-semibold text-white transition active:scale-95 ${
                  loading
                    ? "bg-rose-300 cursor-not-allowed"
                    : "bg-rose-400 hover:bg-rose-500"
                }`}
              >
                {loading ? "Changing..." : "Change Password"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}