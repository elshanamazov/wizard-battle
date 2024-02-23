import magicWand from '../../../assets/magic-wand.png';
import spellCost from '../../../assets/spell-cost.png';
import styles from './DuelSpell.module.scss';

type spellProps = {
	name: string;
	damage: number;
	manaCost: string;
};

const DuelSpell = ({ name, damage, manaCost }: spellProps) => {
	return (
		<button className={styles.spell}>
			<span className={styles.spell__name}>{name}</span>
			<div className={styles.spell__damage}>
				<img className={styles.spell__icon} src={magicWand} alt="magic wand" />{' '}
				<span>{damage}</span>
			</div>
			<div className={styles.spell__cost}>
				<img className={styles.spell__icon} src={spellCost} alt="staff icon" />
				<span>{manaCost}</span>
			</div>
		</button>
	);
};

export default DuelSpell;
