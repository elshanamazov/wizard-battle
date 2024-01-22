import styles from "./Header.module.scss";

const Header = () => {
	return (
		<div className={styles.header}>
			<span className={styles.header__title}>Wizard's Duel</span>
			<div className={styles.header__step}>Step 1</div>
		</div>
	);
};

export default Header;
