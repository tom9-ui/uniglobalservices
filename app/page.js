'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s @]+ @[^\s @]+\.[^\s @]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
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
      email: '',
      password: ''
    };
    
    // Validate email
    if (!formData.email) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    
    // If no errors, log to console
    if (!newErrors.email && !newErrors.password) {
      console.log('Login submitted:', {
        email: formData.email,
        password: formData.password
      });
    }
  };

  return (
    <>
      

      <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-black p-4 sm:p-6">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-[-50%] right-[-20%] w-[800px] h-[800px] rounded-full opacity-[0.03] bg-gradient-to-r from-white/80 to-transparent animate-[gradientRotate_30s_ease-in-out_infinite]"
          />
          <div 
            className="absolute bottom-[-30%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-[0.02] bg-gradient-to-r from-white/90 to-transparent animate-[gradientRotate_40s_ease-in-out_infinite_reverse]"
          />
          
          {/* Subtle grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.015] [background-image:linear-gradient(rgba(255,255,255,0.3)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.3)_1px,_transparent_1px)] [background-size:100px_100px]"
          />
        </div>

        {/* Main container with animation */}
        <div 
          className="relative z-10 w-full max-w-md animate-[fadeInUp_0.8s_ease-out]"
        >
          {/* Decorative element */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 opacity-[0.04]">
            <div 
              className="w-full h-full rounded-full bg-gradient-to-r from-white to-transparent animate-[float_6s_ease-in-out_infinite]"
            />
          </div>

          {/* Hero Section */}
          <div className="text-center mb-12 px-4">
            <h1 
              className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tight mb-4 text-white font-serif animate-[fadeInUp_0.8s_ease-out_0.2s_both] leading-[1.1] whitespace-nowrap"
            >
              Welcome Back
            </h1>
            <p 
              className="text-gray-400 text-sm sm:text-base font-light tracking-wide font-sans animate-[fadeInUp_0.8s_ease-out_0.4s_both] [letter-spacing:0.05em]"
            >
              Log in to access your dashboard and continue your journey
            </p>
          </div>

          {/* Login Form Card */}
          <div 
            className="relative bg-white rounded-3xl p-8 sm:p-10 md:p-12"
            style={{
              animation: 'fadeInUp 0.8s ease-out 0.6s both',
              boxShadow: `
                0 20px 60px -20px rgba(255, 255, 255, 0.1),
                0 0 0 1px rgba(255, 255, 255, 0.05)
              `
            }}
          >
            {/* Subtle shine effect on card */}
            <div 
              className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none"
              style={{
                background: 'linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 3s infinite'
              }}
            />

            <form onSubmit={handleSubmit} className="relative space-y-8">
              {/* Email Field */}
              <div className="relative">
                <label 
                  htmlFor="email"
                  className={`absolute left-4 transition-all duration-300 pointer-events-none text-gray-500
                    ${focusedField === 'email' || formData.email ? 
                      'top-[-10px] text-xs bg-white px-2 text-black font-medium' : 
                      'top-[18px] text-base'
                    }`}
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    letterSpacing: '0.03em'
                  }}
                >
                  Email Address
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  className={`w-full px-4 py-4 border-2 rounded-xl bg-transparent transition-all duration-300 text-black
                    ${errors.email ? 
                      'border-red-400 focus:border-red-500' : 
                      'border-gray-200 focus:border-black'
                    }
                    focus:outline-none focus:ring-0`}
                  style={{
                    fontFamily: "'Montserrat', sans-serif"
                  }}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-2 ml-1 font-medium tracking-wide">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="relative">
                <label 
                  htmlFor="password"
                  className={`absolute left-4 transition-all duration-300 pointer-events-none text-gray-500
                    ${focusedField === 'password' || formData.password ? 
                      'top-[-10px] text-xs bg-white px-2 text-black font-medium' : 
                      'top-[18px] text-base'
                    }`}
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    letterSpacing: '0.03em'
                  }}
                >
                  Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField('')}
                  className={`w-full px-4 py-4 pr-12 border-2 rounded-xl bg-transparent transition-all duration-300 text-black
                    ${errors.password ? 
                      'border-red-400 focus:border-red-500' : 
                      'border-gray-200 focus:border-black'
                    }
                    focus:outline-none focus:ring-0`}
                  style={{
                    fontFamily: "'Montserrat', sans-serif"
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors duration-300"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-2 ml-1 font-medium tracking-wide">
                    {errors.password}
                  </p>
                )}
              </div>

              

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-black text-white py-4 px-8 rounded-xl font-medium tracking-wide transition-all duration-300 relative overflow-hidden group"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  letterSpacing: '0.08em'
                }}
              >
                <span className="relative z-10">LOG IN</span>
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                />
              </button>

              
            </form>
          </div>

          {/* Decorative bottom element */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-20" />
        </div>
      </div>
    </>
  );
}