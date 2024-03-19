import { useEffect, useState } from 'react';
import { WizardsResponseType, getWizards } from '../services/wizardsService';

const useWizardsData = () => {
	const [wizardsData, setWizardsData] = useState<WizardsResponseType[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchWizardsData = async () => {
			setIsLoading(true);
			try {
				const data = await getWizards();
				setWizardsData(data);
			} catch (error) {
				console.error('Failed to fetch wizards data', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchWizardsData();
	}, []);

	const findWizardById = (id: string) => wizardsData.find((wizard) => wizard.id === id);

	return { wizardsData, findWizardById, isLoading };
};

export default useWizardsData;
