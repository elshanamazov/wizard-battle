import { useState } from "react";
import Button from "../../components/UI/Button/Button";
import Modal from "../../components/UI/Modal/Modal";
import styles from "./OpponentSelect.module.scss";
const OpponentSelect = () => {
	const [selectOption, setSelectOption] = useState<"manual" | "auto">("manual");

	return (
		<section className="selection">
			{selectOption}
			<Modal text="You lost :(" onClose={() => "clicked"} />
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
