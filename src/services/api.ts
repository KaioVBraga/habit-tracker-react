import axios from 'axios';
import https from 'https';

const api = axios.create({
    // baseURL: 'http://localhost:3333/',
    baseURL: 'https://12c32b6b59c5.ngrok.io',
    httpsAgent: new https.Agent({  
        rejectUnauthorized: false
    })
})

export default api;