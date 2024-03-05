import { imagesForWizardsApi } from '../config/imagesForWizardsApi';
import apiClient from './apiService';

export type WizardsResponseType = {
	id: string;
	firstName: string;
	lastName: string;
	imagePath?: string;
};

export const getWizards = async (): Promise<WizardsResponseType[]> => {
	const response = await apiClient.get('/wizards');

	const namesToExcludeFromResponse = [
		'Mrs Skower',
		'Erica',
		'tainwright',
		'Baruffio',
		'Dr Ubbly',
		'Tugwood',
	];

	const filteredResponseData = response.data
		.filter(
			(wizard: WizardsResponseType) =>
				!namesToExcludeFromResponse.includes(wizard.firstName) &&
				!namesToExcludeFromResponse.includes(wizard.lastName),
		)
		.map((wizard: WizardsResponseType) => ({
			id: wizard.id,
			firstName: wizard.firstName ?? '',
			lastName: wizard.lastName ?? '',
			imagePath: imagesForWizardsApi[`${wizard.firstName} ${wizard.lastName}`] ?? '',
		}));

	return filteredResponseData;
};
