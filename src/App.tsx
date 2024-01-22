import Header from "./components/Header/Header";
import OpponentSelect from "./containers/OpponentSelect/OpponentSelect";

function App() {
	return (
		<>
			<Header />
			<div className="container">
				<OpponentSelect />
			</div>
		</>
	);
}

export default App;
