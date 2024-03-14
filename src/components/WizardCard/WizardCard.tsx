import SkeletonLoader from '../UI/Skeleton/Skeleton';
import styles from './WizardCard.module.scss';

type WizardCardProps = {
	name: string | null;
	healthPoints: number;
	mannaPoints: number;
	imagePath?: string | undefined;
	className?: string;
	isLoading?: boolean;
};

const WizardCard = ({
	name,
	healthPoints,
	mannaPoints,
	imagePath,
	isLoading = false,
}: WizardCardProps) => {
	return (
		<>
			{isLoading ? (
				<SkeletonLoader width={360} height={400} />
			) : (
				<div className={styles.wizardCard}>
					<div className={styles.wizardCard__placeholder}>
						{imagePath && (
							<img
								className={styles.wizardCard__img}
								src={imagePath}
								alt={name ?? 'Wizard image'}
							/>
						)}
						<h3 className={styles.wizardCard__name}>{name}</h3>
					</div>
					<div className={styles.wizardCard__info}>
						<span className={styles.wizardCard__bar}>{healthPoints}</span>
						<span className={`${styles.wizardCard__bar} ${styles.wizardCard__bar_blue}`}>
							{mannaPoints}
						</span>
					</div>
				</div>
			)}
		</>
	);
};

export default WizardCard;
