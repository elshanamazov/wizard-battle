import { BrowserRouter, Route, Routes } from "react-router-dom";
import AutoSelection from "./components/AutoSelection/AutoSelection";
import Header from "./components/Header/Header";
import ManualSelection from "./components/ManualSelection/ManualSelection";
import OpponentSelect from "./containers/OpponentSelect/OpponentSelect";

function App() {
	return (
		<BrowserRouter basename="/wizard-battle">
			<>
				<Header />
				<main>
					<div className="container">
						<Routes>
							<Route path="/" element={<OpponentSelect />} />
							<Route
								path="/duel-setting/manual"
								element={<ManualSelection />}
							/>
							<Route path="/duel-setting/auto" element={<AutoSelection />} />
						</Routes>
					</div>
				</main>
			</>
		</BrowserRouter>
	);
}

export default App;
