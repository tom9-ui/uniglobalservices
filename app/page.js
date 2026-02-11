'use client';

import { useState } from 'react';

export default function AolLoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

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

  const handleSubmit = (e) => {
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
      console.log('Login submitted:', formData);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center p-4 font-sans">
      <div className="w-full max-w-sm flex-grow flex flex-col justify-center">
        <div className="text-center mb-6">
          <img src="https://s.yimg.com/cv/apiv2/ybar/logos/aol-logo-black-v1.png" alt="Aol" className="mx-auto" width="100" />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-center mb-6">Sign in</h2>

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
                className={`w-full px-4 py-3 border rounded-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${errors.username ? 'border-red-500' : 'border-gray-400'}
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
                className={`w-full px-4 py-3 border rounded-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${errors.password ? 'border-red-500' : 'border-gray-400'}
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
                className="w-full bg-blue-600 text-white py-3 rounded-sm font-bold text-lg hover:bg-blue-700 transition-colors"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>

        <div className="text-center mt-4">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Forgotten username?
          </a>
        </div>
      </div>
      <div className="w-full max-w-sm mb-8">
        <button className="w-full bg-transparent text-blue-600 py-3 rounded-sm font-bold text-lg border border-blue-600 hover:bg-blue-100 transition-colors">
            Create an account
        </button>
        <div className="text-center mt-8 text-xs text-gray-500">
            <p>
                <a href="#" className="hover:underline">Help</a>
                <span className="mx-2">|</span>
                <a href="#" className="hover:underline">Privacy</a>
                <span className="mx-2">|</span>
                <a href="#" className="hover:underline">Terms</a>
            </p>
        </div>
      </div>
    </div>
  );
}
