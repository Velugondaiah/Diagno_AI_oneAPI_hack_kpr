import React, { useState } from 'react';
import { FaPlay, FaPause, FaStop } from 'react-icons/fa';
import './index.css';

const SpeechButton = ({ text, label, language }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [utterance, setUtterance] = useState(null);

    const languageMap = {
        english: 'en-US',
        hindi: 'hi-IN',
        telugu: 'te-IN',
        tamil: 'ta-IN',
        kannada: 'kn-IN',
        malayalam: 'ml-IN',
        marathi: 'mr-IN',
        bengali: 'bn-IN',
        gujarati: 'gu-IN',
        punjabi: 'pa-IN'
    };

    const speak = () => {
        if (!text) return;
        window.speechSynthesis.cancel();
        
        const newUtterance = new SpeechSynthesisUtterance(text);
        newUtterance.lang = languageMap[language] || 'en-US';
        newUtterance.rate = 0.9;
        
        newUtterance.onend = () => {
            setIsPlaying(false);
            setUtterance(null);
        };

        newUtterance.onerror = (event) => {
            console.error('Speech synthesis error:', event);
            setIsPlaying(false);
            setUtterance(null);
        };

        setUtterance(newUtterance);
        setIsPlaying(true);
        window.speechSynthesis.speak(newUtterance);
    };

    const pause = () => {
        window.speechSynthesis.pause();
        setIsPlaying(false);
    };

    const resume = () => {
        window.speechSynthesis.resume();
        setIsPlaying(true);
    };

    const stop = () => {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        setUtterance(null);
    };

    return (
        <div className="speech-controls">
            {!utterance ? (
                <button onClick={speak} className="speech-btn">
                    <FaPlay /> Listen
                </button>
            ) : (
                <>
                    {isPlaying ? (
                        <button onClick={pause} className="speech-btn">
                            <FaPause />
                        </button>
                    ) : (
                        <button onClick={resume} className="speech-btn">
                            <FaPlay />
                        </button>
                    )}
                    <button onClick={stop} className="speech-btn">
                        <FaStop />
                    </button>
                </>
            )}
        </div>
    );
};

export default SpeechButton;