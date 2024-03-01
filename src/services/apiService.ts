import axios from 'axios';

const apiClient = axios.create({
	baseURL: 'https://wizard-world-api.herokuapp.com',
	headers: {
		'Content-Type': 'application/json',
	},
});

export default apiClient;
