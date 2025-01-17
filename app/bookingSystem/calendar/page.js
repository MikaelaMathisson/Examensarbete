"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import Calendar from '../../components/Calendar';

const CalendarPage = () => {
    const searchParams = useSearchParams();
    const type = searchParams.get('type');

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
            <main className="flex-grow flex items-center justify-center p-4">
                <div className="bg-white p-8 shadow-2xl rounded-lg text-center max-w-lg w-full">
                    <h1 className="font-bold text-gray-800 text-4xl mb-8">Boka {type}</h1>
                    <Calendar type={type} />
                </div>
            </main>
        </div>
    );
};

export default CalendarPage;