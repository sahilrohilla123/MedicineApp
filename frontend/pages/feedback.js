import axios from 'axios';
import { useState } from 'react';
import handlefeedback from '@/functions/handlefeedback';

const FeedbackForm = () => {
    const [name, setName] = useState('');
    const [feedback, setFeedback] = useState('');

    const submitFeed = (e) => {
        handlefeedback(e, name, setName, feedback, setFeedback);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-md rounded-lg p-6 sm:p-8 w-full max-w-lg">
                <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">Feedback Form</h2>
                <form onSubmit={submitFeed} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your Name"
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="feedback">
                            Feedback
                        </label>
                        <textarea
                            id="feedback"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Your Feedback"
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base h-24 sm:h-32"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 sm:py-3 px-4 rounded-lg transition duration-300 text-sm sm:text-base"
                    >
                        Submit Feedback
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FeedbackForm;
