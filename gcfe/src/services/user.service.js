import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/api/v0/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    // return axios.get(API_URL + 'admin', { headers: authHeader() });
    return this.getAllUsers()
  }

  getAllUsers() {
      console.log('getting all users')
      return axios.get(API_URL + 'allusers', { headers: authHeader() })
  }
}

export default new UserService();