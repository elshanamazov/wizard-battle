import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import Slider from '../../components/UI/Slider/Slider';
import useLocalStorage from '../../hooks/useLocalStorage';
import { SelectedDuelists } from '../selectedDuelists';
import styles from './ManualSelection.module.scss';

const wizardsData = [
	{ id: 1, name: 'Hermione Granger', imagePath: '/wizard-battle/pic_1.jpeg' },
	{ id: 2, name: 'Draco Malfoy', imagePath: '/wizard-battle/pic_2.jpeg' },
	{ id: 3, name: 'Harry Potter', imagePath: '/wizard-battle/pic_3.jpeg' },
	{ id: 4, name: 'Death Eater', imagePath: '/wizard-battle/pic_4.jpeg' },
	{ id: 5, name: 'Dumbledore', imagePath: '/wizard-battle/pic_5.jpeg' },
	{ id: 6, name: 'Hagrid', imagePath: '/wizard-battle/pic_6.jpeg' },
];

const ManualSelection = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [counter, setCounter] = useState(3);
	const intervalRef = useRef<number | null>(null);
	const navigate = useNavigate();
	const [selectedWizards, setSelectedWizards] = useLocalStorage<SelectedDuelists>(
		'manualSelectedState',
		{ firstDuelist: null, secondDuelist: null },
	);

	const wizardSlides = wizardsData.map((wizardSlide) => ({
		id: wizardSlide.id,
		content: (
			<>
				<img className={styles.manual__img} src={wizardSlide.imagePath} alt={wizardSlide.name} />
				<h3 className={styles.manual__label}>{wizardSlide.name}</h3>
			</>
		),
	}));

	const closeModal = () => {
		setIsModalOpen(false);
		if (intervalRef.current !== null) {
			clearInterval(intervalRef.current);
		}
	};

	const handleWizardSelect = (position: 'firstDuelist' | 'secondDuelist') => (wizardId: number) => {
		const wizardInfo = wizardsData.find((wizard) => wizard.id === wizardId);
		if (!wizardInfo) return;

		setSelectedWizards((prev) => ({
			...prev,
			[position]: { id: wizardInfo.id, name: wizardInfo.name },
		}));
	};

	const startCounter = () => {
		setCounter(3);
		setIsModalOpen(true);

		if (intervalRef.current !== null) {
			clearInterval(intervalRef.current);
		}

		intervalRef.current = setInterval(() => {
			setCounter((countDown) => {
				if (countDown === 0) {
					clearInterval(intervalRef.current as number);

					return countDown;
				}
				return countDown - 1;
			});
		}, 1000);
	};

	const getWizardIndexById = (wizardId: number | undefined) => {
		return wizardsData.findIndex((wizard) => wizard.id === wizardId);
	};

	useEffect(() => {
		localStorage.setItem('selectionMethod', 'manual');
	}, []);

	useEffect(() => {
		if (counter === 0) {
			navigate('/duel');
		}
	}, [counter, navigate]);

	return (
		<section className="pt-100">
			<h2 className="title">Manual selection of opponents</h2>
			<div className={styles.manual__wrapper}>
				<Slider
					slides={wizardSlides}
					onSelect={handleWizardSelect('firstDuelist')}
					activeIndex={getWizardIndexById(selectedWizards.firstDuelist?.id)}
				/>
				<Button label="To Fight!" onClick={startCounter} />
				<Slider
					slides={wizardSlides}
					onSelect={handleWizardSelect('secondDuelist')}
					activeIndex={getWizardIndexById(selectedWizards.secondDuelist?.id)}
				/>
			</div>
			{isModalOpen && (
				<Modal
					text={`The fight will start in... `}
					textCustomClass={styles.manual__text}
					onClose={closeModal}
					isOpen={isModalOpen}>
					<span className={styles.manual__counter}>{counter}</span>
					<Button label="I changed my mind" onClick={closeModal} />
				</Modal>
			)}
		</section>
	);
};

export default ManualSelection;
