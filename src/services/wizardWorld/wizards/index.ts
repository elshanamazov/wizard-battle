import apiClient from '../../apiService';
import { Wizards } from '../types';

export const fetchWizards = async (): Promise<Wizards[]> => {
	const response = await apiClient.get('/wizards');
	return response.data;
};
