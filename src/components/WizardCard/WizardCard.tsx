import styles from './WizardCard.module.scss';

type WizardCardProps = {
	name: string | null;
	healthPoints: number;
	mannaPoints: number;
	imagePath?: string | null;
	className?: string;
};

const WizardCard = ({ name, healthPoints, mannaPoints, imagePath }: WizardCardProps) => {
	return (
		<div className={styles.wizardCard}>
			<div className={styles.wizardCard__placeholder}>
				{imagePath ? (
					<img className={styles.wizardCard__img} src={imagePath} alt={`${name} image`} />
				) : (
					<div>No image available</div>
				)}
			</div>
			<div className={styles.wizardCard__info}>
				<h3 className={styles.wizardCard__name}>{name}</h3>
				<span className={styles.wizardCard__bar}>{healthPoints}</span>
				<span className={`${styles.wizardCard__bar} ${styles.wizardCard__bar_blue}`}>
					{mannaPoints}
				</span>
			</div>
		</div>
	);
};

export default WizardCard;
