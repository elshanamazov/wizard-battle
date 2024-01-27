import { useEffect, useRef, useState } from "react";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import Slider from "../UI/Slider/Slider";
import styles from "./ManualSelection.module.scss";

const ManualSelection = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [counter, setCounter] = useState(3);
	const intervalRef = useRef<number | null>(null);

	const wizardsData = [
		{ id: 1, name: "Hermione Granger", imagePath: "./pic_1.jpeg" },
		{ id: 2, name: "Draco Malfoy", imagePath: "./pic_2.jpeg" },
		{ id: 3, name: "Harry Potter", imagePath: "./pic_3.jpeg" },
		{ id: 4, name: "Death Eater", imagePath: "./pic_4.jpeg" },
		{ id: 5, name: "Dumbledore", imagePath: "./pic_5.jpeg" },
		{ id: 6, name: "Hagrid", imagePath: "./pic_6.jpeg" },
	];

	const wizardSlides = wizardsData.map((wizardSlide) => ({
		id: wizardSlide.id,
		content: (
			<>
				<img
					className={styles.manual__img}
					src={wizardSlide.imagePath}
					alt={wizardSlide.name}
				/>
				<h3 className={styles.manual__label}>{wizardSlide.name}</h3>
			</>
		),
	}));

	const closeModal = () => {
		setIsModalOpen(false);
		if (intervalRef.current !== null) {
			clearInterval(intervalRef.current);
		}
	};

	const startCounter = () => {
		setIsModalOpen(true);
		setCounter(3);

		if (intervalRef.current !== null) {
			clearInterval(intervalRef.current);
		}

		intervalRef.current = setInterval(() => {
			setCounter((countDown) => {
				if (countDown === 0) {
					clearInterval(intervalRef.current as number);
					alert("The Fight Started!");
					return countDown;
				}
				return countDown - 1;
			});
		}, 1000);
	};

	useEffect(() => {
		return () => {
			if (intervalRef.current !== null) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);

	return (
		<section className="pt-100">
			<h2 className="title">Manual selection of opponents</h2>
			<div className={styles.manual__wrapper}>
				<Slider slides={wizardSlides} />
				<Button label="To Fight!" onClick={startCounter} />
				<Slider slides={wizardSlides} />
			</div>
			{isModalOpen && (
				<Modal
					text={`The fight will start in... `}
					textCustomClass={styles.manual__text}
					onClose={closeModal}
					isOpen={isModalOpen}
				>
					<span className={styles.manual__counter}>{counter}</span>
					<Button label="I changed my mind" onClick={closeModal} />
				</Modal>
			)}
		</section>
	);
};

export default ManualSelection;
