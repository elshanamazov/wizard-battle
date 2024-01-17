import { useState } from "react";
import Button from "../../components/Button/Button";
import styles from "./OpponentSelect.module.scss";
const OpponentSelect = () => {
	const [selectOption, setSelectOption] = useState("manual");

	return (
		<section className="selection">
			{selectOption}
			<h2 className={styles.title}>Selection of opponents</h2>
			<div className={styles.cta}>
				<Button
					label="Manual Selection"
					onClick={() => setSelectOption("manual")}
				/>
				<Button
					label="Automatic Selection"
					onClick={() => setSelectOption("auto")}
				/>
			</div>
		</section>
	);
};

export default OpponentSelect;
