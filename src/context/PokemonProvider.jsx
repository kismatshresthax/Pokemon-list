import { useEffect, useState } from 'react';
import { useForm } from '../hook/useForm';
import { PokemonContext } from './PokemonContext';

export const PokemonProvider = ({ children }) => {
	const [allPokemons, setAllPokemons] = useState([]);
	const [globalPokemons, setGlobalPokemons] = useState([]);
	const [offset, setOffset] = useState(0);

	// Utilizar CustomHook - useForm
	const { valueSearch, onInputChange, onResetForm } = useForm({
		valueSearch: '',
	});

	// Estados para la aplicación simples
	const [loading, setLoading] = useState(true);
	const [active, setActive] = useState(false);

	// lLamar 50 pokemones a la API
	const getAllPokemons = async (limit = 50) => {
  const baseURL = 'https://pokeapi.co/api/v2/';

  try {
    const res = await fetch(`${baseURL}pokemon?limit=${limit}&offset=${offset}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch Pokemon list. Status: ${res.status}`);
    }

    const data = await res.json();

    const promises = data.results.map(async (pokemon) => {
      try {
        const res = await fetch(pokemon.url);
        if (!res.ok) {
          throw new Error(`Failed to fetch Pokemon details. Status: ${res.status}`);
        }

        const data = await res.json();
        return data;
      } catch (error) {
        console.error(`Error fetching details for Pokemon with URL ${pokemon.url}:`, error);
        throw error; // Rethrow the error to stop processing this Pokemon
      }
    });

    const results = await Promise.all(promises);

    setAllPokemons((prevPokemons) => [...prevPokemons, ...results]);
    setLoading(false);
  } catch (error) {
    console.error('Error fetching Pokemon list:', error);
    setLoading(false);
  }
};

	// Llamar todos los pokemones
	const getGlobalPokemons = async () => {
		const baseURL = 'https://pokeapi.co/api/v2/';
	  
		try {
		  const res = await fetch(`${baseURL}pokemon?limit=100000&offset=0`);
	  
		  if (!res.ok) {
			throw new Error(`Failed to fetch global pokemons. Status: ${res.status}`);
		  }
	  
		  const data = await res.json();
	  
		  const promises = data.results.map(async (pokemon) => {
			const res = await fetch(pokemon.url);
			const data = await res.json();
			return data;
		  });
	  
		  const results = await Promise.all(promises);
	  
		  setGlobalPokemons(results);
		  setLoading(false);
		} catch (error) {
		  console.error('Error fetching global pokemons:', error);
		  setLoading(false);
		  // You can handle the error further if needed, e.g., set an error state.
		}
	  };

	// Llamar a un pokemon por ID
	const getPokemonByID = async id => {
		const baseURL = 'https://pokeapi.co/api/v2/';

		const res = await fetch(`${baseURL}pokemon/${id}`);
		const data = await res.json();
		return data;
	};
	

	useEffect(() => {
		getAllPokemons();
	}, [offset]);

	useEffect(() => {
		getGlobalPokemons();
	}, []);

	// BTN CARGAR MÁS
	const onClickLoadMore = () => {
		setOffset(offset + 50);
	};




	const [filteredPokemons, setfilteredPokemons] = useState([]);

	const handleCheckbox = e => {
		// setTypeSelected({
		// 	...typeSelected,
		// 	[e.target.name]: e.target.checked,
		// });

		if (e.target.checked) {
			const filteredResults = globalPokemons.filter(pokemon =>
				pokemon.types
					.map(type => type.type.name)
					.includes(e.target.name)
			);
			setfilteredPokemons([...filteredPokemons, ...filteredResults]);
		} else {
			const filteredResults = filteredPokemons.filter(
				pokemon =>
					!pokemon.types
						.map(type => type.type.name)
						.includes(e.target.name)
			);
			setfilteredPokemons([...filteredResults]);
		}
	};

	return (
		<PokemonContext.Provider
			value={{
				valueSearch,
				onInputChange,
				onResetForm,
				allPokemons,
				globalPokemons,
				getPokemonByID,
				onClickLoadMore,
				// Loader
				loading,
				setLoading,
				// Btn Filter
				active,
				setActive,
				// Filter Container Checkbox
				handleCheckbox,
				filteredPokemons,
			}}
		>
			{children}
		</PokemonContext.Provider>
	);
};
