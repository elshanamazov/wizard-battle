import styles from "./WizardCard.module.css";

type WizardCardProps = {
	name: string;
	healthPoints: number;
	mannaPoints: number;
	className?: string;
};

const WizardCard = ({ name, healthPoints, mannaPoints }: WizardCardProps) => {
	return (
		<div className={styles.wizardCard}>
			<div className={styles.wizardCardPlaceholder}></div>
			<div className={styles.wizardInfo}>
				<h3 className={styles.wizardName}>{name}</h3>
				<span className={styles.wizardBar}>{healthPoints}</span>
				<span className={`${styles.wizardBar} ${styles.wizardBarMana}`}>
					{mannaPoints}
				</span>
			</div>
		</div>
	);
};

export default WizardCard;
