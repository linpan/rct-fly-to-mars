import axios from 'axios'

axios.defaults.timeout = 4000

axios.defaults.baseURL = 'http://localhost:8000/v1/'
// axios.defaults.headers.common['api_id'] = '1';
// axios.defaults.headers.post['Content-Type'] = 'application/json'

export default axios
