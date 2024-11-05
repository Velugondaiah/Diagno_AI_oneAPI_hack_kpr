import React, { Component } from 'react';
import axios from 'axios';

class UploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      language: 'en', // Default language is English
      response: ''
    };
  }

  handleFileChange = (e) => {
    this.setState({ file: e.target.files[0] });
  };

  handleInputChange = (e) => {
    this.setState({ language: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.file);
    formData.append('language', this.state.language);

    try {
      const res = await axios.post('http://localhost:3008/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      this.setState({ response: res.data.translatedOutput });
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="file" onChange={this.handleFileChange} required />
          <select value={this.state.language} onChange={this.handleInputChange}>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            {/* Add more languages as needed */}
          </select>
          <button type="submit">Upload</button>
        </form>
        {this.state.response && (
          <div>
            <h3>Translated Text:</h3>
            <p>{this.state.response}</p>
          </div>
        )}
      </div>
    );
  }
}

export default UploadForm;
