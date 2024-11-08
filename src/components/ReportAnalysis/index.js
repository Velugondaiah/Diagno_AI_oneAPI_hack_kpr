import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './index.css';

class ReportAnalysis extends Component {
  state = {
    selectedFile: null,
    selectedLanguage: 'english',
    analysis: '',
    isLoading: false,
    error: null,
    recommendedSpecialist: null
  };

  handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) {
        this.setState({ 
          error: 'Please upload a PDF or image file (JPEG/PNG)',
          selectedFile: null 
        });
        event.target.value = '';
        return;
      }

      this.setState({ 
        selectedFile: file,
        error: null,
        analysis: ''
      });
    }
  };

  handleLanguageChange = (event) => {
    this.setState({ selectedLanguage: event.target.value });
  };

  handleBookAppointment = (specialist) => {
    this.props.history.push({
      pathname: '/appointments',
      search: `?specialist=${encodeURIComponent(specialist)}`
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { selectedFile, selectedLanguage } = this.state;

    if (!selectedFile) {
      this.setState({ error: 'Please select a file' });
      return;
    }

    this.setState({ isLoading: true, error: null });

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('language', selectedLanguage);

    try {
      const response = await fetch('http://localhost:3008/analyze-report', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        // Extract specialist from the analysis
        const specialistMatch = data.analysis.match(/Recommended Specialist:\s*([^\n]+)/);
        const specialist = specialistMatch ? specialistMatch[1].trim() : null;

        this.setState({
          analysis: data.analysis,
          recommendedSpecialist: specialist,
          isLoading: false
        });
      } else {
        throw new Error(data.error || 'Failed to analyze report');
      }
    } catch (error) {
      this.setState({
        error: error.message || 'Failed to analyze report',
        isLoading: false
      });
    }
  };

  render() {
    const { selectedLanguage, analysis, isLoading, error, recommendedSpecialist } = this.state;

    return (
      <div className="report-analysis-container">
        <h1>Medical Report Analysis</h1>
        <form onSubmit={this.handleSubmit} className="analysis-form">
          <div className="file-input-container">
            <label htmlFor="report-file">Upload Medical Report</label>
            <input
              type="file"
              id="report-file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={this.handleFileChange}
            />
          </div>

          <div className="language-select-container">
            <label htmlFor="language">Select Language:</label>
            <select
              id="language"
              value={selectedLanguage}
              onChange={this.handleLanguageChange}
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
            className="analyze-button"
            disabled={isLoading || !this.state.selectedFile}
          >
            {isLoading ? 'Analyzing...' : 'Analyze Report'}
          </button>
        </form>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {analysis && (
          <div className="analysis-result">
            <h3>Analysis Result:</h3>
            <pre>{analysis}</pre>
            
            {recommendedSpecialist && (
              <div className="specialist-recommendation">
                <h3>Recommended Specialist: {recommendedSpecialist}</h3>
                <button 
                  onClick={() => this.handleBookAppointment(recommendedSpecialist)}
                  className="book-appointment-btn"
                >
                  Book Appointment with {recommendedSpecialist}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(ReportAnalysis); 