import React from 'react';

const quotes = [
    "We make a living by what we get, but we make a life by what we give. – Winston Churchill",
    "The best way to find yourself is to lose yourself in the service of others. – Mahatma Gandhi",
    "No one has ever become poor by giving. – Anne Frank",
    "Giving is not just about making a donation. It is about making a difference. – Kathy Calvin",
    "The simplest acts of kindness are by far more powerful than a thousand heads bowing in prayer. – Mahatma Gandhi",
    "It's not how much we give, but how much love we put into giving. – Mother Teresa",
    "Remember that the happiest people are not those getting more, but those giving more. – H. Jackson Brown Jr.",
    "We rise by lifting others. – Robert Ingersoll",
    "To do more for the world than the world does for you – that is success. – Henry Ford",
    "Act as if what you do makes a difference. It does. – William James"
];

const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
};

const Loader: React.FC = () => {
    const randomQuote = getRandomQuote();

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-transparent">
            <div className="relative">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-800 mb-8"></div>
            </div>
            <div className="text-lg font-eduHand font-semibold text-black mt-4 text-center px-4">
                {randomQuote}
            </div>
        </div>
    );
};

export default Loader;
