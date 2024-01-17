import styles from "./WizardCard.module.scss";

type WizardCardProps = {
	name: string;
	healthPoints: number;
	mannaPoints: number;
	className?: string;
};

const WizardCard = ({ name, healthPoints, mannaPoints }: WizardCardProps) => {
	return (
		<div className={styles.wizardCard}>
			<div className={styles.wizardCard__placeholder}></div>
			<div className={styles.wizardCard__info}>
				<h3 className={styles.wizardCard__name}>{name}</h3>
				<span className={styles.wizardCard__bar}>{healthPoints}</span>
				<span
					className={`${styles.wizardCard__bar} ${styles.wizardCard__bar_blue}`}
				>
					{mannaPoints}
				</span>
			</div>
		</div>
	);
};

export default WizardCard;
