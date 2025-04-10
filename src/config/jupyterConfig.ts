
// Configuration for Jupyter connection
// Update these values to match your Jupyter notebook server

export const jupyterConfig = {
  // Base URL of your Jupyter notebook server
  baseUrl: 'http://localhost:8888',
  
  // API endpoint for the chatbot
  endpoint: '/api/chatbot',
  
  // Connection timeout in milliseconds
  timeout: 10000,
};

// Export the full API URL
export const JUPYTER_API_URL = `${jupyterConfig.baseUrl}${jupyterConfig.endpoint}`;
