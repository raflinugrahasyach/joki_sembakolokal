import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-12 h-12 rounded-full animate-spin border-4 border-solid border-green-500 border-t-transparent"></div>
            <p className="text-slate-600">Memuat data...</p>
        </div>
    );
};

export default LoadingSpinner;
