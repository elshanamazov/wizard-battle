import Header from "./components/Header/Header";
import OpponentSelect from "./containers/OpponentSelect/OpponentSelect";

function App() {
	return (
		<>
			<Header />
			<main>
				<div className="container">
					<OpponentSelect />
				</div>
			</main>
		</>
	);
}

export default App;
