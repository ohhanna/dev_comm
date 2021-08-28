import axios from 'axios'

class AuthenticationService {
    // send username, password to the SERVER
    executeJwtAuthenticationService(username, password) {
        return axios.post('http://localhost:8080/authenticate', {
            username,
            password
        });
    }

    executeHelloService() {
        return axios.get('http://localhost:8090/hello');        
    }

    registerSuccessfulLoginForJwt(username, token, auth) {
        console.log("===Register Login User===")

        localStorage.setItem('authenticatedUser', username);
        localStorage.setItem('token', token);
        localStorage.setItem('auth', auth);

        this.setupAxiosInterceptors();
    }

    createJWTToken(token) {
        return 'Bearer ' + token
    }

    setupAxiosInterceptors() {
        axios.interceptors.request.use(
            config => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers['Authorization'] = 'Bearer ' + token;
                }
                config.headers['Content-Type'] = 'application/json';
                return config;
            },
            error => {
                Promise.reject(error)
            });
    }

    logout() {
        localStorage.removeItem("authenticatedUser");
        localStorage.removeItem("token");
        localStorage.removeItem("auth");
    }

    isUserLoggedIn() {
        const token = localStorage.getItem('token');

        if (token) {
            return true;
        }
        
        return false;
    }

    getLoggedInUserName() {
        //let user = sessionStorage.getItem('authenticatedUser')
        let user = localStorage.getItem('authenticatedUser');
        if(user===null) return '';
        return user;
    }

    getLoggedInUserAuth(){
        let userAuth = localStorage.getItem('auth');
        if(userAuth===null) return '';
        return userAuth;
    }
}

export default new AuthenticationService()