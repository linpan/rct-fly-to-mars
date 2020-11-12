import axios from 'axios'


axios.defaults.timeout = 4000

axios.defaults.baseURL = 'http://39.98.127.31:8000';
// axios.defaults.headers.common['api_id'] = '1';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default axios
