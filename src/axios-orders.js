import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://react-burger-62143.firebaseio.com/'
})

export default instance;