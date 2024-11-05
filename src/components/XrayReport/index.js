import { Link } from "react-router-dom";
import { Component } from "react";
import Header from "../Header";
import { FiUpload } from 'react-icons/fi';
import axios from 'axios';
import "./index.css";
import { Oval } from 'react-loader-spinner'; // Import the specific loader, e.g., Oval

const languages = [
    { id: "english", language: "English" },
    { id: "telugu", language: "Telugu / తెలుగు" },
    { id: "hindi", language: "Hindi / हिंदी" },
    { id: "tamil", language: "Tamil / தமிழ்" },
    { id: "kannada", language: "Kannada / ಕನ್ನಡ" },
    { id: "malayalam", language: "Malayalam / മലയാളം" },
    { id: "marathi", language: "Marathi / मराठी" },
    { id: "bengali", language: "Bengali / বাংলা" },
    { id: "gujarati", language: "Gujarati / ગુજરાતી" },
    { id: "punjabi", language: "Punjabi / ਪੰਜਾਬੀ" }
];

class XrayReport extends Component {
    state = {
        languages: languages,
        selectedLanguage: "english",
        file: null,
        result: null,
        error: null,
        loading: false, // New state for loading
        fileType: 'xray', // Add this to explicitly set file type
    };

    // Handle file selection
    handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!validTypes.includes(file.type)) {
                this.setState({ 
                    error: "Please upload a valid X-ray image (JPEG, PNG formats only)",
                    file: null 
                });
                e.target.value = ''; // Reset file input
                return;
            }
            this.setState({ file, error: null });
        } else {
            this.setState({ error: "Please select a file." });
        }
    };

    // Handle language selection
    handleLanguageChange = (e) => {
        this.setState({ selectedLanguage: e.target.value });
    };

    // Handle form submission
    handleSubmit = async (e) => {
        e.preventDefault();
        const { file, selectedLanguage } = this.state;

        if (!file) {
            this.setState({ error: "Please upload a file." });
            return;
        }

        this.setState({ error: null, loading: true });

        const formData = new FormData();
        formData.append('file', file);
        formData.append('language', selectedLanguage);
        formData.append('fileType', 'xray');

        try {
            const response = await axios.post('http://localhost:3008/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.status === 200) {
                this.setState({ result: response.data.formattedOutput, error: null, loading: false });
            } else {
                this.setState({ 
                    error: `Server responded with status: ${response.status}`, 
                    loading: false 
                });
            }

        } catch (error) {
            console.error('Detailed error:', error.response?.data || error);
            this.setState({ 
                error: error.response?.data?.details || error.message || 'Error processing your request',
                loading: false 
            });
        }
    };

    render() {
        const { languages, selectedLanguage, result, error, loading } = this.state;

        return (
            <>
                <Header />
                <div className="report-cont">
                    <div className="container-for-report">
                        <form onSubmit={this.handleSubmit}>
                            <div className="files">
                                <div className="file-upload-container">
                                    <label htmlFor="file-upload" className="custom-file-upload">
                                        <FiUpload className="upload-icon" />
                                        Upload Your Report
                                    </label>
                                    <input
                                        id="file-upload"
                                        className="file"
                                        type="file"
                                        accept="image/jpeg,image/png,image/jpg" // Remove PDF, only allow images
                                        onChange={this.handleFileChange}
                                    />
                                </div>

                                <div className="language-dropdown-container">
                                    <label htmlFor="language-select">Choose a language:</label>
                                    <select
                                        id="language-select"
                                        value={selectedLanguage}
                                        onChange={this.handleLanguageChange}
                                        className="language-dropdown"
                                    >
                                        <option value="" disabled>Select a language</option>
                                        {languages.map((lang) => (
                                            <option key={lang.id} value={lang.id}>
                                                {lang.language}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {error && <p className="error-message">{error}</p>}

                            <button className="report-button" type="submit" disabled={loading}>
                                {loading ? 'Processing...' : 'Process Report'}
                            </button>
                        </form>
                    </div>

                    {/* Display loader during file upload */}
                    {loading && (
                        <div className="loader-container">
                            <Oval
                                height={80}
                                width={80}
                                color="#4fa94d"
                                ariaLabel="loading"
                                visible={true}
                            />
                        </div>
                    )}

                    {/* Display the result */}
                    {result && (
                        <div className="result-container">
                            <h2 className="result-heading">X-Ray Analysis Report:</h2>
                            {result.split('\n\n').map((section, index) => {
                                if (section.trim()) {
                                    const [title, ...content] = section.split('\n');
                                    return (
                                        <div key={index} className="result-section">
                                            <div className="qa-box">
                                                <h3 className="question">{title}</h3>
                                                <div className="answer">
                                                    {content.map((line, lineIndex) => (
                                                        <p key={lineIndex}>
                                                            {line.startsWith('-') ? 
                                                                line.replace(/^-\s*/, '• ') : 
                                                                line}
                                                        </p>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                            <div className="disclaimer">
                                <p className="disclaimer-text">
                                    DISCLAIMER: This is an AI-generated analysis. Please consult with qualified medical professionals for accurate diagnosis and treatment.
                                </p>
                            </div>
                        </div>
                    )}

                   {result && (
                     <Link to="/appointments">
                     <button className="report-button">Appointment</button>
                 </Link>
                   )}
                </div>
            </>
        );
    }
}

export default XrayReport;
