import { Link } from "react-router-dom";
import { Component } from "react";
import Header from "../Header";
import { FiUpload } from 'react-icons/fi';
import axios from 'axios';
import Cookies from 'js-cookie';
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

class AnalyseReport extends Component {
    state = {
        languages: languages,
        selectedLanguage: "english",
        file: null,
        result: null,
        error: null,
        loading: false,
        recommendedSpecialist: null,
    };

    extractSpecialist = (result) => {
        try {
            console.log("Full analysis result:", result); // Debug log

            // Look for the specialist section
            const specialistPattern = /Recommended Specialist:[\s\S]*?Specialist:\s*([A-Za-z]+)/i;
            const match = result.match(specialistPattern);
            
            if (match && match[1]) {
                const specialist = match[1].trim();
                console.log("Extracted specialist:", specialist);
                return specialist;
            }

            // Alternative extraction method if the first one fails
            const sections = result.split(/\d+\./);
            const specialistSection = sections.find(section => 
                section.toLowerCase().includes('recommended specialist'));
            
            console.log("Specialist section found:", specialistSection);

            if (specialistSection) {
                const lines = specialistSection.split('\n');
                const specialistLine = lines.find(line => 
                    line.toLowerCase().includes('specialist:'));
                
                console.log("Specialist line found:", specialistLine);

                if (specialistLine) {
                    const specialist = specialistLine
                        .split(':')[1]
                        .trim()
                        .split(' ')[0]
                        .trim();
                    console.log("Extracted specialist (method 2):", specialist);
                    return specialist;
                }
            }

            console.log("No specialist found in the analysis");
            return null;
        } catch (error) {
            console.error('Error extracting specialist:', error);
            return null;
        }
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

        if (!file) {
            this.setState({ error: "Please upload a file." });
            return;
        }

        this.setState({ error: null, loading: true });
      
        const formData = new FormData();
        formData.append('file', file);
        formData.append('language', selectedLanguage);

        try {
            const response = await axios.post('http://localhost:3008/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.status === 200) {
                const result = response.data.formattedOutput;
                console.log("Raw API response:", response.data); // Debug log
                console.log("Formatted output:", result); // Debug log
                
                const specialist = this.extractSpecialist(result);
                console.log("Final extracted specialist:", specialist); // Debug log
                
                this.setState({ 
                    result,
                    recommendedSpecialist: specialist,
                    error: null, 
                    loading: false 
                });
            }
        } catch (error) {
            console.error('Error:', error);
            this.setState({ 
                error: `Error: ${error.response?.data?.error || error.message || 'Unknown error occurred'}`, 
                loading: false 
            });
        }
    };

    render() {
        const { languages, selectedLanguage, result, error, loading, recommendedSpecialist } = this.state;

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
                            <h2 className="result-heading">Analysis Results:</h2>
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

                            {/* Add Book Appointment section */}
                            <div className="appointment-section">
                                {recommendedSpecialist ? (
                                    <div className="specialist-info">
                                        <h3>Recommended Specialist: {recommendedSpecialist}</h3>
                                        <Link 
                                            to={{
                                                pathname: "/appointments",
                                                state: { specialist: recommendedSpecialist }
                                            }}
                                            className="appointment-link"
                                        >
                                            <button className="report-button">
                                                Book Appointment with {recommendedSpecialist}
                                            </button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="no-specialist-info">
                                        <p>No specialist recommendation found in the analysis.</p>
                                        <p className="debug-info">
                                            Please ensure the medical report contains sufficient information 
                                            for specialist recommendation.
                                        </p>
                                        {process.env.NODE_ENV === 'development' && (
                                            <pre className="debug-output">
                                                {JSON.stringify({ result }, null, 2)}
                                            </pre>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </>
        );
    }
}

export default AnalyseReport;
