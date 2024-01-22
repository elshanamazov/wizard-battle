import { useState } from "react";

import AutoSelection from "../../components/AutoSelection/AutoSelection";
import ManualSelection from "../../components/ManualSelection/ManualSelection";
import Button from "../../components/UI/Button/Button";
import styles from "./OpponentSelect.module.scss";

const OpponentSelect = () => {
	const [selectOption, setSelectOption] = useState<"manual" | "auto" | null>(
		null
	);

	return (
		<section className={styles.selection}>
			{!selectOption ? (
				<>
					<h2 className="title">Selection of opponents</h2>
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
				</>
			) : selectOption === "manual" ? (
				<ManualSelection />
			) : (
				<AutoSelection />
			)}
		</section>
	);
};

export default OpponentSelect;
