import axios from 'axios';
class AuthService {
  login(email, password) {
    console.log(process.env.NODE_ENV)
    return axios
      .post(process.env.REACT_APP_API_URL + 'users/login', {
        email,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem('user');
  }
  register(email, password) {
    return axios.post(process.env.REACT_APP_API_URL + 'users/signup', {
      email,
      password,
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}
export default new AuthService();
