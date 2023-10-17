import axios from "axios";
import React, {
  ChangeEvent,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from "react";
import { axiosInstance } from "../../../services/axiosInstance";

interface PokemonCharacterProps {
  onClick?: () => void;
  addPokemon;
  className;
}

const PokemonCharacter = ({
  onClick,
  addPokemon,
  className,
}: PokemonCharacterProps) => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [getValue, setGetValue] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [filterData, setfilterData] = useState([]);

  const getPokemonList = useCallback(() => {
    axiosInstance.get(`pokemon?limit=2000&offset=0`).then(({ data }) => {
      console.log(data);
      setAllPokemons(data.results);
    });
  }, []);

  useEffect(() => {
    getPokemonList();
  }, [getPokemonList]);

  const toggleFilter = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setGetValue(value);
    const filterPokemon = allPokemons.filter((item) =>
      item.name.toLowerCase().includes(searchPokemon.toLowerCase())
    );
    setfilterData(filterPokemon);
    searchPokemon == "" ? setIsActive(false) : setIsActive(true);
  };

  return (
    <div className={`${className} flex flex-col items-center`}>
      <h2 className=" font-semibold text-[18px]">Search your Pokemon</h2>
      <div className=" relative w-full">
        <div className="w-full bg-red-500 border-2 border-slate-600 rounded-xl px-2 py-1">
          <input
            type="text"
            className="bg-transparent text-white w-[92%]"
            onChange={toggleFilter}
            value={getValue}
          />
          <button onClick={() => setGetValue("")}>
            {getValue !== "" ? (
              <i className="fa-solid fa-x text-white"></i>
            ) : (
              <i className="fa-solid fa-magnifying-glass text-white"></i>
            )}
          </button>
        </div>
        <div className="w-full h-full absolute -left-0 z-10">
          {isActive && (
            <div className="flex flex-col overflow-y-auto h-[400%]">
              {filterData.map((item) => (
                <div
                  key={item.url}
                  onClick={() => {
                    setGetValue(item.name);
                    addPokemon(item.name);
                    setIsActive(false);
                  }}
                  className="p-2 border-2 bg-white text-slate-500 rounded-sm cursor-pointer delay-100 hover:bg-red-500 hover:text-white"
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonCharacter;
