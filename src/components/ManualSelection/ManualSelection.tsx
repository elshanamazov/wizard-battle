import styles from "./ManualSelection.module.scss";

const ManualSelection = () => {
	return (
		<section className="pt-100">
			<h2 className="title">Manual selection of opponents</h2>
			<div className={styles.manual__wrapper}></div>
		</section>
	);
};

export default ManualSelection;
