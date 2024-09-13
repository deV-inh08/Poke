import React from 'react';

import "./Pokemon.css";

// import interface
import { Pokemon, PokemonDetails } from '../interface';
import { Detail } from '../App';

// import Components
import PokemonList from './PokemonList';

// create interface for Props 
interface Props {
    pokemons: PokemonDetails[];
    detail: Detail;
    setDetail: React.Dispatch<React.SetStateAction<Detail>>;
};

// Compoenent recieve Props
const PokemonCollection:React.FC<Props> = (props) => {
    const { pokemons , detail, setDetail} = props;
    const selectPokemon = (id: number) => {
        if(!detail.isOpen) {
            setDetail({
                id: id,
                isOpen: true
            });
        }
    };
    return (
        <section className={detail.isOpen ? 'collection-container-active': "collection-container"}>
            {detail.isOpen ? (
                <div className="overlay"></div>
            ): (<div></div>)}
            {pokemons.map((pokemon) =>  {
                return(
                    <div onClick={() => selectPokemon(pokemon.id)}>
                        <PokemonList
                            key={pokemon.id}
                            detail={detail}
                            setDetail={setDetail}
                            name={pokemon.name}
                            id={pokemon.id}
                            image={pokemon.sprites.front_default}
                            abilities={pokemon.abilities}
                        ></PokemonList>
                    </div>
                )
            })}
        </section>
  )
};

export default PokemonCollection;
