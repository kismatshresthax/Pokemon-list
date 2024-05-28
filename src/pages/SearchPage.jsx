

import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { PokemonContext } from '../context/PokemonContext';
import { Link } from 'react-router-dom';
import { Loader } from '../components';

export const SearchPage = () => {
  const location = useLocation();
  const { globalPokemons, loading } = useContext(PokemonContext);

  const searchTerm = location.state ? location.state.toLowerCase() : '';

  const filteredPokemons = globalPokemons.filter((pokemon) =>
    pokemon.name.includes(searchTerm)
  );

  return (
    <div className='container'>
      <p className='p-search'>
        {filteredPokemons.length <=0? <Loader/> : `Found ${filteredPokemons.length} results:`}
      </p>
      <div className='card-list-pokemon container'>
        {filteredPokemons.map((pokemon) => (
          <Link
            to={`/pokemon/${pokemon.id}`}
            key={pokemon.url}
            className='card-pokemon'
          >
           	<div className='card-img'>
				<img
					src={pokemon.sprites.other.dream_world.front_default}
					alt={`Pokemon ${pokemon.name}`}
				/>
			</div>
			<div className='card-info'>
				<span className='pokemon-id'>N° {pokemon.id}</span>
				<h3>{pokemon.name}</h3>
				<div className='card-types'>
					{pokemon.types.map(type => (
						<span key={type.type.name} className={type.type.name}>
							{type.type.name}
						</span>
					))}
				</div>
			</div>
          </Link>
        ))}
      </div>
    </div>
  );
};
