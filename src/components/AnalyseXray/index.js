// src/App.js

import React, { useState } from 'react';
import axios from 'axios';
import './index.css'; // Add CSS here

function AnalyseXray() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [chatMessages, setChatMessages] = useState([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            addMessage('user', `Selected file: ${file.name}`);
        }
    };

    const startAnalysis = () => {
        if (selectedFile) {
            addMessage('user', 'Starting X-ray analysis...');
            setIsAnalyzing(true);

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Image = reader.result.split(',')[1];
                analyzeXrayWithAPI(base64Image);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const analyzeXrayWithAPI = async (base64Image) => {
        const url = 'https://chatgpt-vision1.p.rapidapi.com/matagvision';

        try {
            const response = await axios.post(url, {
                messages: [
                    {
                        role: 'user',
                        content: "Is there any broken bones or misjoints?",
                        img_url: 'data:image/png;base64,' + base64Image,
                    },
                ],
            }, {
                headers: {
                    'x-rapidapi-key': 'YOUR_RAPIDAPI_KEY', // Add your RapidAPI key here
                    'x-rapidapi-host': 'chatgpt-vision1.p.rapidapi.com',
                    'Content-Type': 'application/json',
                },
            });

            const result = response.data; // Adjust based on actual response structure
            addMessage('bot', result || 'Analysis completed, but no specific details were found about the X-ray.');
        } catch (error) {
            console.error('Error analyzing X-ray:', error);
            addMessage('bot', `Error analyzing X-ray: ${error.message}`);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const addMessage = (sender, message) => {
        setChatMessages((prevMessages) => [
            ...prevMessages,
            { sender, message },
        ]);
    };

    return (
        <div className="container">
            <h1>X-ray Analysis Chatbot</h1>
            <div id="chat-container">
                {chatMessages.map((msg, index) => (
                    <p key={index}>
                        <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.message}
                    </p>
                ))}
            </div>
            <input type="file" id="file-input" accept="image/*" onChange={handleFileUpload} />
            <button id="analyze-button" onClick={startAnalysis} disabled={!selectedFile || isAnalyzing}>
                {isAnalyzing ? 'Analyzing...' : 'Analyze X-ray'}
            </button>
        </div>
    );
}

export default AnalyseXray;
