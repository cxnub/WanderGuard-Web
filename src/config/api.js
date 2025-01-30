import axios from 'axios';
import Cookies from 'js-cookie';

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: 'https://wwy1iijz6i.execute-api.us-east-1.amazonaws.com/dev',
  transformRequest: [
    (data, headers) => {
      let token = Cookies.get('token');

      if (token) {
        token = JSON.parse(token);
        headers['Authorization'] = `${token}`;
      };
      return JSON.stringify(data);
    }
  ],
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;