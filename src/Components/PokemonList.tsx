import React, { useEffect, useState } from 'react';
import "./Pokemon.css";
import { Detail } from '../App';

interface Props {
  name: string;
  id: number;
  image: string;
  abilities: {
    name: string;
    ability: string;
  }[] | undefined;
  detail: Detail;
  setDetail: React.Dispatch<React.SetStateAction<Detail>>;
}

const PokemonList: React.FC<Props> = (props) => {
  const { name, id, image, abilities, detail, setDetail } = props;
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(id === detail?.id)
  }, [detail]);

  const closeDetail = () => {
    setDetail({
      id: 0,
      isOpen: false
    });
  };
  return (
    <div className=''>
      {isSelected 
      ? (
        <section className='pokemon-list-detailed'>
          <div className="detail-container">
            <p className="detail-close" onClick={closeDetail}>X</p>
            <div className="detail-info">
              <img className='detail-image' src={image} alt='pokemon' />
              <p className="detail-name">{name}</p>
            </div>
            <div className="detail-skill">
              <p className="detail-ability">Abilities: </p>
              {abilities?.map((ab: any) => {
                return (
                  <div>{ab.ability.name}</div>
                )
              })}
            </div>
          </div>
        </section>
      ) 
      : (<section className='pokemon-list-container'>
          <p className='pokemon-name'>{name}</p>
          <img src={image} alt='pokemon' />
        </section>)
      }
    </div>
  )
};

export default PokemonList; 
