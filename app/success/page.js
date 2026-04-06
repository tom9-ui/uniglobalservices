'use client';

import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-sm p-8 text-center">
        <div className="mb-6">
          <svg
            className="w-16 h-16 mx-auto text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Success!
        </h2>
        <p className="text-gray-600 mb-8">Your email has been updated.</p>
        <button
          onClick={() => router.push('/')}
          className="w-full bg-[#6001d2] text-white py-3 rounded-sm font-bold text-lg hover:bg-[#4f01af] transition-colors"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}
