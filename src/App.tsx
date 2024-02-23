import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Duel from './components/Duel/Duel';
import Header from './components/Header/Header';
import AutoSelection from './containers/AutoSelection/AutoSelection';
import ManualSelection from './containers/ManualSelection/ManualSelection';
import OpponentSelect from './containers/OpponentSelect/OpponentSelect';

function App() {
	return (
		<BrowserRouter basename="/wizard-battle">
			<>
				<Header />
				<main>
					<div className="container">
						<Routes>
							<Route path="/" element={<OpponentSelect />} />
							<Route path="/duel-setting/manual" element={<ManualSelection />} />
							<Route path="/duel-setting/auto" element={<AutoSelection />} />
							<Route path="/duel" element={<Duel />} />
						</Routes>
					</div>
				</main>
			</>
		</BrowserRouter>
	);
}

export default App;
