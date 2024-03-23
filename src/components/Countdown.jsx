import React, { useEffect, useState } from 'react';


const Countdown = ({ date }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(date) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / (1000 * 60)) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const formattedDate = new Date(date).toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });

    return (
        <div className="text-center bg-gray-800 py-6 px-8 rounded-lg shadow-md mb-4">
            <h2 className="text-4xl font-bold mb-4 text-white">Next Date Night Countdown!</h2>
            <p className="text-xl font-bold text-gray-400 mb-6">{formattedDate}</p>
            <div className="flex justify-center items-center">
                <div className="bg-gray-700 rounded-lg p-4 shadow-md flex">
                    <div className="flex flex-col items-center justify-center mr-8">
                        <div className="text-6xl font-bold text-red-500">{timeLeft.days}</div>
                        <div className="text-xl font-bold text-gray-300">Days</div>
                    </div>
                    <div className="flex flex-col items-center justify-center mr-8">
                        <div className="text-6xl font-bold text-red-500">{timeLeft.hours}</div>
                        <div className="text-xl font-bold text-gray-300">Hours</div>
                    </div>
                    <div className="flex flex-col items-center justify-center mr-8">
                        <div className="text-6xl font-bold text-red-500">{timeLeft.minutes}</div>
                        <div className="text-xl font-bold text-gray-300">Minutes</div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <div className="text-6xl font-bold text-red-500">{timeLeft.seconds}</div>
                        <div className="text-xl font-bold text-gray-300">Seconds</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Countdown;