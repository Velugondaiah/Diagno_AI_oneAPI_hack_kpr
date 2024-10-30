import { Component } from 'react';
import './index.css';

class ReportAnalysis extends Component {
  state = {
    selectedFile: null,
    selectedLanguage: 'english',
    analysis: '',
    isLoading: false,
    error: null
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
      const response = await fetch('http://localhost:3005/analyze-report', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      this.setState({ 
        analysis: data.formattedOutput,
        isLoading: false 
      });
    } catch (error) {
      console.error('Analysis error:', error);
      this.setState({ 
        error: error.message || 'Error analyzing report',
        isLoading: false 
      });
    }
  };

  render() {
    const { selectedLanguage, analysis, isLoading, error } = this.state;

    return (
      <div className="analysis-container">
        <h2>Medical Report Analysis</h2>
        <form onSubmit={this.handleSubmit} className="analysis-form">
          <div className="form-group">
            <label htmlFor="file">Upload Medical Report (PDF/Image):</label>
            <input
              type="file"
              id="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={this.handleFileChange}
              className="file-input"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="language">Select Language:</label>
            <select
              id="language"
              value={selectedLanguage}
              onChange={this.handleLanguageChange}
              className="language-select"
              disabled={isLoading}
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
          </div>
        )}
      </div>
    );
  }
}

export default ReportAnalysis; 