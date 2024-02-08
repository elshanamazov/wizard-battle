import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import Rating from '../../components/UI/Rating/Rating';
import styles from './OpponentSelect.module.scss';

const OpponentSelect = () => {
	const navigate = useNavigate();

	const handleManualSelect = () => {
		navigate('/duel-setting/manual');
	};

	const handleAutoSelect = () => {
		navigate('/duel-setting/auto');
	};

	const [rating, setRating] = useState(0);

	const handleRatingChange = (newRating: number) => {
		console.log(`Новый рейтинг: ${newRating}`);
		setRating(newRating);
	};

	return (
		<section className="pt-100">
			<h2 className="title">Selection of opponents</h2>
			<div className={styles.cta}>
				<Button label="Manual Selection" onClick={handleManualSelect} />
				<Button label="Automatic Selection" onClick={handleAutoSelect} />
				<Rating rating={rating} onChange={handleRatingChange} />
			</div>
		</section>
	);
};

export default OpponentSelect;
