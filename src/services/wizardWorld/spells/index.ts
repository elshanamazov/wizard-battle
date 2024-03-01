import apiClient from '../../apiService';
import { Spells } from '../types';

export const fetchSpells = async (): Promise<Spells[]> => {
	const response = await apiClient.get('/spells');
	return response.data;
};
