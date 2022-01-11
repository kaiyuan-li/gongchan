import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v0/auth/';

class AuthService {
  async login(user) {
    const res = await axios
      .post(API_URL + 'signin', {
        username: user.username,
        password: user.password
      })
      return res.data
  }

  logout() {
    localStorage.removeItem('user');
  }

  async register(user) {
    const res = await axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password,
      roles: ['user'],
    });
    console.log('response for signup: ' + JSON.stringify(res))
    return res.data
  }
}

export default new AuthService();
