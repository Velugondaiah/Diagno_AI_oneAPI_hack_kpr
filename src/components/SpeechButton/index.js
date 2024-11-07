import React, { useState } from 'react';
import { FaPlay, FaPause, FaStop } from 'react-icons/fa';
import './index.css';

const languageMap = {
    'english': 'en-US',
    'telugu': 'te-IN',
    'hindi': 'hi-IN',
    'tamil': 'ta-IN',
    'kannada': 'kn-IN',
    'malayalam': 'ml-IN',
    'marathi': 'mr-IN',
    'bengali': 'bn-IN',
    'gujarati': 'gu-IN',
    'punjabi': 'pa-IN'
};

const SpeechButton = ({ text, label, language = 'english' }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [speechInstance, setSpeechInstance] = useState(null);

    const stopSpeech = () => {
        if (speechInstance) {
            window.speechSynthesis.cancel();
            setSpeechInstance(null);
            setIsPlaying(false);
        }
    };

    const toggleSpeech = () => {
        if (isPlaying) {
            stopSpeech();
            return;
        }

        // Stop any existing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        
        // Set language based on the prop
        utterance.lang = languageMap[language] || 'en-US';
        
        // Get available voices
        const voices = window.speechSynthesis.getVoices();
        
        // Try to find a voice for the selected language
        const voice = voices.find(v => v.lang.startsWith(languageMap[language]));
        if (voice) {
            utterance.voice = voice;
        }

        utterance.onend = () => {
            setIsPlaying(false);
            setSpeechInstance(null);
        };

        utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event);
            setIsPlaying(false);
            setSpeechInstance(null);
        };

        window.speechSynthesis.speak(utterance);
        setSpeechInstance(utterance);
        setIsPlaying(true);
    };

    const checkVoiceAvailability = (lang) => {
        const voices = window.speechSynthesis.getVoices();
        return voices.some(voice => voice.lang.startsWith(languageMap[lang]));
    };

    return (
        <>
            {!checkVoiceAvailability(language) && (
                <div className="voice-warning">
                    Voice not available for {language}
                </div>
            )}
            <button 
                className={`speech-button ${isPlaying ? 'playing' : ''}`}
                onClick={toggleSpeech}
                title={`Read ${label || 'text'} aloud`}
                disabled={!checkVoiceAvailability(language)}
            >
                {isPlaying ? <FaPause /> : <FaPlay />}
                <span className="speech-label">{label || 'Read Aloud'}</span>
            </button>
        </>
    );
};

export default SpeechButton;