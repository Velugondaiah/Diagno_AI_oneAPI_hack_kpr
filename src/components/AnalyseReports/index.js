import { Link } from "react-router-dom";
import { Component } from "react";
import Header from "../Header";
import { FiUpload } from 'react-icons/fi';
import axios from 'axios';
import "./index.css";

const languages = [
    {
        id: "telugu",
        language: "TELUGU"
    },
    {
        id: "hindi",
        language: "HINDI"
    },
    {
        id: "english",
        language: "ENGLISH"
    }
];

class AnalyseReport extends Component {
    state = {
        languages: languages,
        selectedLanguage: languages[0].id,
        file: null,
        result: null,
        error: null,
    };

    // Handle file selection
    handleFileChange = (e) => {
        this.setState({ file: e.target.files[0] });
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

        const formData = new FormData();
        formData.append('file', file);
        formData.append('language', selectedLanguage);

        try {
            const response = await axios.post('http://localhost:3005/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            this.setState({ result: response.data, error: null });
        } catch (error) {
            console.error('Error uploading file:', error);
            this.setState({ error: 'Error processing your request. Please try again.' });
        }
    };

    render() {
        const { languages, selectedLanguage, result, error } = this.state;

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
                                <input id="file-upload" className="file" type="file" onChange={this.handleFileChange} />
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

                            <button className="report-button" type="submit">
                                Process Report
                            </button>
                        </form>
                    </div>

                    {result && (
                        <div className="result-container">
                            <h2>Results:</h2>
                            <p><strong>Extracted Text:</strong> {result.extractedText}</p>
                            <p><strong>Analyzed Text:</strong> {result.analyzedText}</p>
                            <p><strong>Translated Text:</strong> {result.translatedText}</p>
                        </div>
                    )}

                    <Link to="/appointments">
                        <button className="report-button">Appointment</button>
                    </Link>
                </div>
            </>
        );
    }
}

export default AnalyseReport;
