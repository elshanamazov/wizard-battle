import { useEffect, useState } from 'react';
import arrowIcon from '../../assets/icons/arrow.svg';
import { SelectedDuelists } from '../../containers/selectedDuelists';
import useLocalStorage from '../../hooks/useLocalStorage';
import useWizardsData from '../../hooks/useWizardsData';
import { SpellsResponseType, getSpells } from '../../services/spellsServices';
import SkeletonLoader from '../UI/Skeleton/Skeleton';
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
	const { findWizardById, isLoading } = useWizardsData();
	const [isSpellsLoading, setIsSpellsLoading] = useState<boolean>(true);
	const [spells, setSpells] = useState<SpellsResponseType[]>([]);
	const [activePlayerId, setActivePlayerId] = useState<string | undefined>('');

	const firstWizardDetails = selectedWizards?.firstDuelist
		? findWizardById(selectedWizards.firstDuelist.id)
		: null;
	const secondWizardDetails = selectedWizards?.secondDuelist
		? findWizardById(selectedWizards.secondDuelist.id)
		: null;

	const getRandomInt = (min: number, max: number): number => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	useEffect((): void => {
		const activeWizardId =
			Math.random() < 0.5 ? selectedWizards?.firstDuelist?.id : selectedWizards?.secondDuelist?.id;
		setActivePlayerId(activeWizardId);
	}, [selectedWizards]);

	useEffect((): void => {
		const loadSpells = async () => {
			setIsSpellsLoading(true);
			try {
				const spellsData = await getSpells();
				setSpells(spellsData);
			} catch (error) {
				console.error('Failed to fetch spells', error);
			} finally {
				setIsSpellsLoading(false);
			}
		};

		loadSpells();
	}, []);

	return (
		<section className={`pt-100`}>
			<h2 className="title">Duel </h2>
			<p className="desc">
				Two power wizards facing each other in a fierce duel. Choose your spells wisely to win the
				duel.
			</p>
			<div className={styles.duel__wrap}>
				<div
					className={`${styles.duel__panel} ${
						activePlayerId === selectedWizards?.firstDuelist?.id ? '' : styles.duel__panel_disabled
					}`}>
					<div className={styles.duel__header}>
						{activePlayerId === selectedWizards?.firstDuelist?.id && (
							<div className={styles.turnPointer}>
								<p>Cast your spell</p>
								<img src={arrowIcon} alt="Active player indicator" loading="lazy" />
							</div>
						)}
						<div className={styles.duel__potions}>
							<DuelPotion />
						</div>
						{isLoading ? (
							<SkeletonLoader count={1} width={360} height={320} />
						) : (
							<DuelCard
								name={selectedWizards?.firstDuelist?.name}
								health={100}
								mana={100}
								imagePath={firstWizardDetails?.imagePath}
							/>
						)}
					</div>
					<div className={styles.duel__spells}>
						{isSpellsLoading ? (
							<SkeletonLoader count={24} width={185} height={90} />
						) : (
							spells.map((spell) => (
								<DuelSpell
									key={spell.id}
									name={spell.name}
									damage={getRandomInt(20, 50)}
									manaCost={getRandomInt(10, 30)}
								/>
							))
						)}
					</div>
				</div>
				<div className={styles.duel__points}>
					<span>Turn points:</span> 10 / 10
				</div>
				<div
					className={`${styles.duel__panel} ${
						activePlayerId === selectedWizards?.secondDuelist?.id ? '' : styles.duel__panel_disabled
					}`}>
					<div className={`${styles.duel__header} ${styles.duel__header_reverse}`}>
						{activePlayerId === selectedWizards?.secondDuelist?.id && (
							<div className={styles.turnPointer}>
								<p>Cast your spell</p>
								<img src={arrowIcon} alt="Active player indicator" loading="lazy" />
							</div>
						)}
						<div className={styles.duel__potions}>
							<DuelPotion />
						</div>
						{isLoading ? (
							<SkeletonLoader count={1} width={360} height={320} />
						) : (
							<DuelCard
								name={selectedWizards?.secondDuelist?.name}
								health={100}
								mana={100}
								reverse={true}
								imagePath={secondWizardDetails?.imagePath}
							/>
						)}
					</div>
					<div className={styles.duel__spells}>
						{isSpellsLoading ? (
							<SkeletonLoader count={24} width={185} height={90} />
						) : (
							spells.map((spell) => (
								<DuelSpell
									key={spell.id}
									name={spell.name}
									damage={getRandomInt(20, 50)}
									manaCost={getRandomInt(10, 30)}
								/>
							))
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Duel;
