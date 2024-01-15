import { useState } from "react";
import Button from "../components/Button";

const OpponentSelect = () => {
	const [selectOption, setSelectOption] = useState("manual");

	return (
		<div>
			<Button
				label="Manual Selection"
				onClick={() => setSelectOption("manual")}
			/>
			<Button
				label="Automatic Selection"
				onClick={() => setSelectOption("auto")}
			/>
			{selectOption} // блок в котором будет отображаться соответствующий поиск
			(в зависимости от того какой способ был выбран пользователем)
		</div>
	);
};

export default OpponentSelect;
