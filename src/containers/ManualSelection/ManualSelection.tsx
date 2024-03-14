import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import SkeletonLoader from '../../components/UI/Skeleton/Skeleton';
import Slider from '../../components/UI/Slider/Slider';
import useLocalStorage from '../../hooks/useLocalStorage';
import useWizardsData from '../../hooks/useWizardsData';
import { SelectedDuelists } from '../selectedDuelists';
import styles from './ManualSelection.module.scss';

type Slide = {
	id: string;
	content: JSX.Element;
};

const ManualSelection = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [counter, setCounter] = useState<number>(3);
	const intervalRef = useRef<number | null>(null);
	const navigate = useNavigate();
	const { wizardsData, findWizardById, isLoading } = useWizardsData();
	const [selectedWizards, setSelectedWizards] = useLocalStorage<SelectedDuelists | null>(
		'manualSelectedState',
		null,
	);

	const wizardSlides = wizardsData?.map(
		(wizardSlide): Slide => ({
			id: wizardSlide.id,
			content: (
				<>
					<img
						className={styles.manual__img}
						src={wizardSlide.imagePath}
						alt={`${wizardSlide.firstName} ${wizardSlide.lastName}`}
					/>
					<h3 className={styles.manual__label}>
						{wizardSlide.firstName} {wizardSlide.lastName}
					</h3>
				</>
			),
		}),
	);

	const generateSkeletonSlides = (): Slide[] => {
		const slides = [];
		for (let i = 0; i < wizardSlides.length; i++) {
			slides.push({
				id: `skeleton-${i}`,
				content: <SkeletonLoader key={`skeleton-${i}`} width={360} height={320} />,
			});
		}
		return slides;
	};

	function closeModal(): void {
		setIsModalOpen(false);
		if (intervalRef.current !== null) {
			clearInterval(intervalRef.current);
		}
	}

	const handleWizardSelect = (position: 'firstDuelist' | 'secondDuelist') => (wizardId: string) => {
		const wizardInfo = findWizardById(wizardId);
		if (!wizardInfo) return;

		setSelectedWizards((prev) => ({
			...(prev ?? { firstDuelist: null, secondDuelist: null }),
			[position]: { id: wizardInfo.id, name: `${wizardInfo.firstName} ${wizardInfo.lastName}` },
		}));
	};

	const startCounter = (): void => {
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

	const getWizardIndexById = (wizardId: string | undefined): number => {
		return wizardsData.findIndex((wizard) => wizard.id === wizardId);
	};

	useEffect((): void => {
		localStorage.setItem('selectionMethod', 'manual');
	}, []);

	useEffect((): void => {
		if (counter === 0) {
			navigate('/duel');
		}
	}, [counter, navigate]);

	return (
		<section className="pt-100">
			<h2 className="title">Manual selection of opponents</h2>
			<p className="desc">Choose your opponent for a wizard duel</p>
			<div className={styles.manual__wrapper}>
				{isLoading ? (
					<Slider slides={generateSkeletonSlides()} activeIndex={0} />
				) : (
					<Slider
						slides={wizardSlides}
						onSelect={handleWizardSelect('firstDuelist')}
						activeIndex={getWizardIndexById(selectedWizards?.firstDuelist?.id)}
					/>
				)}
				<Button label="To Fight!" onClick={startCounter} />
				{isLoading ? (
					<Slider slides={generateSkeletonSlides()} activeIndex={0} />
				) : (
					<Slider
						slides={wizardSlides}
						onSelect={handleWizardSelect('secondDuelist')}
						activeIndex={getWizardIndexById(selectedWizards?.secondDuelist?.id)}
					/>
				)}
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
