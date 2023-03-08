import axios from "axios";
let URL_BASE = process.env.REACT_APP_API_URL;

export default axios.create({
   baseURL: URL_BASE,
   headers: {
      'Content-Type': 'application/json'
   }
});

/*export const axiosToken = axios.create({
   baseURL: URL_BASE,
   headers: { 'Content-Type': 'application/json' },
});*/