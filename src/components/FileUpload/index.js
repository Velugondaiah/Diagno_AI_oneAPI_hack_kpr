import React, { useState } from 'react';
import './index.css';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [language, setLanguage] = useState('english');
    const [analysis, setAnalysis] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError('');
    };

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file');
            return;
        }

        setLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('file', file);
        formData.append('language', language);

        try {
            const response = await fetch('http://localhost:3008/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Upload failed');
            }

            const data = await response.json();
            if (data.success) {
                setAnalysis(data.result);
            } else {
                throw new Error(data.error || 'Analysis failed');
            }

        } catch (error) {
            console.error('Upload error:', error);
            setError(error.message || 'Failed to analyze report');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="upload-container">
            <h2>Upload Medical Report</h2>
            <form onSubmit={handleUpload} className="upload-form">
                <div className="file-input-container">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.png,.jpg,.jpeg"
                        className="file-input"
                    />
                </div>

                <div className="language-select-container">
                    <label htmlFor="language">Select Language:</label>
                    <select
                        id="language"
                        value={language}
                        onChange={handleLanguageChange}
                        className="language-select"
                    >
                        <option value="english">English</option>
                        <option value="telugu">Telugu</option>
                        <option value="hindi">Hindi</option>
                        <option value="tamil">Tamil</option>
                        <option value="kannada">Kannada</option>
                        <option value="malayalam">Malayalam</option>
                        <option value="marathi">Marathi</option>
                        <option value="bengali">Bengali</option>
                        <option value="gujarati">Gujarati</option>
                        <option value="punjabi">Punjabi</option>
                    </select>
                </div>

                <button 
                    type="submit" 
                    className="upload-button"
                    disabled={loading}
                >
                    {loading ? 'Analyzing...' : 'Analyze Report'}
                </button>

                {error && <div className="error-message">{error}</div>}

                {analysis && (
                    <div className="analysis-result">
                        <h3>Analysis Result:</h3>
                        <pre>{analysis}</pre>
                    </div>
                )}
            </form>
        </div>
    );
};

export default FileUpload; 