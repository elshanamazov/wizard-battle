import styles from './DuelCard.module.scss';

type DuelCardProps = {
	name: string | undefined;
	health: number;
	mana: number;
	imagePath?: string;
	reverse?: boolean;
};

const DuelCard = ({ name, health, mana, reverse = false, imagePath }: DuelCardProps) => {
	return (
		<div className={styles.duelCard}>
			<h3 className={`${styles.duelCard__name} ${reverse ? styles.duelCard__name_reverse : ''}`}>
				{name}
			</h3>
			<div className={`${styles.duelCard__body} ${reverse ? styles.duelCard__body_reverse : ''}`}>
				<div className={styles.duelCard__bars}>
					<div className={`${styles.duelCard__health} ${styles.duelCard__bar}`}>
						<span className={styles.duelCard__text}>{health}</span>
					</div>
					<div className={`${styles.duelCard__mana} ${styles.duelCard__bar}`}>
						<span className={styles.duelCard__text}>{mana}</span>
					</div>
				</div>
				<div className={styles.duelCard__pic}>
					<img className={styles.duelCard__pic__img} src={imagePath} alt="" />
				</div>
			</div>
		</div>
	);
};

export default DuelCard;
