import axios from 'axios';
import https from 'https';

const api = axios.create({
    baseURL: 'http://localhost:3333/',
    httpsAgent: new https.Agent({  
        rejectUnauthorized: false
    })
})

export default api;