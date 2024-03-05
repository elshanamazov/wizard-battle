import { useEffect, useState } from 'react';
import IconButton from '../IconButton/IconButton';
import styles from './Slider.module.scss';

type SliderProps = {
	slides: {
		id: string;
		content: JSX.Element | string;
	}[];
	onSelect?: (id: string) => void;
	activeIndex?: number | null;
};

const Slider = ({ slides, onSelect, activeIndex = 0 }: SliderProps) => {
	const [currentIndex, setCurrentIndex] = useState(activeIndex || 0);

	const navigate = (direction: 'next' | 'prev'): void => {
		setCurrentIndex((prevIndex) => {
			let newIndex = direction === 'next' ? prevIndex + 1 : prevIndex - 1;

			if (newIndex < 0) {
				newIndex = slides.length - 1;
			} else if (newIndex >= slides.length) {
				newIndex = 0;
			}

			onSelect?.(slides[newIndex].id);
			return newIndex;
		});
	};

	useEffect((): void => {
		if (activeIndex !== null && activeIndex >= 0 && activeIndex < slides.length) {
			setCurrentIndex(activeIndex);
		}
	}, [activeIndex, slides.length]);

	const getSlideIndex = (index: number): number => {
		return (index + slides.length) % slides.length;
	};

	const displaySlides = [
		slides[getSlideIndex(currentIndex - 1)],
		slides[getSlideIndex(currentIndex)],
		slides[getSlideIndex(currentIndex + 1)],
	];

	return (
		<div className={styles.slider}>
			<IconButton
				className={styles.slide__arrow}
				onClick={() => navigate('prev')}
				icon={
					<svg
						className={styles.slider__arrow_prev}
						fill="currentColor"
						height="30"
						width="40"
						version="1.1"
						id="Layer_1"
						viewBox="0 0 330 330"
						xmlSpace="preserve">
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
						key={slide?.id || index}
						className={`${styles.slider__slide} ${index === 1 ? styles.slider__slide_active : ''}`}>
						{slide?.content}
					</div>
				))}
			</div>
			<IconButton
				className={styles.slider__arrow}
				onClick={() => navigate('next')}
				icon={
					<svg
						className={styles.slider__arrow_next}
						fill="currentColor"
						height="30"
						width="40"
						version="1.1"
						id="Layer_1"
						viewBox="0 0 330 330"
						xmlSpace="preserve">
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
