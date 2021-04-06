import axios from "axios";
import https from "https";

export const api = axios.create({
  baseURL: "https://kaio-giulia-habit-tracker-api.herokuapp.com/",
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

// export const api = axios.create({
//   baseURL: "http://localhost:3333/",
//   httpsAgent: new https.Agent({
//     rejectUnauthorized: false,
//   }),
// });

// export const local = axios.create({
//     baseURL: 'http://localhost:3333/',
//     httpsAgent: new https.Agent({
//         rejectUnauthorized: false
//     })
// })

export default api;
