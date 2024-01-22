import Button from "../UI/Button/Button";
import WizardCard from "../WizardCard/WizardCard";
import styles from "./AutoSelection.module.scss";

const AutoSelection = () => {
	return (
		<div className={styles.auto}>
			<h2 className="title">Auto selection of opponents</h2>
			<div className={styles.auto__wrapper}>
				<WizardCard name="Opponent" healthPoints={100} mannaPoints={100} />
				<div className={styles.auto__cta}>
					<Button label="Search" onClick={() => "clicked"} />
					<Button label="To fight!" onClick={() => "clicked"} />
				</div>
				<WizardCard name="Opponent" healthPoints={100} mannaPoints={100} />
			</div>
		</div>
	);
};

export default AutoSelection;
