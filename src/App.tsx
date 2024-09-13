import React, { useEffect, useState } from 'react';
import './App.css';
import axios from "axios"

// import type
import { pokemons } from "./@types/type.pokemon"

// import Components
import PokemonCollection from './Components/PokemonCollection';

// import  interface
import { Pokemon } from './interface';

export interface Detail {
  id: number;
  isOpen: boolean;
};

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]); // type [ {id: number, name: string, sprites: { front_default: string} } ]
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [detail, setDetail] = useState<Detail>({
    id: 0,
    isOpen: false
  });
  useEffect(() => {
    const getApi = async () => {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=20`);
      setUrl(res.data.next);
      res.data.results.forEach(async (pokemon: pokemons) => {
        if (pokemon) {
          const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
          setPokemons((p) => [...p, poke.data]);
        }
      });

    }
    getApi()
  }, []);

  const nextPage = async () => {
    setLoading(true);
    let res = await axios.get(url);
    setUrl(res.data.next);
    res.data.results.forEach(async (pokemon: Pokemon) => {
      const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
      setPokemons((p) => [...p, poke.data]);
      setLoading(false);
    })
  };
  return (
    <div className="App">
      <div className="container">
        <header className='pokemon-header'>
          Pokemon
        </header>
        <PokemonCollection pokemons={pokemons} detail={detail} setDetail={setDetail}></PokemonCollection>
        {!detail.isOpen && 
          <div className='btn'>
            <button onClick={nextPage}>{loading ? "Loading" : "Load more"}</button>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
