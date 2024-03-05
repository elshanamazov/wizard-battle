import healthPotion from '../../../assets/icons/health-potion.png';
import styles from './DuelPotion.module.scss';

const DuelPotion = () => {
	return (
		<button className={`${styles.potion}`}>
			<img className={styles.potion__img} src={healthPotion} alt="health potion" />
		</button>
	);
};

export default DuelPotion;
