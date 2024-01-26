import { useState } from "react";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import WizardCard from "../WizardCard/WizardCard";
import styles from "./AutoSelection.module.scss";

const AutoSelection = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isSearching, setIsSearching] = useState(false);
	const [leftOpponent, setLeftOpponent] = useState("Harry Potter");
	const [rightOpponent, setRightOpponent] = useState("Voldemort");

	const wizards = [
		"Harry Potter",
		"Hermione Granger",
		"Ron Weasley",
		"Albus Dumbledore",
		"Severus Snape",
		"Voldemort",
		"Sirius Black",
		"Draco Malfoy",
		"Rubeus Hagrid",
		"Minerva McGonagall",
		"Bellatrix Lestrange",
		"Luna Lovegood",
	];

	const getRandomWizard = () => {
		const index = Math.floor(Math.random() * wizards.length);
		return wizards[index];
	};

	const modalCloseHandler = () => {
		setIsOpen(false);
	};
	const modalOpenHandler = () => {
		setIsOpen(true);
	};

	const handleSearch = () => {
		setIsSearching(true);

		const searchInterval = setInterval(() => {
			setLeftOpponent(getRandomWizard());
			setRightOpponent(getRandomWizard());
		}, 1000);

		setTimeout(() => {
			clearInterval(searchInterval);
			setIsSearching(false);
		}, 5000);
	};

	return (
		<section className="pt-100">
			<h2 className="title">Auto selection of opponents</h2>
			<div className={styles.auto__wrapper}>
				<WizardCard name={leftOpponent} healthPoints={100} mannaPoints={100} />
				<div className={styles.auto__cta}>
					<Button
						label="Search"
						onClick={handleSearch}
						disabled={isSearching}
					/>
					<Button
						label="To fight!"
						onClick={modalOpenHandler}
						disabled={isSearching}
					/>
				</div>
				<WizardCard name={rightOpponent} healthPoints={100} mannaPoints={100} />
				<Modal
					text="Do you confirm your choice of characters?"
					onClose={modalCloseHandler}
					isOpen={isOpen}
				>
					<div className={`${styles.auto__cta} ${styles.auto__cta_modify}`}>
						<Button
							label="Confirm"
							onClick={() => alert("The fight has begun")}
						/>
						<Button label="Cancel" onClick={modalCloseHandler} />
					</div>
				</Modal>
			</div>
		</section>
	);
};

export default AutoSelection;
