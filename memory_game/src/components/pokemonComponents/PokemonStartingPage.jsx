/* importing styles */
import "../../styles/pokemonStartingPage.css";
/* importing components */
import PokemonSliderBar from "../pokemonComponents/PokemonSliderBar.jsx";
/* importing images */
import pokemonBall from "../../assets/pokemonImages/pokemonBall.png";
/* importing constant */

export default function PokemonStartingPage({
	highScore,
	score,
	onGameStart,
	onGameLevelChange,
	gameLevel,
}) {
	return (
		<main className="starting-page">
			<div className="starting-page__nav">
				<section className="starting-page__score-board">
					<p className="high-score">High Score : {highScore}</p>
					<p className="score">Score : {score} </p>
				</section>

				<section className="starting-page__level">
					<PokemonSliderBar
						level={gameLevel}
						onGameLevelChange={onGameLevelChange}
					/>
				</section>
			</div>

			<section className="starting-page__start-btn">
				<img
					className="btn"
					src={pokemonBall}
					alt="pokemon ball img"
					onClick={() => onGameStart(true)}
				/>
			</section>
		</main>
	);
}
