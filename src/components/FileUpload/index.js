import { Component } from 'react';
import './index.css';

class FileUpload extends Component {
  state = {
    selectedFile: null,
    selectedLanguage: 'english',
    analysis: '',
    isLoading: false,
    error: null,
    progress: ''
  };

  handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        this.setState({ 
          error: 'Please upload a PDF or image file (JPEG/PNG)',
          selectedFile: null 
        });
        event.target.value = ''; // Reset file input
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        this.setState({ 
          error: 'File size should be less than 10MB',
          selectedFile: null 
        });
        event.target.value = ''; // Reset file input
        return;
      }

      this.setState({ 
        selectedFile: file,
        error: null,
        analysis: '',
        progress: ''
      });
    }
  };

  handleLanguageChange = (event) => {
    this.setState({ selectedLanguage: event.target.value });
  };

  updateProgress = (message) => {
    this.setState({ progress: message });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { selectedFile, selectedLanguage } = this.state;

    if (!selectedFile) {
      this.setState({ error: 'Please select a file' });
      return;
    }

    this.setState({ 
      isLoading: true, 
      error: null,
      progress: 'Uploading file...'
    });

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('language', selectedLanguage);

    try {
      this.updateProgress('Processing file...');
      
      const response = await fetch('http://localhost:3005/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      if (!data.success) {
        throw new Error(data.error || 'Processing failed');
      }

      this.setState({ 
        analysis: data.formattedOutput,
        isLoading: false,
        progress: ''
      });

    } catch (error) {
      console.error('Upload error:', error);
      this.setState({ 
        error: error.message || 'Error processing file. Please try again.',
        isLoading: false,
        progress: ''
      });
    }
  };

  render() {
    const { 
      selectedLanguage, 
      analysis, 
      isLoading, 
      error, 
      progress 
    } = this.state;

    return (
      <div className="upload-container">
        <h2>Upload Medical Report</h2>
        <form onSubmit={this.handleSubmit} className="upload-form">
          <div className="form-group">
            <label htmlFor="file">Select File (PDF or Image):</label>
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
            className="submit-button"
            disabled={isLoading || !this.state.selectedFile}
          >
            {isLoading ? 'Processing...' : 'Analyze Report'}
          </button>
        </form>

        {progress && (
          <div className="progress-message">
            {progress}
          </div>
        )}

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

export default FileUpload; 