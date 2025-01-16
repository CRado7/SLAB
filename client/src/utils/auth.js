import decode from 'jwt-decode';

class AuthService {
    getProfile() {
        try {
            const token = this.getToken();
            return token ? decode(token) : null;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }

    loggedIn() {
      const token = this.getToken();
      console.log('Checking if logged in. Token:', token);
      if (!token) {
          console.log('No token found');
          return false;
      }
      const isExpired = this.isTokenExpired(token);
      console.log('Token expired:', isExpired);
      return !isExpired;
  }  

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                this.logout(); // Consistently clear token when expired
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error decoding token for expiration check:', error);
            this.logout();
            return true;
        }
    }

    getToken() {
        return localStorage.getItem('id_token');
    }

    login(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    logout() {
        localStorage.removeItem('id_token');
        window.location.href = '/'; // Use direct navigation instead of reload
    }
}

export default new AuthService();
