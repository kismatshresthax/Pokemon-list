import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Loader } from '../components';
import { PokemonContext } from '../context/PokemonContext';


export const PokemonPage = () => {
	const { getPokemonByID } = useContext(PokemonContext);
	
	const [loading, setLoading] = useState(true);
	const [pokemon, setPokemon] = useState({});
	const primerMayuscula = (word) => {
		return word[0].toUpperCase() + word.substring(1)
	}
	const { id } = useParams();
z
	const fetchPokemon = async id => {
		const data = await getPokemonByID(id);
		setPokemon(data);
		setLoading(false);
	};

	useEffect(() => {
		fetchPokemon(id);
	}, []);

	return (
		<main className='container main-pokemon'>
					<Link to={'/'}>	<button style={{width:'110px',height:'50px',backgroundColor:'blue',color:'white',borderRadius:"10px"}}><h3>Back</h3></button></Link>

			{loading ? (
				<Loader />
			) : (
				<>
					<div className='header-main-pokemon'>
						<div className='container-img-pokemon'>
							<img
								src={pokemon.sprites.other.dream_world.front_default}
								alt={`Pokemon ${pokemon?.name}`}
							/>
						</div>

						<div className='container-info-pokemon'>
							<h1>{primerMayuscula(pokemon.name)}</h1>
							<div className='card-types info-pokemon-type'>
								{pokemon.types.map(type => (
									<span key={type.type.name} className={`${type.type.name}`}>
										{type.type.name}
									</span>
								))}
							</div>
							<div className='info-pokemon'>
								<div className='group-info'>
									<p>Height</p>
									<span>{pokemon.height}</span>
								</div>
								<div className='group-info'>
									<p>Weight</p>
									<span>{pokemon.weight}KG</span>
								</div>
							</div>
						</div>
					</div>

					<div className='container-stats'>
						<h1>statistics</h1>
						<div className='stats'>
							<div className='stat-group'>
								<span>Hp</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats[0].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Attack</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats[1].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Defense</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats[2].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Special Attack</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats[3].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Special Defense</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats[4].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Speed</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats[5].base_stat}
								</span>
							</div>
						</div>
					</div>
				</>
			)}
		</main>
	);
};
