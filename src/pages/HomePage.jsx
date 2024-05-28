import React, { useContext } from 'react';
import { PokemonList } from '../components';
import { PokemonContext } from '../context/PokemonContext';

export const HomePage = () => {

    const {onClickLoadMore} = useContext(PokemonContext)

	return (
		<>
			
			<PokemonList />
         
            <div className="container-btn-load-more container">
                <button className='btn-load-more' onClick={onClickLoadMore}>
                    Load more
                </button>
            </div>
		</>
	);
};