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
    };

    // Handle file selection
    handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            this.setState({ file });
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

        // Validate file input
        if (!file) {
            this.setState({ error: "Please upload a file." });
            return;
        }

        // Reset error and start loading
        this.setState({ error: null, loading: true });

        // Prepare the form data for the request
        const formData = new FormData();
        formData.append('file', file);
        formData.append('language', selectedLanguage);

        try {
            const response = await axios.post('http://localhost:3005/x-ray-reports', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            // Process the response
            if (response.status === 200) {
                this.setState({ result: response.data.formattedOutput, error: null, loading: false });
            } else {
                this.setState({ error: 'Error processing your request. Please try again.', loading: false });
            }

        } catch (error) {
            console.error('Error uploading file:', error);
            this.setState({ error: 'Error processing your request. Please try again.', loading: false });
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
                                        accept=".pdf,.doc,.docx,.txt" // Add file type validation
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
                            <h2 className="result-heading">Results:</h2>
                            {result.split('\n\n').map((section, index) => {
                                if (section.trim()) {
                                    const [title, ...content] = section.split('\n');
                                    return (
                                        <div key={index} className="result-section">
                                            <div className="qa-box">
                                                <h3 className="question">{title}</h3>
                                                <div className="answer">
                                                    {content.map((line, lineIndex) => (
                                                        <p key={lineIndex}>{line.replace(/^-\s*/, '• ')}</p>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            })}
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
