import React from 'react';
import SpeechButton from '../SpeechButton';
import './index.css';

const AnalysisResults = ({ results }) => {
    // Parse the results into sections
    const sections = {
        symptoms: '',
        diagnosis: '',
        severity: '',
        treatment: '',
        specialist: ''
    };

    // Parse the results string into sections
    const parseResults = (resultsString) => {
        const lines = resultsString.split('\n');
        let currentSection = '';

        lines.forEach(line => {
            if (line.startsWith('1. Symptoms:')) {
                currentSection = 'symptoms';
            } else if (line.startsWith('2. Diagnosis:')) {
                currentSection = 'diagnosis';
            } else if (line.startsWith('3. Severity Level:')) {
                currentSection = 'severity';
            } else if (line.startsWith('4. Treatment Recommendations:')) {
                currentSection = 'treatment';
            } else if (line.startsWith('5. Recommended Specialist:')) {
                currentSection = 'specialist';
            } else if (line.trim() && currentSection) {
                sections[currentSection] += line + '\n';
            }
        });
    };

    parseResults(results);

    return (
        <div className="analysis-results">
            <h2>Analysis Results</h2>
            
            <div className="result-section">
                <h3>Symptoms</h3>
                <p>{sections.symptoms}</p>
                <SpeechButton 
                    text={sections.symptoms} 
                    label="Symptoms"
                />
            </div>

            <div className="result-section">
                <h3>Diagnosis</h3>
                <p>{sections.diagnosis}</p>
                <SpeechButton 
                    text={sections.diagnosis} 
                    label="Diagnosis"
                />
            </div>

            <div className="result-section">
                <h3>Severity Level</h3>
                <p>{sections.severity}</p>
                <SpeechButton 
                    text={sections.severity} 
                    label="Severity"
                />
            </div>

            <div className="result-section">
                <h3>Treatment Recommendations</h3>
                <p>{sections.treatment}</p>
                <SpeechButton 
                    text={sections.treatment} 
                    label="Treatment"
                />
            </div>

            <div className="result-section">
                <h3>Recommended Specialist</h3>
                <p>{sections.specialist}</p>
                <SpeechButton 
                    text={sections.specialist} 
                    label="Specialist"
                />
            </div>

            <div className="result-section">
                <SpeechButton 
                    text={results} 
                    label="Complete Analysis"
                />
            </div>
        </div>
    );
};

export default AnalysisResults; 