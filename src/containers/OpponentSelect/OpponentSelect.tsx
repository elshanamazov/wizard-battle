import { useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import styles from './OpponentSelect.module.scss';

const OpponentSelect = () => {
	const navigate = useNavigate();
	const handleManualSelect = (): void => {
		navigate('/duel-setting/manual');
	};

	const handleAutoSelect = (): void => {
		navigate('/duel-setting/auto');
	};

	return (
		<section className="pt-100">
			<h2 className="title">Selection of opponents</h2>
			<p className="desc">You can either duel a random opponent or choose specific one</p>
			<div className={styles.cta}>
				<Button label="Manual Selection" onClick={handleManualSelect} />
				<Button label="Automatic Selection" onClick={handleAutoSelect} />
			</div>
		</section>
	);
};

export default OpponentSelect;
