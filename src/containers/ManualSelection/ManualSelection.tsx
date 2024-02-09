import { useRef, useState } from 'react';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import Slider from '../../components/UI/Slider/Slider';
import useLocalStorage from '../../hooks/useLocalStorage';
import { SelectedDuelistsId } from '../selectedDuelists';
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
	const [selectedWizards, setSelectedWizards] = useLocalStorage<SelectedDuelistsId>(
		'manualSelectedState',
		{ firstDuelistId: null, secondDuelistId: null },
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

	const handleWizardSelect =
		(position: 'firstDuelistId' | 'secondDuelistId') => (wizardId: number) => {
			setSelectedWizards((prev) => ({
				...prev,
				[position]: wizardId,
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
					alert('The Fight Started!');
					return countDown;
				}
				return countDown - 1;
			});
		}, 1000);
	};

	return (
		<section className="pt-100">
			<h2 className="title">Manual selection of opponents</h2>
			<div className={styles.manual__wrapper}>
				<Slider
					slides={wizardSlides}
					onSelect={handleWizardSelect('firstDuelistId')}
					activeIndex={wizardsData.findIndex(
						(wizard) => wizard.id === selectedWizards.firstDuelistId,
					)}
				/>
				<Button label="To Fight!" onClick={startCounter} />
				<Slider
					slides={wizardSlides}
					onSelect={handleWizardSelect('secondDuelistId')}
					activeIndex={wizardsData.findIndex(
						(wizard) => wizard.id === selectedWizards.secondDuelistId,
					)}
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
