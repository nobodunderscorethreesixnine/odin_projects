import { useEffect, useState } from "react";
/* importing styles */
import "../../styles/pokemonGamePage.css";
/* importing constant */
import { LEVEL_CARD } from "../../constants/constant";

function HandleGameOver({ onHighScoreChange, onGameStart, gameOver }) {
	useEffect(() => {
		onHighScoreChange();
		const id = setTimeout(() => {
			onGameStart(false);
		}, 1500);

		return () => {
			clearTimeout(id);
		};
	}, [gameOver]);
	return (
		<div className="modal">
			<div className="modal__content">
				<p className="modal__info">Game Over</p>
			</div>
		</div>
	);
}

export default function PokemonGamePage({
	onHighScoreChange,
	gameLevel,
	onScoreChange,
	onResetScore,
	score,
	onGameStart,
}) {
	const [pokemonData, setPokemonData] = useState([]);
	const [error, setError] = useState(null);
	const [clickedCards, setClickedCards] = useState([]);
	const [gameOver, setGameOver] = useState(false);
	const pokemonLink = `https://pokeapi.co/api/v2/pokemon?limit=${LEVEL_CARD[gameLevel]}&offset=200`;

	function handleClick(cardName) {
		if (clickedCards.includes(cardName)) {
			setGameOver(true);
		} else {
			setClickedCards((prev) => [...prev, cardName]);
			onScoreChange();
			shuffle();
		}
	}

	function shuffle() {
		const data = [...pokemonData];
		let currentIndex = data.length;
		while (currentIndex !== 0) {
			let randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;
			// swapping values
			[data[currentIndex], data[randomIndex]] = [
				data[randomIndex],
				data[currentIndex],
			];
		}
		setPokemonData(data);
	}

	useEffect(() => {
		onResetScore();
		async function fetchPokemonImg() {
			try {
				const response = await fetch(pokemonLink);
				if (!response.ok) {
					throw new Error(`HTTP Error! Status: ${response.status}`);
				}
				const json = await response.json();
				const result = json.results;

				const pokemonList = await Promise.all(
					result.map(async (pokemon) => {
						const detailResponse = await fetch(pokemon.url);
						if (!detailResponse.ok) {
							throw new Error(
								`HTTP Error! Status: ${response.status}`,
							);
						}
						const detailData = await detailResponse.json();
						const imageUrl =
							detailData.sprites.other.dream_world
								.front_default ||
							detailData.sprites.other.home.front_default;

						return {
							name: pokemon.name,
							url: imageUrl,
						};
					}),
				);
				setPokemonData(pokemonList);
			} catch (error) {
				setError("Something went wrong, please try again latter");
				console.error("Error: ", error.message);
			}
		}
		fetchPokemonImg();
	}, []);

	if (error) {
		return <p>{error}</p>;
	}

	return (
		<main className="game-wrapper">
			<header className="game-wrapper__hdr">
				<p>Current Score : {score}</p>
			</header>
			<section className="card-wrapper">
				{pokemonData.map((data) => (
					<div
						className="card-wrapper__card"
						key={data.name}
						onClick={() => handleClick(data.name)}
					>
						<img
							src={data.url}
							alt={data.name}
							className="card-wrapper__card-img"
						/>
						<p className="card-wrapper__card-hdr">{data.name}</p>
					</div>
				))}
			</section>
			{gameOver && (
				<HandleGameOver
					onGameStart={onGameStart}
					gameOver={gameOver}
					onHighScoreChange={onHighScoreChange}
				/>
			)}
		</main>
	);
}
