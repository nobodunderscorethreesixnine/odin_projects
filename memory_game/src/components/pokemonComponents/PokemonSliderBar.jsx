/* importing constant */
import { GAME_LEVEL } from "../../constants/constant";
/* importing images */
import pichu from "../../assets/pokemonImages/pichu.webp";
import pikachu from "../../assets/pokemonImages/pikachu.png";
import raichu from "../../assets/pokemonImages/raichu.webp";
/* importing style */
import "../../styles/pokemonSliderBar.css";

export default function PokemonSliderBar({ level, onGameLevelChange }) {
	return (
		<div className="slider-wrapper">
			<input
				type="range"
				className="slider-wrapper__slider"
				min={GAME_LEVEL.EASY}
				max={GAME_LEVEL.HARD}
				value={level}
				step="1"
				onChange={onGameLevelChange}
			/>
			<div className="slider-wrapper__icons">
				<img
					src={pichu}
					alt="pokemon-img"
					className={level === GAME_LEVEL.EASY ? "active" : ""}
				/>
				<img
					src={pikachu}
					alt="pokemon-img"
					className={level === GAME_LEVEL.MEDIUM ? "active" : ""}
				/>
				<img
					src={raichu}
					alt="pokemon-img"
					className={level === GAME_LEVEL.HARD ? "active" : ""}
				/>
			</div>
		</div>
	);
}
