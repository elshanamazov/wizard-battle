import { useState } from "react";
import IconButton from "../IconButton/IconButton";
import styles from "./Slider.module.scss";

type SliderProps = {
	slides: {
		id: number;
		content: JSX.Element | string;
	}[];
};

const Slider = ({ slides }: SliderProps) => {
	const [activeIndex, setActiveIndex] = useState(0);

	const prevSlide = () => {
		setActiveIndex((prevIndex) =>
			prevIndex === 0 ? slides.length - 1 : prevIndex - 1
		);
	};

	const nextSlide = () => {
		setActiveIndex((nextIndex) =>
			nextIndex === slides.length - 1 ? 0 : nextIndex + 1
		);
	};

	const displaySlides = [
		slides[(activeIndex - 1 + slides.length) % slides.length],
		slides[activeIndex],
		slides[(activeIndex + 1) % slides.length],
	];

	return (
		<div className={styles.slider}>
			<IconButton
				className={styles.slide__arrow}
				onClick={prevSlide}
				icon={
					<svg
						className={styles.slider__arrow_prev}
						fill="currentColor"
						height="30"
						width="40"
						version="1.1"
						id="Layer_1"
						viewBox="0 0 330 330"
						xmlSpace="preserve"
					>
						<path
							id="XMLID_222_"
							d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
							c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213
							C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
							C255,161.018,253.42,157.202,250.606,154.389z"
						/>
					</svg>
				}
			/>
			<div className={styles.slider__slides}>
				{displaySlides.map((slide, index) => (
					<div
						key={slide.id}
						className={`${styles.slider__slide} ${
							index === 1 ? styles.slider__slide_active : ""
						}`}
					>
						{slide.content}
					</div>
				))}
			</div>
			<IconButton
				className={styles.slider__arrow}
				onClick={nextSlide}
				icon={
					<svg
						className={styles.slider__arrow_next}
						fill="currentColor"
						height="30"
						width="40"
						version="1.1"
						id="Layer_1"
						viewBox="0 0 330 330"
						xmlSpace="preserve"
					>
						<path
							id="XMLID_222_"
							d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
							c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213
							C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
							C255,161.018,253.42,157.202,250.606,154.389z"
						/>
					</svg>
				}
			/>
		</div>
	);
};

export default Slider;
