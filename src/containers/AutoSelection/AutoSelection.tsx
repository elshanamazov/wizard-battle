import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import WizardCard from '../../components/WizardCard/WizardCard';
import useLocalStorage from '../../hooks/useLocalStorage';
import { WizardsResponseType, getWizards } from '../../services/wizardsService';
import { SelectedDuelists } from '../selectedDuelists';
import styles from './AutoSelection.module.scss';

const AutoSelection = () => {
	const [isModalOpen, setModalIsOpen] = useState<boolean>(false);
	const [isSearching, setIsSearching] = useState<boolean>(false);
	const navigate = useNavigate();
	const [wizardsData, setWizardsData] = useState<WizardsResponseType[]>([]);
	const [selectedWizards, setSelectedWizards] = useLocalStorage<SelectedDuelists | null>(
		'autoSelectedState',
		null,
	);

	const findWizardById = (id: string | undefined) => wizardsData.find((wizard) => wizard.id === id);

	const leftWizardDetails = findWizardById(selectedWizards?.firstDuelist?.id);
	const rightWizardDetails = findWizardById(selectedWizards?.secondDuelist?.id);

	const modalCloseHandler = (): void => {
		setModalIsOpen(false);
	};
	const modalOpenHandler = (): void => {
		setModalIsOpen(true);
	};

	const getRandomWizard = () => {
		const indexOfWizards = Math.floor(Math.random() * wizardsData.length);
		return wizardsData[indexOfWizards];
	};

	const handleSearch = (): void => {
		setIsSearching(true);
		const searchInterval = setInterval(() => {
			const leftWizard = getRandomWizard();
			const rightWizard = getRandomWizard();

			setSelectedWizards({
				firstDuelist: {
					id: leftWizard.id,
					name: `${leftWizard.firstName} ${leftWizard.lastName}`,
				},
				secondDuelist: {
					id: rightWizard.id,
					name: `${rightWizard.firstName} ${rightWizard.lastName}`,
				},
			});
		}, 1000);

		setTimeout(() => {
			clearInterval(searchInterval);
			setIsSearching(false);
		}, 5000);
	};

	const handleDuelSelectPage = (): void => {
		navigate('/duel');
	};

	useEffect((): void => {
		const wizards = async () => {
			try {
				const wizardsData = await getWizards();
				setWizardsData(wizardsData);
			} catch (error) {
				console.log(error);
			}
		};

		wizards();
	}, []);

	return (
		<section className="pt-100">
			<h2 className="title">Auto selection of opponents</h2>
			<div className={styles.auto__wrapper}>
				<WizardCard
					name={`${leftWizardDetails?.firstName} ${leftWizardDetails?.lastName}`}
					healthPoints={100}
					mannaPoints={100}
					imagePath={leftWizardDetails?.imagePath}
				/>
				<div className={styles.auto__cta}>
					<Button label="Search" onClick={handleSearch} disabled={isSearching} />
					<Button label="To fight!" onClick={modalOpenHandler} disabled={isSearching} />
				</div>
				<WizardCard
					name={`${rightWizardDetails?.firstName} ${rightWizardDetails?.lastName}`}
					healthPoints={100}
					mannaPoints={100}
					imagePath={rightWizardDetails?.imagePath}
				/>
				<Modal
					text="Do you confirm your choice of characters?"
					textCustomClass={styles.auto__text}
					onClose={modalCloseHandler}
					isOpen={isModalOpen}>
					<div className={`${styles.auto__cta} ${styles.auto__cta_modify}`}>
						<Button label="Confirm" onClick={handleDuelSelectPage} />
						<Button label="Cancel" onClick={modalCloseHandler} />
					</div>
				</Modal>
			</div>
		</section>
	);
};

export default AutoSelection;
