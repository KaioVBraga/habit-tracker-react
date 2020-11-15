import axios from 'axios';
import https from 'https';

const api = axios.create({
    baseURL: 'http://192.168.1.105:3333/',
    // baseURL: 'http://localhost:3333/',
    // baseURL: 'https://1cfff48fefc8.ngrok.io',
    httpsAgent: new https.Agent({  
        rejectUnauthorized: false
    })
})

export default api;