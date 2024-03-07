// hooks/useWizardsData.js
import { useEffect, useState } from 'react';
import { WizardsResponseType, getWizards } from '../services/wizardsService';

const useWizardsData = () => {
	const [wizardsData, setWizardsData] = useState<WizardsResponseType[]>([]);

	useEffect(() => {
		const fetchWizardsData = async () => {
			try {
				const data = await getWizards();
				setWizardsData(data);
			} catch (error) {
				console.error('Failed to fetch wizards data', error);
			}
		};

		fetchWizardsData();
	}, []);

	const findWizardById = (id: string) => wizardsData.find((wizard) => wizard.id === id);

	return { wizardsData, findWizardById };
};

export default useWizardsData;
