import { useState } from "react";
import { GAME_LEVEL } from "./constants/constant.js";
/* importing components */
import PokemonHeader from "./components/pokemonComponents/PokemonHeader.jsx";
import PokemonStartingPage from "./components/pokemonComponents/PokemonStartingPage.jsx";
import PokemonGamePage from "./components/pokemonComponents/PokemonGamePage.jsx";
// styles
import "./App.css";

export default function App() {
	const [gameStart, setGameStart] = useState(false);
	const [score, setScore] = useState(0);
	const [highScore, setHighScore] = useState(0);
	const [gameLevel, setGameLevel] = useState(GAME_LEVEL.MEDIUM);

	function handleGameLevelChange(event) {
		setGameLevel(+event.target.value);
	}

	function handleGameStart(startValue) {
		setGameStart(startValue);
	}

	function incrementScore() {
		setScore((prev) => prev + 1);
	}

	function resetScore() {
		setScore(0);
	}

	function updateHighScore() {
		if (score > highScore) {
			setHighScore(score);
		}
	}

	if (!gameStart) {
		return (
			<section className="parent-wrapper">
				<PokemonHeader />
				<PokemonStartingPage
					score={score}
					onGameStart={handleGameStart}
					onGameLevelChange={handleGameLevelChange}
					gameLevel={gameLevel}
					highScore={highScore}
				/>
			</section>
		);
	}
	return (
		<PokemonGamePage
			onResetScore={resetScore}
			onHighScoreChange={updateHighScore}
			gameLevel={gameLevel}
			score={score}
			onScoreChange={incrementScore}
			onGameStart={setGameStart}
		/>
	);
}
