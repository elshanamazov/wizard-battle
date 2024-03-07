import { useEffect, useState } from 'react';
import { SelectedDuelists } from '../../containers/selectedDuelists';
import useLocalStorage from '../../hooks/useLocalStorage';
import useWizardsData from '../../hooks/useWizardsData';
import Modal from '../UI/Modal/Modal';
import styles from './Duel.module.scss';
import DuelCard from './DuelCard/DuelCard';
import DuelPotion from './DuelPotion/DuelPotion';
import DuelSpell from './DuelSpell/DuelSpell';

const Duel = () => {
	const selectionMethod: string | null = localStorage.getItem('selectionMethod');
	const [selectedWizards] = useLocalStorage<SelectedDuelists | null>(
		`${selectionMethod === 'auto' ? 'autoSelectedState' : 'manualSelectedState'}`,
		null,
	);
	const { findWizardById } = useWizardsData();
	const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
	const [activePlayerId, setActivePlayerId] = useState<string | undefined>('');
	const [modalText, setModalText] = useState<string>('');

	const firstWizardDetails = selectedWizards?.firstDuelist
		? findWizardById(selectedWizards.firstDuelist.id)
		: null;
	const secondWizardDetails = selectedWizards?.secondDuelist
		? findWizardById(selectedWizards.secondDuelist.id)
		: null;

	const modalHandler = (): void => {
		setIsModalOpen(!isModalOpen);
	};

	useEffect((): void => {
		const activeWizardId =
			Math.random() < 0.5 ? selectedWizards?.firstDuelist?.id : selectedWizards?.secondDuelist?.id;
		setActivePlayerId(activeWizardId);

		const activeWizardName =
			activeWizardId === selectedWizards?.firstDuelist?.id
				? selectedWizards?.firstDuelist?.name
				: selectedWizards?.secondDuelist?.name;

		setModalText(
			`At the beginning of the duel, it is randomly determined that ${activeWizardName} will go first.`,
		);
	}, [selectedWizards, firstWizardDetails, secondWizardDetails]);

	return (
		<>
			{isModalOpen && <Modal text={modalText} isOpen={true} onClose={modalHandler} />}
			<section className={`pt-100`}>
				<h2 className="title">Duel </h2>
				<div className={styles.duel__wrap}>
					<div
						className={`${styles.duel__panel} ${
							activePlayerId === selectedWizards?.firstDuelist?.id
								? ''
								: styles.duel__panel_disabled
						}`}>
						<div className={styles.duel__header}>
							<div className={styles.duel__potions}>
								<DuelPotion />
							</div>
							<DuelCard
								name={selectedWizards?.firstDuelist?.name}
								health={100}
								mana={100}
								imagePath={firstWizardDetails?.imagePath}
							/>
						</div>
						<div className={styles.duel__spells}>
							<DuelSpell name="False memory spell" damage={33} manaCost="22" />
							<DuelSpell name="Shield penetration spell" damage={33} manaCost="22" />
							<DuelSpell name="Shooting spell" damage={33} manaCost="22" />
							<DuelSpell name="Engorgio Skullus" damage={33} manaCost="22" />
						</div>
					</div>
					<div className={styles.duel__points}>
						<span>Turn points:</span> 10 / 10
					</div>
					<div
						className={`${styles.duel__panel} ${
							activePlayerId === selectedWizards?.secondDuelist?.id
								? ''
								: styles.duel__panel_disabled
						}`}>
						<div className={`${styles.duel__header} ${styles.duel__header_reverse}`}>
							<div className={styles.duel__potions}>
								<DuelPotion />
							</div>
							<DuelCard
								name={selectedWizards?.secondDuelist?.name}
								health={100}
								mana={100}
								reverse={true}
								imagePath={secondWizardDetails?.imagePath}
							/>
						</div>
						<div className={styles.duel__spells}>
							<DuelSpell name="False memory spell" damage={33} manaCost="22" />
							<DuelSpell name="Shield penetration spell" damage={33} manaCost="22" />
							<DuelSpell name="Shooting spell" damage={33} manaCost="22" />
							<DuelSpell name="Engorgio Skullus" damage={33} manaCost="22" />
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Duel;
