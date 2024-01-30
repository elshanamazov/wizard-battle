import { useEffect, useState } from "react";
import { loadFromStorage, saveToStorage } from "../../utils/storageUtil";
import { DuelStateId } from "../../utils/types";
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
		{ id: 1, name: "Harry Potter" },
		{ id: 2, name: "Hermione Granger" },
		{ id: 3, name: "Ron Weasley" },
		{ id: 4, name: "Albus Dumbledore" },
		{ id: 5, name: "Severus Snape" },
		{ id: 6, name: "Voldemort" },
		{ id: 7, name: "Sirius Black" },
		{ id: 8, name: "Draco Malfoy" },
		{ id: 9, name: "Rubeus Hagrid" },
		{ id: 10, name: "Minerva McGonagall" },
		{ id: 11, name: "Bellatrix Lestrange" },
		{ id: 12, name: "Luna Lovegood" },
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
			const leftWizard = getRandomWizard();
			const rightWizard = getRandomWizard();
			setLeftOpponent(leftWizard.name);
			setRightOpponent(rightWizard.name);

			saveToStorage<DuelStateId>("autoDuelState", {
				firstDuelistId: leftWizard.id,
				secondDuelistId: rightWizard.id,
			});
		}, 1000);

		setTimeout(() => {
			clearInterval(searchInterval);
			setIsSearching(false);
		}, 5000);
	};

	useEffect(() => {
		const savedState = loadFromStorage<DuelStateId>("autoDuelState");
		if (savedState) {
			const { firstDuelistId, secondDuelistId } = savedState;
			const leftWizard = wizards.find((wizard) => wizard.id === firstDuelistId);
			const rightWizard = wizards.find(
				(wizard) => wizard.id === secondDuelistId
			);
			if (leftWizard && rightWizard) {
				setLeftOpponent(leftWizard.name);
				setRightOpponent(rightWizard.name);
			}
		}
	}, []);

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
