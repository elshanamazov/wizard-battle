import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import WizardCard from '../../components/WizardCard/WizardCard';
import useLocalStorage from '../../hooks/useLocalStorage';
import { SelectedDuelists } from '../selectedDuelists';
import styles from './AutoSelection.module.scss';

const wizards = [
	{ id: 1, name: 'Harry Potter' },
	{ id: 2, name: 'Hermione Granger' },
	{ id: 3, name: 'Ron Weasley' },
	{ id: 4, name: 'Albus Dumbledore' },
	{ id: 5, name: 'Severus Snape' },
	{ id: 6, name: 'Voldemort' },
	{ id: 7, name: 'Sirius Black' },
	{ id: 8, name: 'Draco Malfoy' },
	{ id: 9, name: 'Rubeus Hagrid' },
	{ id: 10, name: 'Minerva McGonagall' },
	{ id: 11, name: 'Bellatrix Lestrange' },
	{ id: 12, name: 'Luna Lovegood' },
];

const AutoSelection = () => {
	const [isModalOpen, setModalIsOpen] = useState(false);
	const [isSearching, setIsSearching] = useState(false);
	const [leftOpponent, setLeftOpponent] = useState('Harry Potter');
	const [rightOpponent, setRightOpponent] = useState('Voldemort');
	const navigate = useNavigate();
	const [selectedWizard, setSelectedWizard] = useLocalStorage<SelectedDuelists>(
		'autoSelectedState',
		{
			firstDuelist: null,
			secondDuelist: null,
		},
	);

	const getRandomWizard = () => {
		const indexOfWizards = Math.floor(Math.random() * wizards.length);
		return wizards[indexOfWizards];
	};

	const modalCloseHandler = () => {
		setModalIsOpen(false);
	};
	const modalOpenHandler = () => {
		setModalIsOpen(true);
	};

	const handleSearch = () => {
		setIsSearching(true);
		const searchInterval = setInterval(() => {
			const leftWizard = getRandomWizard();
			const rightWizard = getRandomWizard();
			setLeftOpponent(leftWizard.name);
			setRightOpponent(rightWizard.name);

			setSelectedWizard({
				firstDuelist: {
					id: leftWizard.id,
					name: leftWizard.name,
				},
				secondDuelist: {
					id: rightWizard.id,
					name: rightWizard.name,
				},
			});
		}, 1000);

		setTimeout(() => {
			clearInterval(searchInterval);
			setIsSearching(false);
		}, 5000);
	};

	const updateDuelists = () => {
		const findWizardById = (id: number) => wizards.find((wizard) => wizard.id === id);

		if (selectedWizard.firstDuelist === null || selectedWizard.secondDuelist === null) return;

		const leftWizard = findWizardById(selectedWizard.firstDuelist?.id);
		const rightWizard = findWizardById(selectedWizard.secondDuelist?.id);

		if (leftWizard && rightWizard) {
			setLeftOpponent(leftWizard.name);
			setRightOpponent(rightWizard.name);
		}

		localStorage.setItem('selectionMethod', 'auto');
	};

	const handleDuelSelectPage = () => {
		navigate('/duel');
	};

	useEffect(() => {
		updateDuelists();
	}, []);

	return (
		<section className="pt-100">
			<h2 className="title">Auto selection of opponents</h2>
			<div className={styles.auto__wrapper}>
				<WizardCard name={leftOpponent} healthPoints={100} mannaPoints={100} />
				<div className={styles.auto__cta}>
					<Button label="Search" onClick={handleSearch} disabled={isSearching} />
					<Button label="To fight!" onClick={modalOpenHandler} disabled={isSearching} />
				</div>
				<WizardCard name={rightOpponent} healthPoints={100} mannaPoints={100} />
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
